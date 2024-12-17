import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react';

export const Hero = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6} align="center" textAlign="center">
        <Heading size="2xl" dir="rtl">کد تپ سواپ امروز</Heading>
        <Text fontSize="xl" dir="rtl">
          دریافت جدیدترین کدهای تپ سواپ به صورت روزانه. کد های معتبر و به روز TapSwap را اینجا پیدا کنید
        </Text>
        <Button colorScheme="blue" size="lg" dir="rtl">
          دریافت کد رایگان
        </Button>
      </VStack>
    </Container>
  );
}; 