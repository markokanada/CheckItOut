import { action, makeObservable, observable } from "mobx";
import GlobalApiHandlerInstance from "../api/GlobalApiHandlerInstance";
import { Task } from "@mui/icons-material";

class Entities {
    public _tasks: Task[] = [];
    public userToken: string = "";
    public user: User = {
        id: undefined,
        name: undefined,
        email: undefined,
        role: undefined,
        created_at: undefined,
        updated_at: undefined
    };

    constructor() {
        makeObservable(this, {
            _tasks: observable,
            loadTasks: action,
            user: observable
        });        
    }

    get tasks() {
        return this._tasks;
    }

    @action loadTasks = async () => {
        const resp = await GlobalApiHandlerInstance.get(`/users/${this.user.id}`)
        this._tasks = await resp.data.data.tasks
    }

    @action login = async (email: string, password: string) => {
        const loginResponse = await GlobalApiHandlerInstance.post(`/login`, {email, password});
        
        localStorage.setItem("userToken", loginResponse.data.data.token);
        
        const userDataResponse = await GlobalApiHandlerInstance.get('/user', {
            headers:{
               Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        this.user = userDataResponse.data;
        await GlobalEntities.loadTasks();
    }

}

const GlobalEntities = new Entities();

if (localStorage.getItem("userToken")) {
    const userDataResponse = await GlobalApiHandlerInstance.get('/user', {
        headers:{
           Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })

    GlobalEntities.user = userDataResponse.data;
    await GlobalEntities.loadTasks();
}

export default GlobalEntities