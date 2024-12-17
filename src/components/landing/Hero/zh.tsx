import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react';

export const Hero = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6} align="center" textAlign="center">
        <Heading size="2xl">TapSwap优惠码</Heading>
        <Text fontSize="xl">
          每日更新最新TapSwap优惠码和兑换码，100%可用，免费领取
        </Text>
        <Button colorScheme="blue" size="lg">
          获取最新优惠码
        </Button>
      </VStack>
    </Container>
  );
}; 