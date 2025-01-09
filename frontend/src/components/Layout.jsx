
import { Box, Container } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Layout = ({children}) => {
    return (
        <Container pt={0}>
            <Box as="main">
                {children}
            </Box>
        </Container>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout;