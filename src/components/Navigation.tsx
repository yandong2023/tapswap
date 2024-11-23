import { Box, Container, Flex, Button, useColorModeValue, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navigation() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box 
      as="nav" 
      py={4} 
      borderBottom="1px" 
      borderColor={borderColor}
      bg={bgColor}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Container maxW="container.xl">
        <Flex align="center">
          <Link href="/" locale={router.locale} passHref>
            <Button as="a" variant="ghost">
              {t('nav.home')}
            </Button>
          </Link>
          <Link href="/history" locale={router.locale} passHref>
            <Button as="a" variant="ghost" ml={4}>
              {t('nav.history')}
            </Button>
          </Link>
          <Spacer />
          <LanguageSwitcher />
        </Flex>
      </Container>
    </Box>
  )
}
