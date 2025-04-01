import { makeObservable, observable } from "mobx";
import ViewComponent from "../interfaces/ViewComponent";
import { Card, Heading } from "@chakra-ui/react";
import { Button, Stack } from '@mui/material';
import GlobalEntities from "../store/GlobalEntities";


export class BaseCard implements ViewComponent {
    task: Task;
    category: Category; 

    constructor(task: Task) {
        this.task = task;

        const idx = GlobalEntities.categories.findIndex((element) => element.id === task.category_id);

        this.category = GlobalEntities.categories[idx];

        makeObservable(this, {
            task: observable
        })
    }
    View = () => (
        <Card.Root css={{ "boxShadow": "7px 7px 7px 7px rgb(0,0,0,0.5)", "borderRadius": "0.5rem", "margin": "5rem" }}>
            <Card.Body>
                <Card.Header>
                    <Heading size="md">{this.task.title}</Heading>
                </Card.Header>
                <Card.Description>
                    {this.task.description}
                </Card.Description>
                <Card.Description>
                    {this.task.due_date.toString()}
                </Card.Description>
                    Állapot: {this.task.status} | Prioritás: {this.task.priority}
                <Card.Description>
                
                    Kategória: {this.category.name}
                
                </Card.Description>
            </Card.Body>
            <Card.Footer display="flex" justifyContent="flex-end" >
                <Stack spacing={2.5} direction="row" margin={"1rem"}>
                    <Button variant="contained" color="warning">Folyamatban</Button>
                    <Button variant="contained" color="success">Kész</Button>
                </Stack>

            </Card.Footer>
        </Card.Root>
    );



}