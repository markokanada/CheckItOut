import React from "react";
import { NavigateFunction } from "react-router-dom";
import ViewComponent from "../interfaces/ViewComponent";
import {
  Box,
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
import { Styles } from "../styles/styles";
import Footer from "../components/Footer";
import IntroContent from "../content/IntroContent.json";
import MiddleBlockContent from "../content/MiddleBlockContent.json";
import AboutContent from "../content/AboutContent.json";
import MissionContent from "../content/MissionContent.json";
import ProductContent from "../content/ProductContent.json";
import ContactContent from "../content/ContactContent.json";
import Header from "../components/Header/index";
import Container from "../common/Container";

export default class Landing implements ViewComponent {
  constructor(public navigate: NavigateFunction) {}

  View = () => {
    return (
      <Container>
        <ScrollToTop />
        <ContentBlock
          direction="right"
          title={IntroContent.title}
          content={IntroContent.text}
          button={IntroContent.button}
          icon="developer.svg"
          id="intro"
        />
        <MiddleBlock
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          button={MiddleBlockContent.button}
          id="getStarted"
        />
        <ContentBlock
          direction="left"
          title={AboutContent.title}
          content={AboutContent.text}
          section={AboutContent.section}
          icon="graphs.svg"
          id="why-us"
        />
        <ContentBlock
          direction="right"
          title={MissionContent.title}
          content={MissionContent.text}
          icon="product-launch.svg"
          id="features"
        />
        <ContentBlock
          direction="left"
          title={ProductContent.title}
          content={ProductContent.text}
          icon="waving.svg"
          id="usage"
        />
        <ContactForm
          title={ContactContent.title}
          content={ContactContent.text}
          id="content"
        />
      </Container>
    );
  };
}
