
import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <Container pt={0}>
            <Box as="main">
                {children}
            </Box>
        </Container>
    );
};

export default Layout;