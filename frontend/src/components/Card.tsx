import { makeObservable, observable } from "mobx";
import ViewComponent from "../interfaces/ViewComponent";
import { Card, Heading } from "@chakra-ui/react";


export class BaseCard implements ViewComponent {
    title: string;
    description: string;

    constructor(title: string, descripton: string) {
        this.title = title;
        this.description = descripton;
    }
    View = () => (
        <Card.Root css={{ "boxShadow": "7px 7px 7px rgb(0,0,0,0.5)", "borderRadius": "0.5rem", "margin": "5rem" }}>
            <Card.Body>
                <Card.Header>
                   <Heading size="md">{this.title}</Heading>
                </Card.Header>
                <Card.Description>
                    {this.description}
                </Card.Description>
            </Card.Body>
        </Card.Root>
    );



}