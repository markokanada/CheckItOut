import { action, computed, makeObservable, observable } from "mobx";
import GlobalApiHandlerInstance from "../api/GlobalApiHandlerInstance";
import i18n from "../translation";
import { Task } from "../interfaces/Task";
import { useNavigate } from "react-router-dom";

class Entities {
  public _tasks: Task[] = [];
  public doneTasks: Task[] = [];
  public categories: Category[] = [];
  public userToken: string = "";
  public user: User = {
    id: undefined,
    name: undefined,
    email: undefined,
    role: undefined,
    created_at: undefined,
    updated_at: undefined,
  };

  public users: User[] = [];

  public firstTask: Task | undefined = undefined;

  constructor() {
    makeObservable(this, {
      _tasks: observable,
      doneTasks: observable,
      user: observable,
      categories: observable,
      firstTask: observable,
      users: observable,
      setFirstTask: action,
      loadTasks: action,
      createTask: action,
      tasks: computed,
      fetchUsers: action,
      deleteUser: action,
    });
  }

  get tasks() {
    return this._tasks;
  }
  @action public logout() {
    const savedLang = localStorage.getItem("language"); // nyelv mentése
    localStorage.clear();
    if (savedLang) {
      localStorage.setItem("language", savedLang); // visszaállítás
    }
    this._tasks = [];
    this.doneTasks = [];
    this.categories = [];
    this.userToken = "";
    this.user = {
      id: undefined,
      name: undefined,
      email: undefined,
      role: undefined,
      created_at: undefined,
      updated_at: undefined,
    };
  }
  @action loadTasks = async () => {
    const resp = await GlobalApiHandlerInstance.get(`/users/${this.user.id}`);
    this.Tasks(resp.data.data.tasks);
  };

  @action register = async (data: Object) => {
    const resp = await GlobalApiHandlerInstance.post("/register", data);
    return resp.data.data.message;
  };

  @action login = async (email: string, password: string) => {
    const loginResponse = await GlobalApiHandlerInstance.post(`/login`, {
      email,
      password,
    });

    localStorage.setItem("userToken", loginResponse.data.data.token);

    const userDataResponse = await GlobalApiHandlerInstance.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    this.user = userDataResponse.data;
    await GlobalEntities.loadTasks();
    await GlobalEntities.loadDoneTasks();

    if (this.user.role == "admin") {
      await GlobalEntities.fetchUsers();
    }
    await GlobalEntities.loadCategories();
  };

  @action loadCategories = async () => {
    const resp = await GlobalApiHandlerInstance.get("/categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    this.categories = resp.data.data;
  };
  @action sendPasswordResetEmail = async (email: string) => {
    try {
      const resp = await GlobalApiHandlerInstance.post("/forgot-password", {
        email,
      });
      return resp;
    } catch (error: any) {
      console.error("Password reset error:", error);
      throw error;
    }
  };

  @action resetPassword = async (
    email: string,
    token: string,
    newPassword: string,
  ) => {
    try {
      const resp = await GlobalApiHandlerInstance.post("/reset-password", {
        email,
        token,
        password: newPassword,
        password_confirmation: newPassword,
      });
      return resp;
    } catch (error: any) {
      console.error("Password reset error:", error);
      throw error;
    }
  };
  @action createCategory = async (name: string) => {
    try {
      const resp = await GlobalApiHandlerInstance.post(
        "/categories",
        {
          category_name: name,
          lang: i18n.language,
          user_id: GlobalEntities.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      if (resp.status === 201 || resp.status === 200) {
        await this.loadCategories();
      }

      return resp;
    } catch (error) {
      console.error("Hiba a kategória létrehozásakor:", error);
      throw error;
    }
  };

  @action createTask = async (data: Object) => {
    const resp = await GlobalApiHandlerInstance.post("/tasks", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    await this.loadTasks();
    await this.loadDoneTasks();

    return resp;
  };

  @action updateTask = async (data: Task) => {
    const resp = await GlobalApiHandlerInstance.put(`/tasks/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    if (resp.status === 200) {
      await this.loadTasks();
      await this.loadDoneTasks();
    }
    return resp;
  };

  @action Tasks = (tasks: Task[]) => {
    this._tasks = tasks.filter((element) => {
      return element.status != "finished";
    });

    this.setFirstTask();
  };

  @action setFirstTask = () => {
    this.firstTask = this._tasks[0];
  };

  @action loadDoneTasks = async () => {
    const resp = await GlobalApiHandlerInstance.get(
      `/tasks/today/${this.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );

    this.setDoneTasks(resp.data.data);
  };

  @action setDoneTasks = (tasks: Task[]) => {
    this.doneTasks = tasks;
  };

  @action updateUser = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const data = {
      name: name,
      email: email,
    };

    const oldemail = this.user.email;

    try {
      await GlobalApiHandlerInstance.post(`/login`, {
        email: oldemail,
        password,
      });
      const resp = await GlobalApiHandlerInstance.put(
        `/users/${this.user.id}`,
        data,
      );
      this.user = resp.data.user;
      return resp.data.message;
    } catch {
      return 0;
    }
  };

  @action updateUserById = async (
    id: number,
    name: string,
    email: string,
    role: string,
  ) => {
    const data = {
      name: name,
      email: email,
      role: role,
    };

    try {
      const resp = await GlobalApiHandlerInstance.put(`/users/${id}`, data);
      return resp.data.message;
    } catch {
      return 0;
    }
  };

  @action checkAndRedirectNotRightUser() {
    const navigate = useNavigate();

    if (this.user.id === undefined) {
      navigate("/login");
    }
  }

  @action async fetchUsers() {
    const response = await GlobalApiHandlerInstance.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    this.users = response.data.data;
  }

  @action async deleteUser(id: number) {
    await GlobalApiHandlerInstance.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    this.users = this.users.filter((u) => u.id !== id);
  }
}

const GlobalEntities = new Entities();

if (localStorage.getItem("userToken")) {
  try {
    const userDataResponse = await GlobalApiHandlerInstance.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    GlobalEntities.user = userDataResponse.data;
    await GlobalEntities.loadTasks();
    await GlobalEntities.loadDoneTasks();
    if (GlobalEntities.user.role == "admin") {
      await GlobalEntities.fetchUsers();
    }
    await GlobalEntities.loadCategories();
  } catch (error) {
    console.warn("Backend error:", error);
  }
}

const savedLang = localStorage.getItem("language");
if (savedLang) {
  i18n.changeLanguage(savedLang);
}

export default GlobalEntities;
