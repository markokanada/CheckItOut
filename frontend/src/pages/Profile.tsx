import { observer } from "mobx-react-lite";
import ViewComponent from "../interfaces/ViewComponent";
import { Button, Container, FormControl, Stack, TextField } from "@mui/material";
import GlobalEntities from "../store/GlobalEntities";
import { NavigateFunction } from "react-router-dom";
import { action, makeObservable, observable } from "mobx";

export default class Profile implements ViewComponent {

    constructor(public naviagte: NavigateFunction) {
        makeObservable(this, {
            editable: observable,
            toggleEdit: action
        })
    }

    public editable: boolean = false;

    @action toggleEdit = () => {
        this.editable = !this.editable;
        
    }

    View = observer(() => (
        <Container>
            <Stack direction={"column"}>
                <FormControl>
                    <TextField id="name" label="Felhasználó név" variant="filled" value={GlobalEntities.user.name} disabled={!this.editable}/>
                    <TextField id="email" label="E-mail cím" variant="filled" value={GlobalEntities.user.email} disabled={!this.editable}/>
                </FormControl>
            </Stack>
            <Stack>
                <Button sx={{ margin: "auto" }} variant='contained' onClick={this.toggleEdit}>
                    Szerkesztés
                </Button>
            </Stack>
        </Container>
    ));
}