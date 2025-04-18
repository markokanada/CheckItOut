import React from "react";
import { NavigateFunction } from "react-router-dom";
import ViewComponent from "../interfaces/ViewComponent";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaCheckCircle, FaClock, FaListUl, FaBell } from "react-icons/fa";
import { lazy } from "react";
import ScrollToTop from "../common/ScrollToTop";
import ContentBlock from "../components/ContentBlock";
import MiddleBlock from "../components/MiddleBlock";
import ContactForm from "../components/ContactForm";
export default class Landing implements ViewComponent {
  constructor(public navigate: NavigateFunction) {}

  View = () => {
    console.log("a")
    const features = [
      {
        icon: FaCheckCircle,
        title: "Egyszerű használat",
        description: "Intuitív felület gyors, hatékony napi menedzsmenthez.",
      },
      {
        icon: FaListUl,
        title: "Személyre szabhatóság",
        description: "Egyedi listák, kategóriák, színek – minden, ahogy te szeretnéd.",
      },
      {
        icon: FaClock,
        title: "AI-időbeosztás",
        description: "Töltse ki az üres óráidat hasznosan a beépített intelligens ütemező.",
      },
      {
        icon: FaBell,
        title: "Intelligens értesítések",
        description: "Nem csak emlékeztet, hanem javasol is – tanul a szokásaidból.",
      },
    ];    

    return (
      <Container>
      <ScrollToTop />
      <ContentBlock
        direction="right"
        title={"IntroContent.title"}
        content={"IntroContent.text"}
        button={[
          { title: "title" },
        ]}
        icon="developer.svg"
        id="intro"
      />
      <MiddleBlock
        title={"MiddleBlockContent.title"}
        content={"MiddleBlockContent.text"}
        button={"MiddleBlockContent.button"}
      />
      <ContentBlock
        direction="left"
        title={"AboutContent.title"}
        content={"AboutContent.text"}
        section={[
          { title: "title", content: "content", icon:"icon" },
        ]}
        icon="graphs.svg"
        id="about"
      />
      <ContentBlock
        direction="right"
        title={"MissionContent.title"}
        content={"MissionContent.text"}
        icon="product-launch.svg"
        id="mission"
      />
      <ContentBlock
        direction="left"
        title={"ProductContent.title"}
        content={"ProductContent.text"}
        icon="waving.svg"
        id="product"
      />
      <ContactForm
        title={"ContactContent.title"}
        content={"ContactContent.text"}
        id="contact"
      />
    </Container>
    );
  };
}
