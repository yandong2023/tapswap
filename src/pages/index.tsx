import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';
import { CodesSection } from '@/components/CodesSection';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TapswapCode } from '@/types';
import { getFromLocalStorage } from '@/utils/storage';
import { useRouter } from 'next/router';
import { Head } from 'next/head';

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const defaultLocale = 'en'
  const finalLocale = locale || defaultLocale
  
  return {
    props: {
      ...(await serverSideTranslations(finalLocale, ['common'])),
    },
  }
}

export default function Home() {
  const [codes, setCodes] = useState<TapswapCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const { t } = useTranslation('common');
  const router = useRouter();

  useEffect(() => {
    // 处理锚点跳转
    const hash = router.asPath.split('#')[1];
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [router.asPath]);

  async function fetchCodes() {
    try {
      setLoading(true);
      const response = await fetch('/api/codes');
      if (!response.ok) {
        throw new Error('Network response was not ok');
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

    const interval = setInterval(fetchCodes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box as="main">
      <Head>
        <title>TapSwap Codes | کد تپ سواپ امروز</title>
        <meta name="description" content="Get latest TapSwap codes and کد تپ سواپ امروز. Daily updated codes and rewards." />
        <meta name="keywords" content="tapswap code, کد تپ سواپ امروز, tap swap codes, tapswap rewards" />
      </Head>
      <Hero />
      <Box id="features">
        <Features />
      </Box>
      <Box id="codes">
        <CodesSection
          codes={codes}
          loading={loading}
          error={error}
          lastUpdate={lastUpdate}
          onRefresh={fetchCodes}
        />
      </Box>
      <Box id="howItWorks">
        <HowItWorks />
      </Box>
      <Box id="faq">
        <FAQ />
      </Box>
      <Footer />
    </Box>
  );
}
