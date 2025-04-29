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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { observer } from "mobx-react-lite";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import GlobalEntities from "../store/GlobalEntities";
import { useTranslation } from "react-i18next";
import ViewComponent from "../interfaces/ViewComponent";
import { PrioritySlider } from "../components/PrioritySlider";
import {Filter} from "bad-words";
import { CreateCategoryDialog } from "../components/CreateCategoryDialog";


export default class TaskRecording implements ViewComponent {
  @observable accessor category: Category = { id: undefined, name: undefined };
  @observable accessor showCategoryDialog = false;

  constructor(public navigate: NavigateFunction) {
    makeObservable(this);
  }

  @computed get categoryName() {
    return this.category.name || "";
  }

  @computed get categories() {
    return toJS(GlobalEntities.categories);
  }

  @action handleSubmit = async (values: any, { resetForm, setSubmitting }: any, setSnackbar: any) => {
    const formattedValues = {
      ...values,
      due_date: new Date(values.due_date).toISOString().slice(0, 19).replace("T", " "),
      user_id: GlobalEntities.user.id as number,
      status: "new",
    };

    try {
      const resp = await GlobalEntities.createTask(formattedValues);
      if (resp.status === 201) {
        setSnackbar({ open: true, type: 'success', message: 'Feladat sikeresen létrehozva!' });
        this.navigate("home");
      } else {
        setSnackbar({ open: true, type: 'error', message: 'Hiba a feladat létrehozásakor.' });
      }
    } catch (e) {
      setSnackbar({ open: true, type: 'error', message: 'Hálózati hiba vagy szerverhiba.' });
    } finally {
      setSubmitting(false);
    }
  };

  @action toggleCategoryDialog = (open: boolean) => {
    this.showCategoryDialog = open;
  };

  @action handleCreateCategory = async (name: string, setSnackbar: (args: { open: boolean, type: 'success' | 'error', message: string }) => void) => {
    try {
      const resp = await GlobalEntities.createCategory(name);
  
      if (resp.status === 201) {
        await GlobalEntities.loadCategories();
        setSnackbar({ open: true, type: 'success', message: 'Kategória sikeresen létrehozva!' });
      } else {
        setSnackbar({ open: true, type: 'error', message: 'Hiba a kategória létrehozásakor.' });
      }
    } catch (error: any) {
      console.error("Hiba a kategória létrehozásakor:", error);
      setSnackbar({ open: true, type: 'error', message: 'Hálózati hiba vagy szerverhiba.' });
    }
  };
  

  View = observer(() => {
    const { t } = useTranslation();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' as 'success' | 'error' });

    const validationSchema = Yup.object().shape({
      title: Yup.string().max(50, t("Max50Chars")).required(t("RequiredField")),
      description: Yup.string().max(255, t("Max255Chars")).required(t("RequiredField")),
      due_date: Yup.date().min(new Date(Date.now() + 86400000), t("MustBeFutureDate")).required(t("RequiredField")),
      category_id: Yup.number().required(t("RequiredField")),
      priority: Yup.number().min(1, t("MinPriority1")).max(10, t("MaxPriority10")).required(t("RequiredField")),
    });

    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <Card sx={{ width: "100%", maxWidth: 720, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>{t("AddTaskTitle")}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>{t("AddTaskDescription")}</Typography>

            <Formik
              initialValues={{
                title: "",
                description: "",
                due_date: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
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
                      <Field as={TextField} name="title" label={t("TaskTitle")} variant="outlined" fullWidth error={touched.title && !!errors.title} helperText={touched.title && errors.title} />
                    </FormControl>

                    <FormControl fullWidth error={touched.description && !!errors.description}>
                      <Field as={TextField} name="description" label={t("TaskDescription")} variant="outlined" multiline rows={4} fullWidth error={touched.description && !!errors.description} helperText={touched.description && errors.description} />
                    </FormControl>

                    <FormControl fullWidth error={touched.due_date && !!errors.due_date}>
                      <TextField
                        name="due_date"
                        label={t("DueDateTitle")}
                        type="datetime-local"
                        value={values.due_date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={touched.due_date && !!errors.due_date}
                        helperText={touched.due_date && errors.due_date}
                      />
                    </FormControl>

                    <FormControl fullWidth error={touched.category_id && !!errors.category_id}>
                      <Autocomplete
                        options={this.categories}
                        getOptionLabel={(option) => option.name || ""}
                        value={this.categories.find((c) => c.id === Number(values.category_id)) || null}
                        onChange={(_, newValue) => {
                          setFieldValue("category_id", newValue ? newValue.id : "");
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("CategoryTitle")}
                            error={touched.category_id && !!errors.category_id}
                            helperText={touched.category_id && errors.category_id}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {params.InputProps.endAdornment}
                                  <InputAdornment position="end">
                                    <IconButton onClick={() => this.toggleCategoryDialog(true)} edge="end">
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
                      <Field name="priority" component={PrioritySlider} value={values.priority} onChange={(e: Event, value: number | number[]) => setFieldValue("priority", value as number)} />
                      <FormHelperText error>{touched.priority && errors.priority}</FormHelperText>
                    </FormControl>

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button type="submit" variant="contained" color="primary" size="large">{t("SubmitButton")}</Button>
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

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert severity={snackbar.type} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    );
  });
}
