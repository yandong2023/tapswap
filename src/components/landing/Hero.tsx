import { Box, Container, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { Navbar } from '../Navbar';

export function Hero() {
  const { t } = useTranslation('common');

  return (
    <Box>
      <Navbar />
      <Box 
        bg="blue.500" 
        color="white" 
        pt={{ base: 24, md: 28 }}
        pb={20}
      >
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
                {t('hero.title')}
              </Heading>
              <Text fontSize="xl" mb={8}>
                {t('hero.description')}
              </Text>
              <Button
                size="lg"
                colorScheme="white"
                variant="outline"
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                {t('hero.getStarted', 'Get Started')}
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
