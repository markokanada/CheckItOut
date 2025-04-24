import React from "react";
import { NavigateFunction } from "react-router-dom";
import ViewComponent from "../interfaces/ViewComponent";
import { observer } from "mobx-react-lite";
import { Button, Container, Stack, Typography } from "@mui/material";
import { makeObservable } from "mobx";
import { useTranslation } from "react-i18next";

export default class _404 implements ViewComponent {
  constructor(private navigate: NavigateFunction) {
    makeObservable(this);
  }

  View = observer(() => {
    const { t } = useTranslation();

    return (
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: "45vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack spacing={4} alignItems="center">
          <Typography variant="h1" color="primary" fontWeight={700}>
            404
          </Typography>
          <Typography variant="h5" color="textSecondary" textAlign="center">
            {t("404 Title")}
          </Typography>
          <Typography variant="body1" color="textSecondary" textAlign="center">
            {t("404 Description")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => this.navigate("/")}
          >
            {t("404 Button")}
          </Button>
        </Stack>
      </Container>
    );
  });
}
