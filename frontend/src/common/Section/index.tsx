import { Box, Heading } from "@chakra-ui/react";

export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Box>
      <Heading fontSize="2.5rem" size="md" mb={3}>
        {title}
      </Heading>
      {children}
    </Box>
  );