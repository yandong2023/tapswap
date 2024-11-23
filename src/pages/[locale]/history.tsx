import { GetStaticProps, GetStaticPaths } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BaseLayout } from '@/layouts/BaseLayout'
import { Box, Heading, VStack, Text } from '@chakra-ui/react'
import { TapswapCode } from '@/types'
import { useRouter } from 'next/router'

interface HistoryPageProps {
  historyCodes: TapswapCode[]
  locale: string
}

const getLocaleSpecificStyles = (locale: string) => {
  switch (locale) {
    case 'fa':
      return {
        container: {
          direction: 'rtl' as const,
          textAlign: 'right' as const,
        },
        text: {
          fontFamily: 'Vazirmatn, sans-serif',
        },
      }
    case 'zh':
      return {
        container: {},
        text: {
          fontFamily: '"Noto Sans SC", sans-serif',
          letterSpacing: '0.05em',
          lineHeight: '1.8',
        },
      }
    case 'ko':
      return {
        container: {},
        text: {
          fontFamily: '"Noto Sans KR", sans-serif',
          letterSpacing: '0.02em',
          wordBreak: 'keep-all' as const,
          lineHeight: '1.7',
        },
      }
    case 'ru':
      return {
        container: {},
        text: {
          fontFamily: '"Roboto", sans-serif',
          letterSpacing: '0.01em',
          lineHeight: '1.5',
        },
      }
    default:
      return {
        container: {},
        text: {
          fontFamily: '"Inter", sans-serif',
        },
      }
  }
}

function HistoryPage({ historyCodes, locale }: HistoryPageProps) {
  const { t } = useTranslation('common')
  const styles = getLocaleSpecificStyles(locale)
  const router = useRouter()

  return (
    <BaseLayout locale={locale}>
      <Box
        py={8}
        px={4}
        {...styles.container}
      >
        <VStack spacing={8} align="stretch" maxW="container.xl" mx="auto">
          <Heading as="h1" size="xl" {...styles.text}>
            {t('history.title')}
          </Heading>
          {historyCodes.length === 0 ? (
            <Text {...styles.text}>
              {t('history.noHistory')}
            </Text>
          ) : (
            <VStack spacing={4} align="stretch">
              {historyCodes.map((code) => (
                <Box key={code.id}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="lg"
                  {...styles.text}
                >
                  <Heading size="md" mb={2}>
                    {code.title}
                  </Heading>
                  <Text>{code.code}</Text>
                  {code.description && (
                    <Text mt={2} color="gray.600">
                      {code.description}
                    </Text>
                  )}
                  <Text mt={2} fontSize="sm" color="gray.500">
                    {new Date(code.createdAt).toLocaleDateString(locale)}
                  </Text>
                </Box>
              ))}
            </VStack>
          )}
        </VStack>
      </Box>
    </BaseLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { locale: 'en' } },
      { params: { locale: 'fa' } },
      { params: { locale: 'ru' } },
      { params: { locale: 'ko' } },
      { params: { locale: 'zh' } }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string
  
  if (!['en', 'fa', 'ru', 'ko', 'zh'].includes(locale)) {
    return {
      notFound: true
    }
  }

  // 这里添加获取历史代码的逻辑
  const historyCodes: TapswapCode[] = []

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      historyCodes,
      locale,
    },
  }
}

export default HistoryPage
