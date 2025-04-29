import { action, makeObservable, observable } from "mobx";
import ViewComponent from "../interfaces/ViewComponent";
import { Card, Heading } from "@chakra-ui/react";
import {
  Alert,
  Button,
  Chip,
  Snackbar,
  Stack,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import GlobalEntities from "../store/GlobalEntities";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

export class BaseCard implements ViewComponent {
  task: Task;
  category: Category;
  showAlert: boolean = false;
  alertMessage: string = "";
  alertType: "success" | "error" | "" = "";

  constructor(task: Task) {
    this.task = task;

    const idx = GlobalEntities.categories.findIndex(
      (element) => element.id === task.category_id
    );

    this.category = GlobalEntities.categories[idx];

    makeObservable(this, {
      task: observable,
      toggleStatus: action,
      showAlert: observable,
      alertMessage: observable,
      handleClose: action,
      alertType: observable,
    });
  }

  @action toggleStatus = async (newStatus: string) => {
    this.task.status = newStatus;
    this.task.user_id = GlobalEntities.user.id as number;

    const resp = await GlobalEntities.updateTask(this.task);
    if (resp.status === 200) {
      this.toggleAlert(
        true,
        `${newStatus === "folyamatban" ? "Folyamatban" : "Kész"}: ${newStatus}`,
        "success"
      );
    } else {
      this.toggleAlert(true, "update failed", "error");
    }
  };

  @action handleClose = () => {
    this.toggleAlert(false, "", "");
  };

  @action toggleAlert = (
    open: boolean,
    message: string,
    type: "success" | "error" | ""
  ) => {
    this.showAlert = open;
    this.alertMessage = message;
    this.alertType = type;
  };

  View = observer(() => {
    const { t } = useTranslation();

    return (
      <Card.Root
        css={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "1rem",
          maxWidth: "720px",
          margin: "3rem auto",
          padding: "1.5rem",
          background: "#fff",
        }}
        id={`${this.task.id}`}
      >
        <Card.Header>
          <Heading size="md" mb="1">{this.task.title}</Heading>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {this.task.description}
          </Typography>
        </Card.Header>

        <Divider sx={{ my: 2 }} />

        <Card.Body>
          <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
            <Chip label={`${t("label status")}: ${this.task.status}`} color="info" />
            <Chip label={`${t("label priority")}: ${this.task.priority}`} color="secondary" />
            <Chip label={`${t("label category")}: ${this.category.name}`} color="primary" />
          </Stack>

          <Typography variant="caption" color="text.secondary" mt={2}>
            {t("label due date")}: {new Date(this.task.due_date).toLocaleDateString("hu-HU")}
          </Typography>
        </Card.Body>

        <Card.Footer>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => this.toggleStatus("folyamatban")}
              fullWidth
            >
              {t("button in progress")}
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => this.toggleStatus("kész")}
              fullWidth
            >
              {t("button done")}
            </Button>
          </Stack>
        </Card.Footer>

        <Snackbar
          open={this.showAlert}
          autoHideDuration={4000}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={this.handleClose}
            severity={this.alertType || "info"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {t(this.alertMessage)}
          </Alert>
        </Snackbar>
      </Card.Root>
    );
  });
}
