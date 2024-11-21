import { Box, Container, SimpleGrid, Text, Stack, Center } from '@chakra-ui/react';

interface FeatureProps {
  title: string;
  text: string;
  icon: JSX.Element;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Center
        w={16}
        h={16}
        color={'white'}
        rounded={'full'}
        bg={'blue.500'}
        mb={1}
      >
        {icon}
      </Center>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

// 简单的 SVG 图标
const RefreshIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.39 0 4.68.94 6.36 2.63L12 12" />
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export function Features() {
  return (
    <Box p={4} py={20}>
      <Container maxW={'container.xl'}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
          <Feature
            icon={<RefreshIcon />}
            title={'به‌روزرسانی خودکار'}
            text={'کدها هر ۵ دقیقه به صورت خودکار به‌روز می‌شوند'}
          />
          <Feature
            icon={<ClockIcon />}
            title={'تاریخ انقضا'}
            text={'نمایش وضعیت اعتبار و تاریخ انقضای هر کد'}
          />
          <Feature
            icon={<CheckIcon />}
            title={'اعتبارسنجی'}
            text={'بررسی خودکار معتبر بودن کدها'}
          />
          <Feature
            icon={<BellIcon />}
            title={'اطلاع‌رسانی'}
            text={'دریافت اعلان برای کدهای جدید'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
