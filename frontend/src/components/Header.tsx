import { Link } from "react-router-dom";
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <Box backgroundColor="#0044D7" top="0" position="sticky" padding={5}>
      <HStack display='flex' justifyContent='space-between'>
        <Heading margin={0} color="#F5F5DC">CheckItOut</Heading>
        
        <button onClick={toggleMenu}><IoIosMenu /></button>
        
      </HStack>

      {
        isOpen
        &&
        <VStack marginTop={5}>
          <Link to="/home"><button onClick={toggleMenu}>Főoldal<br />megtekintése</button></Link>
          <Link to="/newTask"><button onClick={toggleMenu}>Új feladat<br />felvétele</button></Link>
          <Link to="/profile"><button onClick={toggleMenu}>Profil<br />megtekintése</button></Link>
          <Link to="/"><button onClick={toggleMenu}>Kijelentkezés</button></Link>
        </VStack>
      }


    </Box>
  );
};

export default Header;
