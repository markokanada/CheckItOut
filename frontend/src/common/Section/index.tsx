import { Box, Heading } from "@chakra-ui/react";

export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box px={4}>
    <Heading fontSize="2rem" size="md" mb={3}>
      {title}
    </Heading>
    {children}
  </Box>
);
