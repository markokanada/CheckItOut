import React, { ChangeEvent } from "react";
import { makeObservable, observable, action } from "mobx";
import { observer } from "mobx-react-lite";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
} from "@mui/material";
import {
  Edit,
  Delete,
  Save,
  Cancel,
} from "@mui/icons-material";
import ViewComponent from "../interfaces/ViewComponent";
import { NavigateFunction } from "react-router-dom";
import GlobalEntities from "../store/GlobalEntities";
import { useTranslation } from "react-i18next";

export default class UserManagement implements ViewComponent {
  @observable accessor editingId: number | null = null;
  @observable accessor editedUser: Partial<User> = {};
  @observable accessor confirmSave: boolean = false;
  @observable accessor snackbarOpen: boolean = false;
  @observable accessor snackbarMessage: string = "";
  @observable accessor confirmDeleteId: number | null = null;

  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
  }

  @action handleEdit(user: User) {
    this.editingId = user.id ?? null;
    this.editedUser = { ...user };
  }

  @action handleCancel() {
    this.editingId = null;
    this.editedUser = {};
  }

  handleChange = action(
    (
      e:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<{ name?: string; value: unknown }>
    ) => {
      const { name, value } = e.target;
      if (!name) return;
      this.editedUser = { ...this.editedUser, [name]: value as string };
    }
  );

  @action handleSaveRequest() {
    this.confirmSave = true;
  }

  @action handleCloseDialog(confirm: boolean) {
    this.confirmSave = false;
    if (confirm) {
      this.handleSave();
    }
  }

  @action async handleSave() {
    if (!this.editedUser.id) return;

    try {
      await GlobalEntities.updateUserById(
        this.editedUser.id,
        this.editedUser.name ?? "",
        this.editedUser.email ?? "",
        this.editedUser.role ?? ""
      );

      this.editingId = null;
      this.editedUser = {};
      await GlobalEntities.fetchUsers();
      this.snackbarMessage = "Changes saved successfully";
      this.snackbarOpen = true;
    } catch (error) {
      console.error("Mentés sikertelen:", error);
    }
  }

  @action handleDeleteRequest(id: number) {
    this.confirmDeleteId = id;
  }

  @action handleCloseDeleteDialog(confirm: boolean) {
    if (confirm && this.confirmDeleteId !== null) {
      this.handleDelete(this.confirmDeleteId);
    }
    this.confirmDeleteId = null;
  }

  @action async handleDelete(id: number) {
    try {
      await GlobalEntities.deleteUser(id);
      await GlobalEntities.fetchUsers();
      this.snackbarMessage = "User deleted successfully";
      this.snackbarOpen = true;
    } catch (error) {
      console.error("Törlés sikertelen:", error);
    }
  }

  @action handleCloseSnackbar = () => {
    this.snackbarOpen = false;
  };

  View = observer(() => {
    const { t } = useTranslation();
    const currentUser = GlobalEntities.user;

    return (
      <Container>
        <h2>{t("User Management")}</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("Name")}</TableCell>
              <TableCell>{t("Email")}</TableCell>
              <TableCell>{t("Role")}</TableCell>
              <TableCell>{t("Actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {GlobalEntities.users.map((user) => {
              const isEditing = this.editingId === user.id;
              const isCurrentUser = currentUser?.id === user.id;

              return (
                <TableRow key={user.id}>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        name="name"
                        value={this.editedUser.name || ""}
                        onChange={this.handleChange}
                        size="small"
                      />
                    ) : (
                      user.name
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        name="email"
                        value={this.editedUser.email || ""}
                        onChange={this.handleChange}
                        size="small"
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Select
                        name="role"
                        value={this.editedUser.role || "user"}
                        onChange={()=>{this.handleChange}}
                        size="small"
                      >
                        {!isCurrentUser && (
                          <MenuItem value="user">{t("User")}</MenuItem>
                        )}
                        <MenuItem value="admin">{t("Admin")}</MenuItem>
                      </Select>
                    ) : (
                      user.role
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Stack direction="row" spacing={1}>
                        <IconButton onClick={() => this.handleSaveRequest()}>
                          <Save />
                        </IconButton>
                        <IconButton onClick={() => this.handleCancel()}>
                          <Cancel />
                        </IconButton>
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={1}>
                        <IconButton onClick={() => this.handleEdit(user)}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          disabled={user === undefined}
                          onClick={() => this.handleDeleteRequest(user.id!)}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Save confirmation dialog */}
        <Dialog open={this.confirmSave} onClose={() => this.handleCloseDialog(false)}>
          <DialogTitle>{t("Confirm Save")}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t("Are you sure you want to save changes?")}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCloseDialog(false)}>{t("Cancel")}</Button>
            <Button onClick={() => this.handleCloseDialog(true)} autoFocus>{t("Confirm")}</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.confirmDeleteId !== null} onClose={() => this.handleCloseDeleteDialog(false)}>
          <DialogTitle>{t("Confirm Delete")}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t("Are you sure you want to delete this user?")}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCloseDeleteDialog(false)}>{t("Cancel")}</Button>
            <Button onClick={() => this.handleCloseDeleteDialog(true)} autoFocus>{t("Confirm")}</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={this.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          message={t(this.snackbarMessage)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Container>
    );
  });
}
