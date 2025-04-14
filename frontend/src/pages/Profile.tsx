import { observer } from "mobx-react-lite";
import ViewComponent from "../interfaces/ViewComponent";
import { Button, Container, FormControl, Stack, TextField } from "@mui/material";
import GlobalEntities from "../store/GlobalEntities";
import { NavigateFunction } from "react-router-dom";
import { action, makeObservable, observable } from "mobx";
import { FormEvent } from "react";

export default class Profile implements ViewComponent {

    constructor(public naviagte: NavigateFunction) {
        makeObservable(this, {
            editable: observable,
            toggleEdit: action,
            
        })
    }

    public editable: boolean = false;

    @action toggleEdit = () => {
        this.editable = !this.editable;
    }



    @action submitEdit = (e: any) => {
        e.preventDefault();
       
        console.log(e.target.name.value);
        
    }

    View = observer(() => (
        <Container sx={{ marginY: "2rem" }}>
            <form onSubmit={this.submitEdit}>
                <Stack direction={"column"}>
                    <FormControl>
                        <TextField id="name" sx={{ paddingBottom: 3 }} label="Felhasználó név" variant="filled" defaultValue={GlobalEntities.user.name} disabled={!this.editable} />
                        <TextField id="email" label="E-mail cím" variant="filled" defaultValue={GlobalEntities.user.email} disabled={!this.editable} />
                    </FormControl>
                </Stack>
                <Stack sx={{ marginTop: "2rem" }} direction={"row"}>
                    {
                        this.editable
                            ?
                            <><Button sx={{ margin: "auto" }} variant='contained' onClick={this.toggleEdit}>
                                Mégse
                            </Button><Button sx={{ margin: "auto" }} variant='contained' type="submit">
                                    Mentés
                                </Button></>
                            :
                            <Button sx={{ margin: "auto" }} variant='contained' onClick={this.toggleEdit}>
                                Szerkesztés
                            </Button>
                    }

                </Stack>
            </form>
        </Container>
    ));
}