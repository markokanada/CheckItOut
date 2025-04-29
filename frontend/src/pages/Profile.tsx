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
    console.log("Editable state:", this.editable);
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
      this.showSnackbar("Sikeres frissítés!", "success");
    } else {
      this.showSnackbar("Hibás jelszó", "error");
    }
    this.abortEdit();
  };

  View = observer(() => (
    <Container maxWidth="sm" sx={{ marginY: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Profil adatok
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
            name: Yup.string().required("Név kötelező"),
            email: Yup.string()
              .email("Érvényes email kell")
              .required("Email kötelező"),
          })}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Stack spacing={3}>
                <FormControl fullWidth>
                  <TextField
                    id="name"
                    name="name"
                    label="Felhasználó név"
                    variant="outlined"
                    disabled={!this.editable}
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    sx={{
                      "& input:focus-within, & textarea:focus-within": {
                        boxShadow: "none",
                        background: "none",
                      },
                    }}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    id="email"
                    name="email"
                    label="E-mail cím"
                    variant="outlined"
                    disabled={!this.editable}
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                    sx={{
                      "& input:focus-within, & textarea:focus-within": {
                        boxShadow: "none",
                        background: "none",
                      },
                    }}
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
                        Mégse
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: { xs: "100%", sm: "auto" } }}
                      >
                        Mentés
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={this.toggleEdit}
                      sx={{ width: { xs: "100%", sm: "auto" } }}
                    >
                      Szerkesztés
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
              Megerősítés
            </Typography>
            <Typography variant="body1" paragraph>
              Biztosan menti a módosításokat?
            </Typography>

            <Box sx={{ my: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
              <Typography>
                <strong>Felhasználó név:</strong> {this.name}
              </Typography>
              <Typography>
                <strong>E-mail cím:</strong> {this.email}
              </Typography>
            </Box>

            <Formik
              initialValues={{ password: "" }}
              validationSchema={Yup.object({
                password: Yup.string().required("Jelszó kötelező!"),
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
                      label="Jelszó"
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
                      Mégse
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Mentés
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
            {this.snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  ));
}
