import React from "react";
import { NavigateFunction } from "react-router-dom";
import "./css/Login.css";
import ViewComponent from "../interfaces/ViewComponent";
import { Box, Container, Heading, Text, Button, Stack, Flex, Icon } from "@chakra-ui/react";
import { FaCheckCircle, FaClock, FaListUl, FaBell } from "react-icons/fa";

export default class Landing implements ViewComponent {
    constructor(public navigate: NavigateFunction) { }

    View = () => {
        
        return (
            <Box bg="white" color="#2D3748" minH="100vh">
                <Container maxW="container.xl" py={20}>
                    <Stack>
                        {/* Hero Section */}
                        <Stack textAlign="center">
                            <Heading
                                as="h1"
                                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                                fontWeight="bold"
                                bgGradient="linear(to-r, #3182CE, #00B5D8)"
                                bgClip="text"
                            >
                                Üdvözlünk a CheckItOut alkalmazásban!
                            </Heading>
                            <Text fontSize={{ base: "lg", md: "xl" }} maxW="3xl" mx="auto" color="#2D3748">
                                Egyszerűsítsd le az életed és növeld a produktivitásod egy modern feladatkezelő alkalmazással.
                            </Text>
                            <Button
                                size="lg"
                                bgGradient="linear(to-r, #3182CE, #00B5D8)"
                                color="white"
                                px={8}
                                fontSize="lg"
                                _hover={{
                                    bgGradient: "linear(to-r, #2C5282, #00A3C4)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "lg",
                                }}
                                onClick={() => this.navigate("/register")}
                            >
                                Kezdj hozzá ingyen
                            </Button>
                        </Stack>

                        {/* Features Section */}
                        <Stack>
                            <Heading
                                textAlign="center"
                                fontSize={{ base: "2xl", md: "3xl" }}
                                fontWeight="bold"
                            >
                                Miért válaszd a CheckItOut-ot?
                            </Heading>
                            <Flex
                                direction={{ base: "column", md: "row" }}
                                gap={8}
                                justify="center"
                                align="start"
                            >
                                {[
                                    {
                                        icon: FaCheckCircle,
                                        title: "Egyszerű használat",
                                        description: "Intuitív felület, ami segít gyorsan és hatékonyan kezelni a feladataidat."
                                    },
                                    {
                                        icon: FaListUl,
                                        title: "Személyre szabható",
                                        description: "Alakítsd az alkalmazást a saját igényeidhez, készíts egyedi listákat."
                                    },
                                    {
                                        icon: FaClock,
                                        title: "Időmegtakarítás",
                                        description: "Rendszerezett feladatkezelés, hogy több időd maradjon a fontos dolgokra."
                                    },
                                    {
                                        icon: FaBell,
                                        title: "Emlékeztetők",
                                        description: "Soha ne maradj le egy határidőről sem az intelligens értesítéseknek köszönhetően."
                                    }
                                ].map((feature, index) => (
                                    <Box
                                        key={index}
                                        p={6}
                                        borderRadius="xl"
                                        bg="white"
                                        boxShadow="xl"
                                        flex="1"
                                        _hover={{
                                            transform: "translateY(-4px)",
                                            transition: "all 0.3s ease"
                                        }}
                                    >
                                        <Icon
                                            as={feature.icon}
                                            w={8}
                                            h={8}
                                            color="#3182CE"
                                            mb={4}
                                        />
                                        <Heading size="md" mb={3}>
                                            {feature.title}
                                        </Heading>
                                        <Text color="#2D3748">
                                            {feature.description}
                                        </Text>
                                    </Box>
                                ))}
                            </Flex>
                        </Stack>

                        {/* Call to Action */}
                        <Box
                            textAlign="center"
                            p={10}
                            borderRadius="2xl"
                            bgGradient="linear(to-r, #3182CE, #00B5D8)"
                            color="white"
                        >
                            <Heading size="lg" mb={4}>
                                Készen állsz a hatékonyabb munkavégzésre?
                            </Heading>
                            <Text fontSize="lg" mb={6}>
                                Csatlakozz most, és tapasztald meg a rendszerezett feladatkezelés előnyeit!
                            </Text>
                            <Button
                                size="lg"
                                bg="white"
                                color="#3182CE"
                                _hover={{
                                    bg: "gray.100",
                                    transform: "scale(1.05)",
                                }}
                                onClick={() => this.navigate("/register")}
                            >
                                Regisztrálj most
                            </Button>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        );
    };
}
