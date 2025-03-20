import { action, makeObservable, observable } from "mobx";
import GlobalApiHandlerInstance from "../api/GlobalApiHandlerInstance";
import { Task } from "@mui/icons-material";

class Entities {
    public _tasks: Task[] = [];

    constructor() {
        makeObservable(this, {
            _tasks: observable,
            loadTasks: action
        });        
    }

    get tasks() {
        return this._tasks;
    }

    @action loadTasks = async (id: number) => {
        const resp = await GlobalApiHandlerInstance.get(`/users/${id}`)
        this._tasks = await resp.data.data.tasks
    }

}

const GlobalEntities = new Entities();
await GlobalEntities.loadTasks(1);

export default GlobalEntities