import { useEffect, useState } from 'react';
import { Container, VStack, Heading, Divider, Text, Box, Button } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { CodeCard } from '@/components/CodeCard';
import { TapswapCode } from '@/types';
import { getFromLocalStorage } from '@/utils/storage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function History() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const isRTL = router.locale === 'fa';
  const [codes, setCodes] = useState<TapswapCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  async function fetchCodes() {
    try {
      setLoading(true);
      const response = await fetch('/api/codes');
      if (!response.ok) {
        throw new Error('Failed to fetch codes');
      }
      const data = await response.json();
      setCodes(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError(t('errors.fetchFailed'));
      console.error('Error:', err);
      const localCodes = getFromLocalStorage();
      if (localCodes.length > 0) {
        setCodes(localCodes);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const localCodes = getFromLocalStorage();
    if (localCodes.length > 0) {
      setCodes(localCodes);
      setLoading(false);
    }
    
    fetchCodes();
  }, []);

  // 根据日期分组代码
  const groupedCodes = codes.reduce((groups: Record<string, TapswapCode[]>, code) => {
    const date = new Intl.DateTimeFormat(isRTL ? 'fa-IR' : router.locale || 'en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(code.createdAt));
    
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(code);
    return groups;
  }, {});

  // 按日期降序排序
  const sortedDates = Object.keys(groupedCodes).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8} textAlign="center">
        <Heading as="h1" mb={4} textAlign={isRTL ? 'right' : 'left'}>
          {t('history.title')}
        </Heading>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={fetchCodes}
          isLoading={loading}
          loadingText={t('codes.refreshing')}
        >
          {t('codes.refresh')}
        </Button>
        {lastUpdate && (
          <Text fontSize="sm" color="gray.500" mt={2} textAlign={isRTL ? 'right' : 'left'}>
            {t('codes.lastUpdate')}: {new Intl.DateTimeFormat(isRTL ? 'fa-IR' : router.locale || 'en', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }).format(lastUpdate)}
          </Text>
        )}
      </Box>

      {loading && codes.length === 0 && (
        <Text textAlign="center">{t('codes.loading')}</Text>
      )}

      {error && (
        <Text textAlign="center" color="red.500" mb={4}>{error}</Text>
      )}

      {!loading && sortedDates.length === 0 && (
        <Text textAlign="center">{t('codes.noResults')}</Text>
      )}

      <VStack spacing={8} align="stretch">
        {sortedDates.map((date) => (
          <Box key={date}>
            <Heading size="md" mb={4} textAlign={isRTL ? 'right' : 'left'}>
              {date} ({groupedCodes[date].length} {t('codes.count')})
            </Heading>
            <Divider mb={4} />
            <VStack spacing={4} align="stretch">
              {groupedCodes[date].map((code) => (
                <CodeCard key={code.id} code={code} locale={isRTL ? 'fa' : router.locale || 'en'} />
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>

      <Box mt={8} textAlign="center" color="gray.500">
        <Text>{t('codes.clickToCopy')}</Text>
        <Text>{t('codes.totalCount')}: {codes.length}</Text>
      </Box>
    </Container>
  );
}
