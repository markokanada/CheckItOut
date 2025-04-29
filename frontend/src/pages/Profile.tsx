import { observer } from "mobx-react-lite";
import ViewComponent from "../interfaces/ViewComponent";
import {
  Button,
  Container,
  FormControl,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Alert,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import GlobalEntities from "../store/GlobalEntities";
import { NavigateFunction } from "react-router-dom";
import { action, observable } from "mobx";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export default class Profile implements ViewComponent {
  @observable accessor editable: boolean = false;
  @observable accessor showModal: boolean = false;
  @observable accessor name: string;
  @observable accessor email: string;
  @observable accessor snackbarOpen: boolean = false;
  @observable accessor snackbarMessage: string = "";
  @observable accessor snackbarSeverity: "success" | "error" = "success";

  constructor(public navigate: NavigateFunction) {
    this.name = GlobalEntities.user.name as string;
    this.email = GlobalEntities.user.email as string;
  }

  @action toggleEdit = () => {
    this.editable = !this.editable;
  };

  @action toggleModal = () => {
    this.showModal = !this.showModal;
  };

  @action abortEdit = () => {
    this.name = GlobalEntities.user.name as string;
    this.email = GlobalEntities.user.email as string;
    this.editable = false;
    this.showModal = false;
  };

  @action showSnackbar = (message: string, severity: "success" | "error") => {
    this.snackbarMessage = message;
    this.snackbarSeverity = severity;
    this.snackbarOpen = true;
  };
  @action handleSnackbarClose = () => {
    this.snackbarOpen = false;
  };
  @action confirmEdit = async (password: string) => {
    const resp = await GlobalEntities.updateUser(
      this.name,
      this.email,
      password
    );
    if (resp !== 0) {
      this.showSnackbar("snackbar success", "success");
    } else {
      this.showSnackbar("snackbar invalid password", "error");
    }
    this.abortEdit();
  };

  View = observer(() => {
    const { t } = useTranslation();

    return (
      <Container maxWidth="sm" sx={{ marginY: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            {t("title")}
          </Typography>

          <Formik
            key={`${this.name}-${this.email}-${this.editable}`}
            initialValues={{ name: this.name, email: this.email }}
            enableReinitialize
            onSubmit={({ name, email }) => {
              this.name = name;
              this.email = email;
              this.toggleModal();
            }}
            validationSchema={Yup.object({
              name: Yup.string().required(t("validation name required")),
              email: Yup.string()
                .email(t("validation email invalid"))
                .required(t("validation email required")),
            })}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <TextField
                      id="name"
                      name="name"
                      label={t("label name")}
                      variant="outlined"
                      disabled={!this.editable}
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      fullWidth
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <TextField
                      id="email"
                      name="email"
                      label={t("label email")}
                      variant="outlined"
                      disabled={!this.editable}
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      fullWidth
                    />
                  </FormControl>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="flex-end"
                    sx={{ mt: 3 }}
                  >
                    {this.editable ? (
                      <>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={this.abortEdit}
                          sx={{ width: { xs: "100%", sm: "auto" } }}
                        >
                          {t("button cancel")}
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ width: { xs: "100%", sm: "auto" } }}
                        >
                          {t("button save")}
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={this.toggleEdit}
                        sx={{ width: { xs: "100%", sm: "auto" } }}
                      >
                        {t("button edit")}
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>

          <Modal open={this.showModal} onClose={this.toggleModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: "60%", md: "40%" },
                bgcolor: "background.paper",
                boxShadow: 24,
                borderRadius: 2,
                p: 4,
              }}
            >
              <Typography variant="h5" gutterBottom>
                {t("modal title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("modal confirm")}
              </Typography>

              <Box sx={{ my: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
                <Typography>
                  <strong>{t("label name")}:</strong> {this.name}
                </Typography>
                <Typography>
                  <strong>{t("label email")}:</strong> {this.email}
                </Typography>
              </Box>

              <Formik
                initialValues={{ password: "" }}
                validationSchema={Yup.object({
                  password: Yup.string().required(
                    t("validation password required")
                  ),
                })}
                onSubmit={({ password }) => this.confirmEdit(password)}
              >
                {({ values, handleChange, errors, touched }) => (
                  <Form>
                    <FormControl fullWidth sx={{ my: 2 }}>
                      <TextField
                        id="password"
                        name="password"
                        type="password"
                        label={t("label password")}
                        variant="outlined"
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        fullWidth
                      />
                    </FormControl>

                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                      sx={{ mt: 3 }}
                    >
                      <Button
                        onClick={this.abortEdit}
                        variant="outlined"
                        color="error"
                      >
                        {t("button cancel")}
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        {t("button save")}
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>

          <Snackbar
            open={this.snackbarOpen}
            autoHideDuration={4000}
            onClose={this.handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={this.handleSnackbarClose}
              severity={this.snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {t(this.snackbarMessage)}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    );
  });
}
