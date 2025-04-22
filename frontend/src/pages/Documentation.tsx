import { makeObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { NavigateFunction } from "react-router-dom";
import ViewComponent from "../interfaces/ViewComponent";

export default class Documentation implements ViewComponent {
    
    constructor(public navigate: NavigateFunction) {
        
        makeObservable(this, {
            
        });
    }
    View = observer(() => (<></>))
}