import { Box, Container, Stack, Text, Link, useColorModeValue, SimpleGrid, Icon } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa';

export function Footer() {
  const { t } = useTranslation('common');
  
  const linkGroups = [
    {
      title: t('footer.resources.title'),
      links: [
        { label: t('footer.resources.docs'), href: '/docs' },
        { label: t('footer.resources.api'), href: '/api' },
        { label: t('footer.resources.status'), href: '/status' }
      ]
    },
    {
      title: t('footer.company.title'),
      links: [
        { label: t('footer.company.about'), href: '/about' },
        { label: t('footer.company.contact'), href: '/contact' },
        { label: t('footer.company.blog'), href: '/blog' }
      ]
    },
    {
      title: t('footer.legal.title'),
      links: [
        { label: t('footer.legal.terms'), href: '/terms' },
        { label: t('footer.legal.privacy'), href: '/privacy' },
        { label: t('footer.legal.cookies'), href: '/cookies' }
      ]
    }
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/tapswap', label: t('footer.social.github') },
    { icon: FaTwitter, href: 'https://twitter.com/tapswap', label: t('footer.social.twitter') },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/tapswap', label: t('footer.social.linkedin') },
    { icon: FaDiscord, href: 'https://discord.gg/tapswap', label: t('footer.social.discord') }
  ];

  return (
    <Box
      as="footer"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container maxW="container.xl" py={10}>
        <SimpleGrid
          templateColumns={{ base: '1fr', md: '2fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          {/* Company Info */}
          <Stack spacing={6}>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                {t('footer.brand')}
              </Text>
              <Text mt={1} color={useColorModeValue('gray.600', 'gray.400')}>
                {t('footer.description')}
              </Text>
            </Box>
            <Stack direction="row" spacing={4}>
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  isExternal
                  aria-label={link.label}
                >
                  <Icon as={link.icon} boxSize={5} />
                </Link>
              ))}
            </Stack>
          </Stack>

          {/* Link Groups */}
          {linkGroups.map((group) => (
            <Stack key={group.title} align="flex-start">
              <Text fontWeight="bold" fontSize="sm" textTransform="uppercase">
                {group.title}
              </Text>
              {group.links.map((link) => (
                <NextLink key={link.href} href={link.href} passHref>
                  <Link
                    color={useColorModeValue('gray.600', 'gray.400')}
                    _hover={{
                      color: useColorModeValue('gray.800', 'white')
                    }}
                  >
                    {link.label}
                  </Link>
                </NextLink>
              ))}
            </Stack>
          ))}
        </SimpleGrid>

        <Box
          borderTopWidth={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          pt={8}
          mt={8}
          textAlign="center"
        >
          <Text
            fontSize="sm"
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
