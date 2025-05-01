import React from "react";
import {
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
import GlobalEntities from "../store/GlobalEntities";

export default class PasswordReset implements ViewComponent {
  @observable accessor snackbarOpen = false;
  @observable accessor snackbarMessage = "";
  @observable accessor snackbarSeverity: "success" | "error" = "success";

  @observable accessor initialValues = {
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  };

  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
  }

  @action private async handleSubmit(values: typeof this.initialValues) {
    try {
      await GlobalEntities.resetPassword(
        values.email,
        values.token,
        values.password,
      );

      this.snackbarMessage = "Password Reset Success";
      this.snackbarSeverity = "success";
      this.snackbarOpen = true;

      setTimeout(() => this.navigate("/login"), 3000);
    } catch (error: any) {
      let translationKey = "Password Reset Error";

      if (error.isAxiosError) {
        const serverMessage = error.response?.data?.message || error.message;

        if (serverMessage.includes("invalid token")) {
          translationKey = "Invalid Reset Token";
        } else if (serverMessage.includes("expired")) {
          translationKey = "Reset Token Expired";
        } else if (error.response?.status === 422) {
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
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const urlToken = searchParams.get("token") || "";
    const urlEmail = searchParams.get("email") || "";

    const validationSchema = Yup.object({
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
            {t("Password Reset Title")}
          </Typography>

          <Formik
            initialValues={{
              ...this.initialValues,
              email: urlEmail,
              token: urlToken,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => this.handleSubmit(values)}
            enableReinitialize
          >
            {({ handleChange, values, touched, errors }) => (
              <Form>
                <Stack spacing={3}>
                  <FormControl>
                    <TextField
                      label={t("Email")}
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      fullWidth
                      disabled={!!urlEmail}
                      sx={{
                        "& input:focus-within, & textarea:focus-within": {
                          boxShadow: "none",
                          background: "none",
                        },
                      }}
                    />
                  </FormControl>

                  <input type="hidden" name="token" value={values.token} />

                  <FormControl>
                    <TextField
                      label={t("New Password")}
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      fullWidth
                      sx={{
                        "& input:focus-within, & textarea:focus-within": {
                          boxShadow: "none",
                          background: "none",
                        },
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <TextField
                      label={t("Confirm New Password")}
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
                      sx={{
                        "& input:focus-within, & textarea:focus-within": {
                          boxShadow: "none",
                          background: "none",
                        },
                      }}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    {t("Reset Password")}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          <Snackbar
            open={this.snackbarOpen}
            autoHideDuration={5000}
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
