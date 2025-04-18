import React from "react";
import { NavigateFunction } from "react-router-dom";
import ViewComponent from "../interfaces/ViewComponent";
import { observer } from "mobx-react-lite";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Link
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { action, makeObservable, observable } from "mobx";
import GlobalEntities from "../store/GlobalEntities";

export default class Login implements ViewComponent {
  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
  }

  @observable private accessor snackbarOpen = false;

  @observable private accessor  initialValues = {
    email: "",
    password: "",
  };

  @observable  private  accessor  validationSchema = Yup.object({
    email: Yup.string()
      .email("Érvényes e-mail szükséges!")
      .required("E-mail megadása kötelező!"),
    password: Yup.string()
      .min(6, "A jelszónak legalább 6 karakterből kell állnia!")
      .required("Jelszó megadása kötelező!"),
  });

  @action  private async handleSubmit(values: typeof this.initialValues) {
    await GlobalEntities.login(values.email, values.password);
    this.snackbarOpen = true;
    setTimeout(() => this.navigate("/home"), 1500);
  };

  @action private handleCloseSnackbar() {
    this.snackbarOpen = false;
  };

  View = observer(() => (
    <Container maxWidth="sm">
      <Stack spacing={4} mt={6}>
        <Typography variant="h4" align="center">
          Bejelentkezés
        </Typography>

        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          onSubmit={this.handleSubmit}
        >
          {({ handleChange, values, touched, errors }) => (
            <Form>
              <Stack spacing={3}>
                <FormControl>
                  <TextField
                    label="E-mail"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    label="Jelszó"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                </FormControl>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => this.navigate("/register")}
                  >
                    Még nincs fiókod? Regisztrálj
                  </Link>
                  <Button type="submit" variant="contained" color="primary">
                    Bejelentkezés
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>

        <Snackbar
          open={this.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={this.handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Sikeres bejelentkezés!
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  ));
}