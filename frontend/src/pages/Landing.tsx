import React, { Component, FormEvent, ChangeEvent } from "react";
import { makeObservable, observable, action, computed } from "mobx";
import { NavigateFunction } from "react-router-dom";
import "./css/Login.css";
import ViewComponent from "../interfaces/ViewComponent";
import { Box, Heading, Input, Button, Text, Link } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@mui/material";

export default class Landing implements ViewComponent {
    constructor(public navigate: NavigateFunction) {

    }
    
    View = () => (
            // NAV-login-register, content
        <Box>

        </Box>
    );
}