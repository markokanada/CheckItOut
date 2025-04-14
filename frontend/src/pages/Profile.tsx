import { observer } from "mobx-react-lite";
import ViewComponent from "../interfaces/ViewComponent";
import { Button, Container, FormControl, Modal, Stack, TextField } from "@mui/material";
import GlobalEntities from "../store/GlobalEntities";
import { NavigateFunction } from "react-router-dom";
import { action, makeObservable, observable } from "mobx";
import { FormEvent } from "react";

export default class Profile implements ViewComponent {

    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    constructor(public naviagte: NavigateFunction) {
        makeObservable(this, {
            showModal: observable,
            editable: observable,
            toggleEdit: action,

        })
    }

    public editable: boolean = false;
    public showModal: boolean = false;

    @action toggleEdit = () => {
        this.editable = !this.editable;
    }

    @action toggleModal = () => {
        this.showModal = !this.showModal
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
                            </Button><Button sx={{ margin: "auto" }} variant='contained' onClick={this.toggleModal}>
                                    Mentés
                                </Button></>
                            :
                            <Button sx={{ margin: "auto" }} variant='contained' onClick={this.toggleEdit}>
                                Szerkesztés
                            </Button>
                    }

                </Stack>
            </form>
            <Modal
                open={this.showModal}
                onClose={this.toggleModal}
            >
                <Stack sx={this.style}>
                    <h1>Modal</h1>
                </Stack>
            </Modal>
        </Container>
    ));
}