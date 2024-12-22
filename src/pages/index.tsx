import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';
import { CodesSection } from '@/components/CodesSection';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TapswapCode } from '@/types';
import { getFromLocalStorage } from '@/utils/storage';
import { useRouter } from 'next/router';
import { SEO } from '@/components/SEO';

interface HomeProps {
  canonical?: string;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req, locale, resolvedUrl }) => {
  const defaultLocale = 'en'
  const host = req.headers.host || 'tapswap.com'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  
  if (locale === undefined) {
    return {
      redirect: {
        destination: `/${defaultLocale}${resolvedUrl}`,
        permanent: true,
      },
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      canonical: `${protocol}://${host}/${locale}${resolvedUrl}`,
    },
  }
}

export default function Home({ canonical }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      <SEO canonical={canonical} />
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
