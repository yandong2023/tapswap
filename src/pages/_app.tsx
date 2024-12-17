import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import '@/i18n'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useEffect } from 'react';

// 添加性能监控
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric); // 发送到分析服务
  }
}

// 预加载其他语言页面
const prefetchOtherLocales = (currentLocale) => {
  const locales = ['en', 'fa', 'zh', 'ko', 'ru'].filter(l => l !== currentLocale);
  locales.forEach(locale => {
    router.prefetch(`/${locale}`);
  });
};

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const isRTL = router.locale === 'fa';

  useEffect(() => {
    prefetchOtherLocales(router.locale);
  }, [router.locale]);

  return (
    <ErrorBoundary>
      <ChakraProvider>
        <Head>
          <meta name="description" content={t('meta.description')} />
          <meta name="keywords" content={t('meta.keywords')} />
          <meta property="og:title" content={t('meta.ogTitle')} />
          <meta property="og:description" content={t('meta.ogDescription')} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://tapswap.ir" />
          <meta property="og:image" content="https://tapswap.ir/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={t('meta.twitterTitle')} />
          <meta name="twitter:description" content={t('meta.twitterDescription')} />
          <meta name="twitter:image" content="https://tapswap.ir/twitter-image.jpg" />
        </Head>
        <div dir={isRTL ? 'rtl' : 'ltr'} lang={router.locale}>
          <Component {...pageProps} />
        </div>
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(App)
