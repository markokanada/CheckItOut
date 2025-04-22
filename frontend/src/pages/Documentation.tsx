import { makeObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { NavigateFunction } from "react-router-dom";
import ViewComponent from "../interfaces/ViewComponent";

export default class Documentation implements ViewComponent {
    
    constructor(public navigate: NavigateFunction) {
        
        makeObservable(this, {
            
        });
    }
     View = observer(() => (
        <iframe
          src="https://organic-gong-e92.notion.site/ebd/1b93a97be88580babc93e39736ae7dcb"
          style={{
            width: "100%",
            height: "120vh",
            border: "none",
          }}
          allowFullScreen
        />
      ));



}