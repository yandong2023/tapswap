import { Box, Container, SimpleGrid, Text, Stack, Center } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation('common');

  const features = [
    {
      icon: <RefreshIcon />,
      titleKey: 'features.feature1',
      textKey: 'features.feature1Description',
    },
    {
      icon: <ClockIcon />,
      titleKey: 'features.feature2',
      textKey: 'features.feature2Description',
    },
    {
      icon: <CheckIcon />,
      titleKey: 'features.feature3',
      textKey: 'features.feature3Description',
    },
    {
      icon: <BellIcon />,
      titleKey: 'features.feature4',
      textKey: 'features.feature4Description',
    },
  ];

  return (
    <Box p={4} py={20}>
      <Container maxW={'container.xl'}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
          {features.map((feature) => (
            <Feature
              key={feature.titleKey}
              icon={feature.icon}
              title={t(feature.titleKey)}
              text={t(feature.textKey)}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
