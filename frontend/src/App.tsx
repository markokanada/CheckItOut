import "./App.css";
import Layout from "./components/Layout";
import { NavigateFunction, Route, Routes } from "react-router-dom";
import TaskRecording from "./pages/taskRecording";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import { computed, makeObservable } from "mobx";
import ViewComponent from "./interfaces/ViewComponent";
import GlobalEntities from "./store/GlobalEntities";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import { Suspense } from "react";
import { Styles } from "./styles/styles";
import Header from "./components/Header/index";
import Footer from "./components/Footer";
import Documentation from "./pages/Documentation";
import _404 from "./pages/404";
import { Box, Flex } from "@chakra-ui/react";
import PasswordReset from "./pages/PasswordReset";

export default class App implements ViewComponent {
  constructor(private navigate: NavigateFunction) {
    makeObservable(this);
  }

  @computed get login(): ViewComponent {
    return new Login(this.navigate);
  }

  @computed get landing(): ViewComponent {
    return new Landing(this.navigate);
  }

  @computed get documentation(): ViewComponent {
    return new Documentation(this.navigate);
  }

  @computed get home(): ViewComponent {
    return new Home(this.navigate);
  }

  @computed get isLoggedIn(): boolean {
    return GlobalEntities.user.id != undefined;
  }

  @computed get taskRecording(): ViewComponent {
    return new TaskRecording(this.navigate);
  }

  @computed get profile(): ViewComponent {
    return new Profile(this.navigate);
  }

  @computed get register(): ViewComponent {
    return new Register(this.navigate);
  }

  @computed get userManagement(): ViewComponent {
    return new UserManagement(this.navigate);
  }

  @computed get passwordReset(): ViewComponent {
    return new PasswordReset(this.navigate);
  }

  @computed get _404(): ViewComponent {
    return new _404(this.navigate);
  }

  View = () => (
    <Suspense fallback={null}>
      <Styles />
      <Flex direction="column" minHeight="100vh">
        <Header />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<this.landing.View />} />
            <Route
              path="/app/how-to-use"
              element={<this.documentation.View />}
            />
            <Route path="/how-to-use" element={<this.documentation.View />} />
            <Route
              path="/app/home"
              element={this.isLoggedIn ? <this.home.View /> : <></>}
            />
            <Route path="/app/newTask" element={<this.taskRecording.View />} />
            <Route path="/app/profile" element={<this.profile.View />} />
            <Route path="/register" element={<this.register.View />} />
            <Route path="/login" element={<this.login.View />} />
            <Route
              path="/app/admin/users"
              element={<this.userManagement.View />}
            />
            <Route
              path="/reset-password"
              element={<this.passwordReset.View />}
            />
            <Route path="*" element={<this._404.View />} />
          </Routes>
        </Box>
        <Footer />
      </Flex>
    </Suspense>
  );
}
