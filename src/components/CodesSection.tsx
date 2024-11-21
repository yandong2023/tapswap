import { Container, SimpleGrid, Heading, Box, Text, Button } from '@chakra-ui/react';
import { TapswapCode } from '@/types';
import { CodeCard } from './CodeCard';

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
  const activeCodes = codes.filter(code => code.isActive);

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <Box mb={8} textAlign="center">
          <Heading as="h2" mb={4}>
            کدهای فعال
          </Heading>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={onRefresh}
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

        {!loading && activeCodes.length === 0 && (
          <Text textAlign="center">هیچ کد فعالی موجود نیست</Text>
        )}

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {activeCodes.map((code) => (
            <CodeCard key={code.id} code={code} />
          ))}
        </SimpleGrid>

        <Box mt={8} textAlign="center" color="gray.500">
          <Text>برای کپی کردن کد روی آن کلیک کنید</Text>
          <Text>داده‌ها هر ۵ دقیقه به‌روز می‌شوند</Text>
          <Text>تعداد کدهای فعال: {activeCodes.length}</Text>
        </Box>
      </Container>
    </Box>
  );
}
