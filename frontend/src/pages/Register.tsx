import React from "react";
import { NavigateFunction } from "react-router-dom";
import ViewComponent from "../interfaces/ViewComponent";
import { observer } from "mobx-react-lite";
import {
  Alert,
  Button,
  Container,
  FormControl,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { action, makeObservable, observable } from "mobx";
import { useTranslation } from "react-i18next";

export default class Register implements ViewComponent {
  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
  }

  @observable private accessor initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  @observable private accessor snackbarOpen = false;

  @action private handleSubmit(values: typeof this.initialValues) {
    this.snackbarOpen = true;
    setTimeout(() => this.navigate("/"), 1500);
  }

  @action private handleCloseSnackbar() {
    this.snackbarOpen = false;
  }

  View = observer(() => {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
      fullName: Yup.string().required(t("Validation Fullname Required")),
      email: Yup.string()
        .email(t("Validation Email Format"))
        .required(t("Validation Email Required")),
      password: Yup.string()
        .min(6, t("Validation Password Length"))
        .required(t("Validation Password Required")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], t("Validation Password Match"))
        .required(t("Validation Confirm Password Required")),
    });

    return (
      <Container maxWidth="sm">
        <Stack spacing={4} mb={6}>
          <Typography variant="h4" align="center">
            {t("Register Title")}
          </Typography>
          <Formik
            initialValues={this.initialValues}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}
          >
            {({ handleChange, values, touched, errors }) => (
              <Form>
                <Stack spacing={3}>
                  <FormControl>
                    <TextField
                      label={t("Register Fullname")}
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      error={touched.fullName && Boolean(errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label={t("Register Email")}
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
                      label={t("Register Password")}
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
                      label={t("Register Confirm Password")}
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      error={
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                  </FormControl>
                  <Stack direction="row" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary">
                      {t("Register Submit")}
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
              {t("Register Success")}
            </Alert>
          </Snackbar>
        </Stack>
      </Container>
    );
  });
}