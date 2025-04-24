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
  Link,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { action, makeObservable, observable } from "mobx";
import { useTranslation } from "react-i18next";
import GlobalApiHandlerInstance from "../api/GlobalApiHandlerInstance";
import GlobalEntities from "../store/GlobalEntities";

export default class Register implements ViewComponent {
  @observable accessor snackbarOpen = false;
  @observable accessor snackbarMessage = "";
  @observable accessor snackbarSeverity: "success" | "error" = "success";

  @observable accessor initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
  }

  @action private async handleSubmit(values: typeof this.initialValues) {
    try {
      await GlobalEntities.register(values);
      this.snackbarMessage = "Register Success";
      this.snackbarSeverity = "success";
      this.snackbarOpen = true;
      setTimeout(() => this.navigate("/login"), 7500);
    } catch (error: any) {
      let translationKey = "Register Error";
      if (error.isAxiosError) {
        const serverMessage = error.response?.data?.message || error.message;

        if (serverMessage.includes("The email has already been taken")) {
          translationKey = "Register Error Taken";
        } else if (
          error.response?.status === 422 &&
          error.response?.data?.errors
        ) {
          translationKey = "Validation Error";
        }
      }

      this.snackbarMessage = translationKey;
      this.snackbarSeverity = "error";
      this.snackbarOpen = true;
    }
  }

  @action private handleCloseSnackbar = () => {
    this.snackbarOpen = false;
  };

  View = observer(() => {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
      name: Yup.string().required(t("Validation Fullname Required")),
      email: Yup.string()
        .email(t("Validation Email Format"))
        .required(t("Validation Email Required")),
      password: Yup.string()
        .min(8, t("Validation Password Length"))
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
            onSubmit={(values) => this.handleSubmit(values)}
          >
            {({ handleChange, values, touched, errors }) => (
              <Form>
                <Stack spacing={3}>
                  <FormControl>
                    <TextField
                      label={t("Register Fullname")}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      fullWidth
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
                      fullWidth
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
                      fullWidth
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
                      fullWidth
                    />
                  </FormControl>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => this.navigate("/login")}
                    >
                      {t("Register Have Account")}
                    </Link>
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
            autoHideDuration={7500}
            onClose={this.handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={this.handleCloseSnackbar}
              severity={this.snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {t(this.snackbarMessage)}
            </Alert>
          </Snackbar>
        </Stack>
      </Container>
    );
  });
}
