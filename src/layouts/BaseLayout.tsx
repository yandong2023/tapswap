import { Box, Container } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Navigation } from '@/components/Navigation'

interface BaseLayoutProps {
  children: ReactNode
  locale?: string
}

const getLayoutStyles = (locale: string) => {
  switch (locale) {
    case 'fa':
      return {
        fontFamily: 'Vazirmatn, sans-serif',
        textAlign: 'right' as const,
        direction: 'rtl' as const,
      }
    case 'zh':
      return {
        fontFamily: '"Noto Sans SC", sans-serif',
        lineHeight: '1.8',
        letterSpacing: '0.05em',
      }
    case 'ko':
      return {
        fontFamily: '"Noto Sans KR", sans-serif',
        lineHeight: '1.7',
        letterSpacing: '0.02em',
      }
    case 'ru':
      return {
        fontFamily: '"Roboto", sans-serif',
        lineHeight: '1.5',
        letterSpacing: '0.01em',
      }
    default:
      return {
        fontFamily: '"Inter", sans-serif',
        lineHeight: '1.5',
      }
  }
}

export function BaseLayout({ children, locale = 'en' }: BaseLayoutProps) {
  const styles = getLayoutStyles(locale)

  return (
    <Box sx={styles}>
      <Navigation />
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  )
}
