import React, { ChangeEvent } from "react";
import axios from "axios";
import { makeObservable, observable, action, makeAutoObservable } from "mobx";
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
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import { User } from "../model/User";
import ViewComponent from "../interfaces/ViewComponent";
import { NavigateFunction } from "react-router-dom";
import GlobalEntities from "../store/GlobalEntities";

export default class UserManagement implements ViewComponent {
  @observable accessor users: User[] = [];
  @observable accessor editingId: number | null = null;
  @observable accessor editedUser: Partial<User> = {};

  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
    // GlobalEntities.fetchUsers();
    console.log(GlobalEntities.users);
    console.log(GlobalEntities.user);
    
  }


  @action handleEdit(user: User) {
    this.editingId = user.id;
    this.editedUser = { ...user };
  }

  @action handleCancel() {
    this.editingId = null;
    this.editedUser = {};
  }

  @action handleChange(
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const { name, value } = e.target;
    this.editedUser = { ...this.editedUser, [name as string]: value };
  }


  View = observer(() => (
    <Container>
      <h2>Felhasználók kezelése</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Név</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Szerepkör</TableCell>
            <TableCell>Műveletek</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {GlobalEntities.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {this.editingId === user.id ? (
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
                {this.editingId === user.id ? (
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
                {this.editingId === user.id ? (
                  <Select
                    name="role"
                    value={this.editedUser.role || "user"}
                    onChange={() => this.handleChange}
                    size="small"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                ) : (
                  user.role
                )}
              </TableCell>
              <TableCell>
                {this.editingId === user.id ? (
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={this.handleSave}>
                      <Save />
                    </IconButton>
                    <IconButton onClick={this.handleCancel}>
                      <Cancel />
                    </IconButton>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => this.handleEdit(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => this.handleDelete(user.id)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  ));
}
