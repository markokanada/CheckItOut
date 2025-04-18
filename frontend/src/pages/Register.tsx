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
  Typography
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { action, makeObservable, observable } from "mobx";

export default class Register implements ViewComponent {
  constructor(public navigate: NavigateFunction) {
    makeObservable(this)
  }

  @observable private accessor initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  @observable private accessor snackbarOpen = false;


  @observable private accessor validationSchema = Yup.object({
    fullName: Yup.string().required("Név megadása kötelező!"),
    email: Yup.string().email("Érvényes e-mail szükséges!").required("E-mail megadása kötelező!"),
    password: Yup.string().min(6, "A jelszónak legalább 6 karakterből kell állnia!").required("Jelszó szükséges!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "A jelszavak nem egyeznek!")
      .required("Jelszó megerősítése szükséges!"),
  });

  @action private handleSubmit (values: typeof this.initialValues) {
    this.snackbarOpen = true;
    setTimeout(() => this.navigate("/"), 1500);
  };

  @action private handleCloseSnackbar()  {
    this.snackbarOpen = false;
  };

  View = () => (
    <Container maxWidth="sm">
      <Stack spacing={4} mt={6}>
        <Typography variant="h4" align="center">
          Regisztráció
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
                    label="Teljes név"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    label="E-mail"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
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
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    label="Jelszó megerősítése"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </FormControl>
                <Stack direction="row" justifyContent="flex-end">
                  <Button type="submit" variant="contained" color="primary">
                    Regisztrálok
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
          <Alert onClose={this.handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            Sikeres regisztráció!
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  );
}