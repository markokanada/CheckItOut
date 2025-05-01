import { action, makeObservable, observable } from "mobx";
import ViewComponent from "../interfaces/ViewComponent";
import { Card, Heading } from "@chakra-ui/react";
import {
  Alert,
  Button,
  Chip,
  Snackbar,
  Stack,
  Typography,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormHelperText,
  IconButton,
} from "@mui/material";
import GlobalEntities from "../store/GlobalEntities";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Task } from "../interfaces/Task";
import { TaskStatus } from "../interfaces/TaskStatus";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { StyledTextField } from "../common/StyledTextField";
import { StyledAutocomplete } from "../common/StyledAutocomplete";
import { PrioritySlider } from "../components/PrioritySlider";
import i18n from "../translation";
import EditIcon from '@mui/icons-material/Edit';

export class BaseCard implements ViewComponent {
  task: Task;
  category: Category;
  showAlert: boolean = false;
  alertMessage: string = "";
  alertType: "success" | "error" | "" = "";
  isEditModalOpen: boolean = false;
  editSnackbar: { open: boolean; message: string; type: "success" | "error" } = {
    open: false,
    message: "",
    type: "success",
  };

  constructor(task: Task) {
    this.task = task;

    const idx = GlobalEntities.categories.findIndex(
      (element) => element.id === task.category_id,
    );

    this.category = GlobalEntities.categories[idx];

    makeObservable(this, {
      task: observable,
      toggleStatus: action,
      showAlert: observable,
      alertMessage: observable,
      handleClose: action,
      alertType: observable,
      isEditModalOpen: observable,
      toggleEditModal: action,
      editSnackbar: observable,
      handleEditSubmit: action,
      handleEditClose: action,
    });
  }

  @action toggleEditModal = (open: boolean) => {
    this.isEditModalOpen = open;
  };

  @action handleEditClose = () => {
    this.toggleEditModal(false);
  };

  @action handleEditSubmit = async (formValues: {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: number;
    status: TaskStatus;
    category_id: number;
  }) => {
    try {
      // ISO 8601 string konvertálása a szerver által várt formátumba
      const formatDateForServer = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };
  
      const taskValues = {
        ...formValues,
        due_date: formatDateForServer(formValues.due_date),
        user_id: GlobalEntities.user.id as number,
      };
  
      const resp = await GlobalEntities.updateTask(taskValues);
      if (resp.status === 200) {
        // Frissítjük a lokális task objektumot is
        this.task = {
          ...formValues,
          due_date: new Date(formValues.due_date),
          user_id: GlobalEntities.user.id as number,
        };
        this.editSnackbar = {
          open: true,
          message: i18n.t("TaskUpdatedSuccess"),
          type: "success",
        };
        this.toggleEditModal(false);
      } else {
        this.editSnackbar = {
          open: true,
          message: i18n.t("TaskUpdateError"),
          type: "error",
        };
      }
    } catch (error) {
      this.editSnackbar = {
        open: true,
        message: i18n.t("NetworkOrServerError"),
        type: "error",
      };
    }
  };

  @action toggleStatus = async (newStatus: TaskStatus) => {
    this.task.status = newStatus;
    this.task.user_id = GlobalEntities.user.id as number;

    const resp = await GlobalEntities.updateTask(this.task);
    if (resp.status === 200) {
      this.toggleAlert(
        true,
        `${newStatus === "in-progress" ? "in-progress" : "finished"}: ${newStatus}`,
        "success",
      );
    } else {
      this.toggleAlert(true, "update failed", "error");
    }
  };

  @action handleClose = () => {
    this.toggleAlert(false, "", "");
  };

  @action toggleAlert = (
    open: boolean,
    message: string,
    type: "success" | "error" | "",
  ) => {
    this.showAlert = open;
    this.alertMessage = message;
    this.alertType = type;
  };

  View = observer(() => {
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
      title: Yup.string().max(50, t("Max50Chars")).required(t("RequiredField")),
      description: Yup.string()
        .max(255, t("Max255Chars"))
        .required(t("RequiredField")),
      due_date: Yup.date()
        .min(new Date(Date.now() + 60000), t("MustBeFutureDate"))
        .required(t("RequiredField")),
      category_id: Yup.number().required(t("RequiredField")),
      priority: Yup.number()
        .min(1, t("MinPriority1"))
        .max(10, t("MaxPriority10"))
        .required(t("RequiredField")),
    });

    const formatDateForInput = (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      if (isNaN(dateObj.getTime())) {
        console.error("Invalid date provided:", date);
        return formatDateForInput(new Date());
      }

      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
      <>
        <Card.Root
          css={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "1rem",
            maxWidth: "720px",
            margin: "3rem auto",
            padding: "1.5rem",
            background: "#fff",
            position: "relative",
          }}
          id={`${this.task.id}`}
        >
          <IconButton
            aria-label="edit"
            onClick={() => this.toggleEditModal(true)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "primary.main",
              backgroundColor: "background.paper",
              '&:hover': {
                backgroundColor: "action.hover",
              }
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <Card.Header>
            <Heading size="md" mb="1">
              {this.task.title}
            </Heading>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {this.task.description}
            </Typography>
          </Card.Header>

          <Divider sx={{ my: 2 }} />

          <Card.Body>
            <Stack
              justifyContent="center"
              spacing={1}
              direction="row"
              flexWrap="wrap"
              useFlexGap
            >
              <Chip
                label={`${t("label status")}: ${t(this.task.status)}`}
                color="info"
              />
              <Chip
                label={`${t("label priority")}: ${t("PriorityValue" + this.task.priority)}`}
                color="secondary"
              />
              <Chip
                label={`${t("label category")}: ${this.category !== undefined ? this.category.name : ""}`}
                color="primary"
              />
            </Stack>

            <Typography variant="caption" color="text.secondary" mt={2}>
              {t("label due date")}:{" "}
              {new Date(this.task.due_date).toLocaleDateString("hu-HU")}
            </Typography>
          </Card.Body>

          <Card.Footer>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="flex-end"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <Button
                variant="contained"
                color="warning"
                onClick={() => this.toggleStatus("in-progress")}
                fullWidth
              >
                {t("button in progress")}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => this.toggleStatus("finished")}
                fullWidth
              >
                {t("button done")}
              </Button>
            </Stack>
          </Card.Footer>

          <Snackbar
            open={this.showAlert}
            autoHideDuration={4000}
            onClose={this.handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={this.handleClose}
              severity={this.alertType || "info"}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {t(this.alertMessage)}
            </Alert>
          </Snackbar>
        </Card.Root>

        <Dialog open={this.isEditModalOpen} onClose={this.handleEditClose} maxWidth="sm" fullWidth>
          <DialogTitle>{t("EditTask")}</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                ...this.task,
                due_date: formatDateForInput(this.task.due_date),
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => this.handleEditSubmit(values)}
            >
              {({ values, errors, touched, handleChange, setFieldValue }) => (
                <Form id="edit-task-form">
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
                      />
                    </FormControl>

                    <FormControl fullWidth error={touched.category_id && !!errors.category_id}>
                      <StyledAutocomplete
                        options={GlobalEntities.categories.filter(
                          (cat) => cat.lang === i18n.language
                        )}
                        getOptionLabel={(option) => option.name || ""}
                        value={
                          GlobalEntities.categories.find(
                            (c) => c.id === values.category_id
                          ) || null
                        }
                        onChange={(_, newValue) => {
                          setFieldValue(
                            "category_id",
                            newValue ? newValue.id : ""
                          );
                        }}
                        renderInput={(params) => (
                          <StyledTextField
                            {...params}
                            label={t("CategoryTitle")}
                            error={touched.category_id && !!errors.category_id}
                            helperText={
                              touched.category_id && errors.category_id
                            }
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
                          setFieldValue(
                            "priority",
                            Array.isArray(value) ? value[0] : value
                          )
                        }
                      />
                      <FormHelperText error>
                        {touched.priority && errors.priority}
                      </FormHelperText>
                    </FormControl>
                  </Stack>
                </Form>
              )}
            </Formik>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleEditClose}>{t("Cancel")}</Button>
            <Button 
              type="submit" 
              form="edit-task-form" 
              variant="contained" 
              color="primary"
            >
              {t("Save")}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={this.editSnackbar.open}
          autoHideDuration={4000}
          onClose={() => this.editSnackbar = { ...this.editSnackbar, open: false }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={this.editSnackbar.type} sx={{ width: "100%" }}>
            {this.editSnackbar.message}
          </Alert>
        </Snackbar>
      </>
    );
  });
}