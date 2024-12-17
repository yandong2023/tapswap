import { Box, Container, Heading, Stack, Text, Icon, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FaDatabase, FaCode, FaRobot, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface StepProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const Step = ({ icon, title, description, delay }: StepProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      bg={bgColor}
      p={6}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor={borderColor}
      flex="1"
      _hover={{
        transform: 'translateY(-5px)',
        shadow: 'lg',
        transition: 'all 0.2s',
      }}
    >
      <VStack align="start" spacing={4}>
        <Icon
          as={icon}
          boxSize={10}
          color="blue.500"
        />
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {description}
        </Text>
      </VStack>
    </MotionBox>
  );
};

export function HowItWorks() {
  const { t } = useTranslation('common');

  const steps = [
    {
      icon: FaDatabase,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      delay: 0.1
    },
    {
      icon: FaCode,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      delay: 0.2
    },
    {
      icon: FaRobot,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      delay: 0.3
    },
    {
      icon: FaChartLine,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
      delay: 0.4
    }
  ];

  return (
    <Box
      as="section"
      py={{ base: 12, md: 20 }}
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Container maxW="container.xl">
        <VStack spacing={{ base: 8, md: 12 }}>
          <Heading
            as="h2"
            fontSize={{ base: '2xl', md: '4xl' }}
            textAlign="center"
            mb={{ base: 4, md: 8 }}
          >
            {t('howItWorks.title')}
          </Heading>
          
          <Stack 
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 6, md: 8 }}
            w="100%"
            align="stretch"
          >
            {steps.map((step) => (
              <Step
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.description}
                delay={step.delay}
              />
            ))}
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
}
