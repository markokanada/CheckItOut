import { Link } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";

const Header = () => {
  return(
    <Box m={5}>
      <HStack justifyContent="space-around">
        <Link to="/">Főoldal<br />megtekintése</Link>
        <Link to="/newTask">Új feladat<br />felvétele</Link>
        <Link to="/profile">Profil<br />megtekintése</Link>
      </HStack>
      
    </Box>
  );
};

export default Header;
