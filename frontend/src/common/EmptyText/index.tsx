import { Text } from "@chakra-ui/react";
export const EmptyMessage = ({ message }: { message: string }) => (
  <Text color="gray.500" fontStyle="italic">
    {message}
  </Text>
);
