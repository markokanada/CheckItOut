import { observer } from "mobx-react-lite";
import ViewComponent from "../interfaces/ViewComponent";
import {
  Button,
  Container,
  FormControl,
  Modal,
  Stack,
  TextField
} from "@mui/material";
import GlobalEntities from "../store/GlobalEntities";
import { NavigateFunction } from "react-router-dom";
import { action, makeObservable, observable } from "mobx";
import GlobalApiHandlerInstance from "../api/GlobalApiHandlerInstance";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default class Profile implements ViewComponent {
  style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
    margin: "auto"
  };

  constructor(public navigate: NavigateFunction) {
    this.name = GlobalEntities.user.name as string;
    this.email = GlobalEntities.user.email as string;
    makeObservable(this);
  }

  @observable accessor editable: boolean = false;
  @observable accessor showModal: boolean = false;
  @observable accessor name: string;
  @observable accessor email: string;

  @action toggleEdit() {
    this.editable = !this.editable;
  }

  @action toggleModal() {
    this.showModal = !this.showModal;
  }

  @action abortEdit() {
    this.name = GlobalEntities.user.name as string;
    this.email = GlobalEntities.user.email as string;
    this.toggleModal();
    this.toggleEdit();
  }

  @action async confirmEdit(password: string) {
    const resp = await GlobalEntities.updateUser(this.name, this.email, password);
    if (resp !== 0) {
      alert(resp);
    } else {
      alert("Hibás jelszó");
    }
    this.abortEdit();
  }

  View = observer(() => (
    <Container sx={{ marginY: "2rem" }}>
      <Formik
        initialValues={{ name: this.name, email: this.email }}
        enableReinitialize
        onSubmit={() => this.toggleModal()}
        validationSchema={Yup.object({
          name: Yup.string().required("Név kötelező"),
          email: Yup.string().email("Érvényes email kell").required("Email kötelező")
        })}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Stack direction={"column"}>
              <FormControl>
                <TextField
                  id="name"
                  name="name"
                  label="Felhasználó név"
                  variant="filled"
                  sx={{ paddingBottom: 3 }}
                  disabled={!this.editable}
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                    this.name = e.target.value;
                  }}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  id="email"
                  name="email"
                  label="E-mail cím"
                  variant="filled"
                  disabled={!this.editable}
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                    this.email = e.target.value;
                  }}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </FormControl>
            </Stack>

            <Stack sx={{ marginTop: "2rem" }} direction={{ xs: "column-reverse", sm: "row" }} gap={2}>
              {this.editable ? (
                <>
                  <Button variant="contained" color="error" onClick={this.toggleEdit}>
                    Mégse
                  </Button>
                  <Button type="submit" variant="contained" color="success">
                    Mentés
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={this.toggleEdit}>
                  Szerkesztés
                </Button>
              )}
            </Stack>
          </Form>
        )}
      </Formik>

      <Modal open={this.showModal} onClose={this.toggleModal}>
        <Stack sx={this.style} textAlign={"center"}>
          <h1>Biztosan menti?</h1>
          <Stack>
            <p>Felhasználó név: {this.name}</p>
            <p>E-mail cím: {this.email}</p>
          </Stack>

          <Formik
            initialValues={{ password: "" }}
            validationSchema={Yup.object({
              password: Yup.string().required("Jelszó kötelező!")
            })}
            onSubmit={({ password }) => this.confirmEdit(password)}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <FormControl fullWidth sx={{ marginY: 2 }}>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Jelszó"
                    variant="standard"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </FormControl>

                <Stack direction={{ xs: "column-reverse", sm: "row" }} justifyContent={"space-between"} padding={2} gap={2}>
                  <Button onClick={this.abortEdit} variant="contained" color="error">
                    Mégse
                  </Button>
                  <Button type="submit" variant="contained" color="success">
                    Rendben
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Modal>
    </Container>
  ));
}