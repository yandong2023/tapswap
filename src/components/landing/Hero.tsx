import { Box, Container, Heading, Text, Button, Stack } from '@chakra-ui/react';

export function Hero() {
  return (
    <Box bg="blue.500" color="white" py={20}>
      <Container maxW="container.xl">
        <Stack
          spacing={8}
          align="center"
          textAlign="center"
        >
          <Box maxW="800px">
            <Heading
              as="h1"
              size="2xl"
              mb={6}
              lineHeight="shorter"
            >
              تپ‌سواپ: مدیریت هوشمند کدهای تخفیف
            </Heading>
            <Text fontSize="xl" mb={8}>
              با تپ‌سواپ، به راحتی کدهای تخفیف را مدیریت، پیگیری و استفاده کنید. همیشه به روزترین کدها در دسترس شما هستند.
            </Text>
            <Button
              size="lg"
              colorScheme="white"
              variant="outline"
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              شروع کنید
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
