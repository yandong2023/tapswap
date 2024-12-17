import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react';

export const Hero = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6} align="center" textAlign="center">
        <Heading size="2xl">TapSwap 코드</Heading>
        <Text fontSize="xl">
          매일 업데이트되는 최신 TapSwap 코드를 받으세요. 100% 검증된 보상 코드
        </Text>
        <Button colorScheme="blue" size="lg">
          무료 코드 받기
        </Button>
      </VStack>
    </Container>
  );
}; 