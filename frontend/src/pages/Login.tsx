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
import GlobalEntities from "../store/GlobalEntities";
import { useTranslation } from "react-i18next";

export default class Login implements ViewComponent {
  @observable accessor snackbarOpen = false;
  @observable accessor snackbarMessage = "";
  @observable accessor snackbarSeverity: "success" | "error" = "success";

  @observable accessor initialValues = {
    email: "",
    password: "",
  };

  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
  }

  @action private async handleSubmit(values: typeof this.initialValues) {
    try {
      await GlobalEntities.login(values.email, values.password);
      this.snackbarMessage = "Login Success";
      this.snackbarSeverity = "success";
      this.snackbarOpen = true;
      setTimeout(() => this.navigate("/app/home"), 7500);
    } catch (error: any) {
      let translationKey = "Login Error";

      if (error.isAxiosError) {
        const serverMessage = error.response?.data?.message || error.message;

        if (serverMessage.includes("The selected email is invalid")) {
          translationKey = "Login Error 2";
        } else if (
          serverMessage.includes("Request failed with status code 401")
        ) {
          translationKey = "Login Error 3";
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
      email: Yup.string()
        .email(t("Validation Email Format"))
        .required(t("Validation Email Required")),
      password: Yup.string()
        .min(6, t("Validation Password Length"))
        .required(t("Validation Password Required")),
    });

    return (
      <Container maxWidth="sm">
        <Stack spacing={4} mb={6}>
          <Typography variant="h4" align="center">
            {t("Login Title")}
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
                      label={t("Login Email")}
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
                      label={t("Login Password")}
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
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
                      onClick={() => this.navigate("/register")}
                    >
                      {t("Login No Account")}
                    </Link>
                    <Button type="submit" variant="contained" color="primary">
                      {t("Login Submit")}
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>

          <Snackbar
            open={this.snackbarOpen}
            autoHideDuration={7000}
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
