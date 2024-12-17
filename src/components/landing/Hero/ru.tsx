import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react';

export const Hero = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6} align="center" textAlign="center">
        <Heading size="2xl">Коды TapSwap</Heading>
        <Text fontSize="xl">
          Получите последние коды TapSwap, обновляемые ежедневно. 100% рабочие коды
        </Text>
        <Button colorScheme="blue" size="lg">
          Получить бесплатный код
        </Button>
      </VStack>
    </Container>
  );
}; 