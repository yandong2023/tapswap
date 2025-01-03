import { Box, Container, Stack, Text, Link, IconButton, HStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

// 社交媒体图标组件
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function Footer() {
  const { t } = useTranslation('common');
  
  return (
    <Box bg="gray.50" color="gray.700" py={10}>
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={8}
          justify="space-between"
          align="center"
        >
          <Text>{t('footer.copyright', { year: new Date().getFullYear() })}</Text>
          
          <HStack spacing={4}>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
              {t('footer.company.about')}
            </Link>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
              {t('footer.company.contact')}
            </Link>
            <Link href="#" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
              {t('footer.legal.privacy')}
            </Link>
          </HStack>

          <HStack spacing={4}>
            <IconButton
              aria-label={t('footer.social.github')}
              icon={<GithubIcon />}
              size="md"
              variant="ghost"
              _hover={{ bg: 'blue.50' }}
            />
            <IconButton
              aria-label={t('footer.social.twitter')}
              icon={<TwitterIcon />}
              size="md"
              variant="ghost"
              _hover={{ bg: 'blue.50' }}
            />
            <IconButton
              aria-label={t('footer.social.instagram')}
              icon={<InstagramIcon />}
              size="md"
              variant="ghost"
              _hover={{ bg: 'blue.50' }}
            />
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
