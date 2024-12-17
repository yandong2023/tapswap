import {
  Box,
  Flex,
  Stack,
  Link as ChakraLink,
  useColorModeValue,
  Container,
  Button,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function Navbar() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const [isHome, setIsHome] = useState(true)

  useEffect(() => {
    setIsHome(router.pathname === '/')
  }, [router.pathname])

  const scrollToSection = (id: string) => {
    if (!isHome) {
      router.push(`/#${id}`).then(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'features', label: t('nav.features') },
    { id: 'codes', label: t('nav.codes') },
    { id: 'howItWorks', label: t('nav.howItWorks') },
    { id: 'faq', label: t('nav.faq') },
  ]

  return (
    <Box>
      <Box 
        position="fixed"
        top="0"
        width="100%"
        zIndex="sticky"
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        boxShadow="sm"
      >
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <ChakraLink
              as={Link}
              href="/"
              fontWeight="bold"
              fontSize="xl"
              _hover={{ textDecoration: 'none', color: 'blue.500' }}
            >
              TapSwap
            </ChakraLink>

            <Stack direction="row" spacing={4} alignItems="center">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  _hover={{ color: 'blue.500' }}
                >
                  {item.label}
                </Button>
              ))}
              <ChakraLink
                as={Link}
                href="/history"
                _hover={{ textDecoration: 'none' }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  _hover={{ color: 'blue.500' }}
                >
                  {t('nav.history')}
                </Button>
              </ChakraLink>
              <LanguageSwitcher />
            </Stack>
          </Flex>
        </Container>
      </Box>
      <Box height="4rem" />
    </Box>
  )
}