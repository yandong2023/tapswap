import { GetStaticProps, GetStaticPaths } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BaseLayout } from '@/layouts/BaseLayout'
import { Box, Heading, Text, SimpleGrid, VStack, Button, Icon, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { TapswapCode } from '@/types'
import { FiRefreshCw } from 'react-icons/fi'
import { CodeCard } from '@/components/CodeCard'

interface HomePageProps {
  codes: TapswapCode[]
  locale: string
}

export default function HomePage({ codes, locale }: HomePageProps) {
  const { t } = useTranslation('common')

  const getLocaleSpecificStyles = () => {
    switch (locale) {
      case 'fa':
        return {
          textAlign: 'right' as const,
          direction: 'rtl' as const,
        }
      default:
        return {
          textAlign: 'left' as const,
          direction: 'ltr' as const,
        }
    }
  }

  const styles = getLocaleSpecificStyles()

  return (
    <BaseLayout locale={locale}>
      <VStack spacing={12} align="stretch" textAlign={styles.textAlign}>
        <Box>
          <Heading mb={4}>{t('hero.title')}</Heading>
          <Text fontSize="lg" color="gray.600">
            {t('hero.description')}
          </Text>
        </Box>

        <Box id="features">
          <Heading size="lg" mb={6}>
            {t('features.title')}
          </Heading>
          <SimpleGrid columns={[1, 2, 4]} spacing={6}>
            {[1, 2, 3, 4].map((num) => (
              <Box key={num} p={5} shadow="md" borderRadius="lg" borderWidth="1px">
                <Heading size="md" mb={3}>
                  {t(`features.feature${num}`)}
                </Heading>
                <Text color="gray.600">
                  {t(`features.feature${num}Description`)}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box id="how-it-works">
          <Heading size="lg" mb={6}>
            {t('howItWorks.title')}
          </Heading>
          <SimpleGrid columns={[1, 2, 4]} spacing={6}>
            {[1, 2, 3, 4].map((num) => (
              <Box key={num} p={5} shadow="md" borderRadius="lg" borderWidth="1px">
                <Heading size="md" mb={3}>
                  {t(`howItWorks.feature${num}`)}
                </Heading>
                <Text color="gray.600">
                  {t(`howItWorks.feature${num}Description`)}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
            <Heading size="lg">{t('nav.newCodes')}</Heading>
            <Button
              leftIcon={locale === 'fa' ? undefined : <Icon as={FiRefreshCw} />}
              rightIcon={locale === 'fa' ? <Icon as={FiRefreshCw} /> : undefined}
              variant="ghost"
            >
              {t('codes.refresh')}
            </Button>
          </Box>
          
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {codes.map((code) => (
              <CodeCard key={code.id} code={code} locale={locale} />
            ))}
          </SimpleGrid>
        </Box>

        <Box id="faq">
          <Heading size="lg" mb={6}>
            {t('faq.title')}
          </Heading>
          <Accordion allowMultiple>
            {[1, 2, 3, 4].map((num) => (
              <AccordionItem key={num}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign={styles.textAlign}>
                      {t(`faq.q${num}`)}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} textAlign={styles.textAlign}>
                  {t(`faq.a${num}`)}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </VStack>
    </BaseLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { locale: 'en' } },
      { params: { locale: 'zh' } },
      { params: { locale: 'ko' } },
      { params: { locale: 'ru' } },
      { params: { locale: 'fa' } },
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  if (!locale) {
    locale = params?.locale as string
  }

  const codes: TapswapCode[] = []

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      codes,
      locale,
    },
  }
}
