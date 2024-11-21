import { useEffect, useState } from 'react';
import { Container, VStack, Heading, Divider, Text, Box, Button } from '@chakra-ui/react';
import { CodeCard } from '@/components/CodeCard';
import { TapswapCode } from '@/types';
import { getFromLocalStorage } from '@/utils/storage';

export default function History() {
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
      setError('خطا در دریافت کدها، استفاده از داده‌های ذخیره شده محلی');
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

  // گروه‌بندی کدها بر اساس تاریخ
  const groupedCodes = codes.reduce((groups: Record<string, TapswapCode[]>, code) => {
    // تبدیل تاریخ به فرمت شمسی
    const date = new Intl.DateTimeFormat('fa-IR', {
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

  // مرتب‌سازی تاریخ‌ها به صورت نزولی
  const sortedDates = Object.keys(groupedCodes).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8} textAlign="center">
        <Heading as="h1" mb={4}>
          تاریخچه کدهای تپ‌سواپ
        </Heading>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={fetchCodes}
          isLoading={loading}
          loadingText="در حال به‌روزرسانی"
        >
          به‌روزرسانی
        </Button>
        {lastUpdate && (
          <Text fontSize="sm" color="gray.500" mt={2}>
            آخرین به‌روزرسانی: {new Intl.DateTimeFormat('fa-IR', {
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
        <Text textAlign="center">در حال بارگذاری...</Text>
      )}

      {error && (
        <Text textAlign="center" color="red.500" mb={4}>{error}</Text>
      )}

      {!loading && sortedDates.length === 0 && (
        <Text textAlign="center">هیچ کد تاریخی موجود نیست</Text>
      )}

      <VStack spacing={8} align="stretch">
        {sortedDates.map((date) => (
          <div key={date}>
            <Heading as="h2" size="md" mb={4}>
              {date} ({groupedCodes[date].length} کد)
            </Heading>
            <VStack spacing={4} align="stretch">
              {groupedCodes[date].map((code) => (
                <CodeCard key={code.id} code={code} />
              ))}
            </VStack>
            <Divider mt={4} />
          </div>
        ))}
      </VStack>

      <Box mt={8} textAlign="center" color="gray.500">
        <Text>برای کپی کردن کد روی آن کلیک کنید</Text>
        <Text>مجموع کدها: {codes.length}</Text>
      </Box>
    </Container>
  );
}
