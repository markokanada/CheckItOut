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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { action, makeObservable, observable } from "mobx";
import GlobalEntities from "../store/GlobalEntities";
import { useTranslation } from "react-i18next";
import { VStack } from "@chakra-ui/react";

export default class Login implements ViewComponent {
  @observable accessor snackbarOpen = false;
  @observable accessor snackbarMessage = "";
  @observable accessor snackbarSeverity: "success" | "error" = "success";
  @observable accessor autoHideDuration = 7000;
  @observable accessor initialValues = {
    email: "",
    password: "",
  };
  @observable accessor forgotPasswordModalOpen = false;
  @observable accessor forgotPasswordEmail = "";

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

  @action private toggleForgotPasswordModal = (open: boolean) => {
    this.forgotPasswordModalOpen = open;
    if (!open) {
      this.forgotPasswordEmail = "";
    }
  };

  @action private handleForgotPasswordSubmit = async (email: string) => {
    try {
      const resp = await GlobalEntities.sendPasswordResetEmail(email);

      if (resp.status === 200) {
        this.snackbarMessage = "Password Reset Sent";
        this.snackbarSeverity = "success";
      } else {
        this.snackbarMessage = "Password Reset Error";
        this.snackbarSeverity = "error";
      }
      this.snackbarOpen = true;
      this.toggleForgotPasswordModal(false);
    } catch (error: any) {
      let translationKey = "Password Reset Error";

      if (error.isAxiosError) {
        const serverMessage = error.response?.data?.message || error.message;

        if (serverMessage.includes("email not found")) {
          translationKey = "Email Not Found";
        } else if (serverMessage.includes("password reset")) {
          translationKey = "Password Reset Throttled";
        }
      }

      this.snackbarMessage = translationKey;
      this.snackbarSeverity = "error";
      this.snackbarOpen = true;
    }
  };
  @action private handlePasswordReset = async (
    email: string,
    token: string,
    newPassword: string,
  ) => {
    try {
      const resp = await GlobalEntities.resetPassword(
        email,
        token,
        newPassword,
      );

      if (resp.status === 200) {
        this.snackbarMessage = "Password Reset Success";
        this.snackbarSeverity = "success";
        this.snackbarOpen = true;
        return true;
      }
      return false;
    } catch (error: any) {
      let translationKey = "Password Reset Send Error";

      if (error.isAxiosError) {
        const serverMessage = error.response?.data?.message || error.message;

        if (serverMessage.includes("invalid token")) {
          translationKey = "Invalid Reset Token";
        } else if (serverMessage.includes("expired")) {
          translationKey = "Reset Token Expired";
        }
      }

      this.snackbarMessage = translationKey;
      this.snackbarSeverity = "error";
      this.snackbarOpen = true;
      return false;
    }
  };

  View = observer(() => {
    if (GlobalEntities.user.id !== undefined) {
      this.snackbarMessage = "Login Success";
      this.snackbarSeverity = "success";
      this.snackbarOpen = true;
      this.autoHideDuration = 1500;
      setTimeout(() => {
        this.navigate("/app/home");
      }, 2000);
    }
    const { t } = useTranslation();

    const loginValidationSchema = Yup.object({
      email: Yup.string()
        .email(t("Validation Email Format"))
        .required(t("Validation Email Required")),
      password: Yup.string()
        .min(6, t("Validation Password Length"))
        .required(t("Validation Password Required")),
    });

    const forgotPasswordValidationSchema = Yup.object({
      email: Yup.string()
        .email(t("Validation Email Format"))
        .required(t("Validation Email Required")),
    });

    return (
      <Container maxWidth="sm">
        <Stack spacing={4} mb={6}>
          <Typography variant="h4" align="center">
            {t("Login Title")}
          </Typography>

          <Formik
            initialValues={this.initialValues}
            validationSchema={loginValidationSchema}
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
                      label={t("Login Password")}
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
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <VStack alignItems="start">
                      <Link
                        component="button"
                        variant="body2"
                        textAlign="left"
                        padding={2}
                        onClick={() => this.navigate("/register")}
                      >
                        {t("Login No Account")}
                      </Link>
                      <Link
                        component="button"
                        variant="body2"
                        textAlign="left"
                        padding={2}
                        onClick={() => this.toggleForgotPasswordModal(true)}
                      >
                        {t("Forgotten Title")}
                      </Link>
                    </VStack>
                    <Button type="submit" variant="contained" color="primary">
                      {t("Login Submit")}
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>

          <Dialog
            open={this.forgotPasswordModalOpen}
            onClose={() => this.toggleForgotPasswordModal(false)}
          >
            <DialogTitle>{t("Forgot Password Title")}</DialogTitle>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={forgotPasswordValidationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                await this.handleForgotPasswordSubmit(values.email);
                setSubmitting(false);
              }}
            >
              {({ handleChange, handleSubmit, values, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <Box sx={{ minWidth: 300 }}>
                      <Typography variant="body1" gutterBottom>
                        {t("Forgot Password Instructions")}
                      </Typography>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label={t("Login Email")}
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{
                          "& input:focus-within, & textarea:focus-within": {
                            boxShadow: "none",
                            background: "none",
                          },
                        }}
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => this.toggleForgotPasswordModal(false)}
                    >
                      {t("Cancel")}
                    </Button>
                    <Button type="submit" color="primary">
                      {t("Send Reset Link")}
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </Dialog>

          <Snackbar
            open={this.snackbarOpen}
            autoHideDuration={this.autoHideDuration}
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
