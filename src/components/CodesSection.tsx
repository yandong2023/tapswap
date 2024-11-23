import { Container, SimpleGrid, Heading, Box, Text, Button } from '@chakra-ui/react';
import { TapswapCode } from '@/types';
import { CodeCard } from './CodeCard';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface CodesSectionProps {
  codes: TapswapCode[];
  loading: boolean;
  error: string;
  lastUpdate: Date | null;
  onRefresh: () => void;
}

export function CodesSection({
  codes,
  loading,
  error,
  lastUpdate,
  onRefresh,
}: CodesSectionProps) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const activeCodes = codes.filter(code => code.isActive);
  const isRTL = locale === 'fa';

  const formatDateTime = (date: Date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    } as const;
    
    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  return (
    <Box py={20} dir={isRTL ? 'rtl' : 'ltr'}>
      <Container maxW="container.xl">
        <Box mb={8} textAlign="center">
          <Heading as="h2" mb={4}>
            {t('codes.activeCodes')}
          </Heading>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={onRefresh}
            isLoading={loading}
            loadingText={t('codes.refreshing')}
          >
            {t('codes.refresh')}
          </Button>
          {lastUpdate && (
            <Text fontSize="sm" color="gray.500" mt={2}>
              {t('codes.lastUpdate')}: {formatDateTime(lastUpdate)}
            </Text>
          )}
        </Box>

        {loading && codes.length === 0 && (
          <Text textAlign="center">{t('codes.loading')}</Text>
        )}

        {error && (
          <Text textAlign="center" color="red.500" mb={4}>{error}</Text>
        )}

        {!loading && activeCodes.length === 0 && (
          <Text textAlign="center">{t('codes.noActiveCodes')}</Text>
        )}

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {activeCodes.map((code) => (
            <CodeCard key={code.id} code={code} isRTL={isRTL} />
          ))}
        </SimpleGrid>

        <Box mt={8} textAlign="center" color="gray.500">
          <Text>{t('codes.clickToCopy')}</Text>
          <Text>{t('codes.updateInterval')}</Text>
          <Text>{t('codes.activeCodeCount')}: {activeCodes.length}</Text>
        </Box>
      </Container>
    </Box>
  );
}
