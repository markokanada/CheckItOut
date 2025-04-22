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
  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
  }

  @observable private accessor snackbarOpen = false;

  @observable private accessor initialValues = {
    email: "",
    password: "",
  };

  @action private async handleSubmit(values: typeof this.initialValues) {
    await GlobalEntities.login(values.email, values.password);
    this.snackbarOpen = true;
    setTimeout(() => this.navigate("/home"), 1500);
  }

  @action private handleCloseSnackbar() {
    this.snackbarOpen = false;
  }

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
            onSubmit={this.handleSubmit}
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
            autoHideDuration={3000}
            onClose={this.handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={this.handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              {t("Login Success")}
            </Alert>
          </Snackbar>
        </Stack>
      </Container>
    );
  });
}