import React, { useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  Stack,
  FormControl,
  FormHelperText,
  TextField,
  Autocomplete,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  styled
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { observer } from "mobx-react-lite";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import GlobalEntities from "../store/GlobalEntities";
import { useTranslation } from "react-i18next";
import ViewComponent from "../interfaces/ViewComponent";
import { PrioritySlider } from "../components/PrioritySlider";
import { CreateCategoryDialog } from "../components/CreateCategoryDialog";
import i18n from "../translation";
import { FormValues } from "../interfaces/FormValues";
import { SnackbarState } from "../interfaces/SnackbarState";
import { StyledTextField } from "../common/StyledTextField";
import { StyledAutocomplete } from "../common/StyledAutocomplete";

export default class TaskRecording implements ViewComponent {
  @observable accessor category: Category = { id: undefined, lang: undefined, name: undefined, user_id: undefined };
  @observable accessor showCategoryDialog = false;

  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
  }

  @computed get categoryName(): string {
    return this.category.name || "";
  }

  @computed get categories(): Category[] {
    return toJS(GlobalEntities.categories).filter(cat => cat.lang === i18n.language);
  }

  @action handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    setSnackbar: (state: SnackbarState) => void
  ) => {
    const formattedValues = {
      ...values,
      due_date: new Date(values.due_date).toISOString().slice(0, 19).replace("T", " "),
      user_id: GlobalEntities.user.id as number,
      status: "new",
    };

    try {
      const resp = await GlobalEntities.createTask(formattedValues);
      if (resp.status === 201) {
        setSnackbar({ open: true, type: 'success', message: i18n.t("TaskCreatedSuccess") });
        setTimeout(() => { this.navigate("/app/home"); }, 2000);
      } else {
        setSnackbar({ open: true, type: 'error', message: i18n.t("TaskCreateError") });
      }
    } catch (e) {
      setSnackbar({ open: true, type: 'error', message: i18n.t("NetworkOrServerError") });
    } finally {
      setSubmitting(false);
    }
  };

  @action toggleCategoryDialog = (open: boolean): void => {
    this.showCategoryDialog = open;
  };

  @action handleCreateCategory = async (
    name: string,
    setSnackbar: (state: SnackbarState) => void
  ): Promise<void> => {
    try {
      const resp = await GlobalEntities.createCategory(name);

      if (resp.status === 201) {
        await GlobalEntities.loadCategories();
        setSnackbar({ open: true, type: 'success', message: i18n.t("CategoryCreatedSuccess") });
      } else {
        setSnackbar({ open: true, type: 'error', message: i18n.t("CategoryCreateError") });
      }
    } catch (error) {
      console.error(i18n.t("CategoryCreateErrorConsole"), error);
      setSnackbar({ open: true, type: 'error', message: i18n.t("NetworkOrServerError") });
    }
  };

  View = observer(() => {
        GlobalEntities.checkAndRedirectNotRightUser();
    
    const { t } = useTranslation();
    const [snackbar, setSnackbar] = useState<SnackbarState>({
      open: false,
      message: '',
      type: 'success'
    });

    const validationSchema = Yup.object().shape({
      title: Yup.string().max(50, t("Max50Chars")).required(t("RequiredField")),
      description: Yup.string().max(255, t("Max255Chars")).required(t("RequiredField")),
      due_date: Yup.date()
        .min(new Date(Date.now() + 60000), t("MustBeFutureDate"))
        .required(t("RequiredField")),
      category_id: Yup.number().required(t("RequiredField")),
      priority: Yup.number().min(1, t("MinPriority1")).max(10, t("MaxPriority10")).required(t("RequiredField")),
    });

    const getNowRoundedToMinute = (): string => {
      const now = new Date();
      now.setSeconds(0, 0);
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <Card sx={{
            width: "100%",
            maxWidth: 720,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
              },
            },
          }}>
            <Typography variant="h5" gutterBottom>{t("AddTaskTitle")}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>{t("AddTaskDescription")}</Typography>

            <Formik
              initialValues={{
                title: "",
                description: "",
                due_date: getNowRoundedToMinute(),
                category_id: "",
                priority: 5,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => this.handleSubmit(values, actions, setSnackbar)}
            >
              {({ values, errors, touched, handleChange, setFieldValue }) => (
                <Form>
                  <Stack spacing={3} sx={{ mt: 2 }}>
                    <FormControl fullWidth error={touched.title && !!errors.title}>
                      <Field
                        as={StyledTextField}
                        name="title"
                        label={t("TaskTitle")}
                        variant="outlined"
                        fullWidth
                        error={touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                        sx={{
                          '& input:focus-within, & textarea:focus-within': {
                            boxShadow: 'none',
                            background: 'none',
                          },
                        }}
                      />
                    </FormControl>

                    <FormControl fullWidth error={touched.description && !!errors.description}>
                      <Field
                        as={StyledTextField}
                        name="description"
                        label={t("TaskDescription")}
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        error={touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                        sx={{
                          '& input:focus-within, & textarea:focus-within': {
                            boxShadow: 'none',
                            background: 'none',
                          },
                        }}
                      />
                    </FormControl>

                    <FormControl fullWidth error={touched.due_date && !!errors.due_date}>
                      <StyledTextField
                        name="due_date"
                        label={t("DueDateTitle")}
                        type="datetime-local"
                        value={values.due_date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={touched.due_date && !!errors.due_date}
                        helperText={touched.due_date && errors.due_date}
                        sx={{
                          '& input:focus-within, & textarea:focus-within': {
                            boxShadow: 'none',
                            background: 'none',
                          },
                        }}
                      />
                    </FormControl>

                    <FormControl fullWidth error={touched.category_id && !!errors.category_id}>
                      <StyledAutocomplete
                        options={this.categories}
                        getOptionLabel={(option) => option.name || ""}
                        value={this.categories.find((c) => c.id === Number(values.category_id)) || null}
                        onChange={(_, newValue) => {
                          setFieldValue("category_id", newValue ? newValue.id : "");
                        }}
                        renderInput={(params) => (
                          <StyledTextField
                            {...params}
                            label={t("CategoryTitle")}
                            error={touched.category_id && !!errors.category_id}
                            helperText={touched.category_id && errors.category_id}
                            sx={{
                              '& input:focus-within, & textarea:focus-within': {
                                boxShadow: 'none',
                                background: 'none',
                              },
                            }}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {params.InputProps.endAdornment}
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => this.toggleCategoryDialog(true)}
                                      edge="end"
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  </InputAdornment>
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </FormControl>

                    <FormControl fullWidth error={touched.priority && !!errors.priority}>
                      <Field
                        name="priority"
                        component={PrioritySlider}
                        value={values.priority}
                        onChange={(_e: Event, value: number | number[]) =>
                          setFieldValue("priority", Array.isArray(value) ? value[0] : value)
                        } sx={{
                          '& input:focus-within, & textarea:focus-within': {
                            boxShadow: 'none',
                            background: 'none',
                          },
                        }}
                      />
                      <FormHelperText error>{touched.priority && errors.priority}</FormHelperText>
                    </FormControl>

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button type="submit" variant="contained" color="primary" size="large">
                        {t("SubmitButton")}
                      </Button>
                    </Box>
                  </Stack>
                </Form>
              )}
            </Formik>

            <CreateCategoryDialog
              open={this.showCategoryDialog}
              onClose={() => this.toggleCategoryDialog(false)}
              onCreate={(name) => this.handleCreateCategory(name, setSnackbar)}
            />
          </Card>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbar.type} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    );
  });
}
