import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { TapswapCode } from '@/types';
import { getFromLocalStorage } from '@/utils/storage';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';
import { CodesSection } from '@/components/CodesSection';

export default function Home() {
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

    const interval = setInterval(fetchCodes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Hero />
      <Features />
      <CodesSection
        codes={codes}
        loading={loading}
        error={error}
        lastUpdate={lastUpdate}
        onRefresh={fetchCodes}
      />
      <HowItWorks />
      <FAQ />
      <Footer />
    </Box>
  );
}
