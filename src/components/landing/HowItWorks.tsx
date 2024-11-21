import { Box, Container, Heading, Stack, Text, Circle, VStack, HStack } from '@chakra-ui/react';

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step = ({ number, title, description }: StepProps) => {
  return (
    <HStack align="start" spacing={4}>
      <Circle
        size="40px"
        bg="blue.500"
        color="white"
        fontSize="lg"
        fontWeight="bold"
      >
        {number}
      </Circle>
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text color="gray.600">
          {description}
        </Text>
      </VStack>
    </HStack>
  );
};

export function HowItWorks() {
  return (
    <Box bg="gray.50" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <Heading textAlign="center" mb={8}>
            چگونه کار می‌کند؟
          </Heading>
          
          <Stack spacing={8} direction={{ base: 'column', md: 'row' }}>
            <Step
              number={1}
              title="مشاهده کدها"
              description="لیست به‌روز شده کدهای تخفیف را مشاهده کنید"
            />
            <Step
              number={2}
              title="انتخاب و کپی"
              description="کد مورد نظر خود را انتخاب و با یک کلیک کپی کنید"
            />
            <Step
              number={3}
              title="استفاده از کد"
              description="کد را در سایت یا اپلیکیشن مورد نظر وارد کنید"
            />
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
}
