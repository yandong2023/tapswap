import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { Hero } from '@/components/landing/Hero/ru';

const ruMetadata = {
  title: 'Коды TapSwap | Получите последние коды вознаграждения',
  description: 'Получите последние коды TapSwap, обновляемые ежедневно. Найдите рабочие и проверенные коды вознаграждения TapSwap здесь.',
  keywords: [
    'коды tapswap',
    'коды tap swap',
    'награды tapswap',
    'промо-коды tapswap',
    'бесплатные коды tapswap',
    'актуальные коды tapswap'
  ].join(', ')
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ru', ['common'])),
    },
  };
};

export default function RuPage() {
  return (
    <Box as="main">
      <Head>
        <title>{ruMetadata.title}</title>
        <meta name="description" content={ruMetadata.description} />
        <meta name="keywords" content={ruMetadata.keywords} />
        <link rel="canonical" href="https://tapswapcode.net/ru" />
        
        {/* hreflang 标记 */}
        <link rel="alternate" href="https://tapswapcode.net" hrefLang="x-default" />
        <link rel="alternate" href="https://tapswapcode.net/ru" hrefLang="ru" />
        <link rel="alternate" href="https://tapswapcode.net/en" hrefLang="en" />
        <link rel="alternate" href="https://tapswapcode.net/fa" hrefLang="fa" />
        <link rel="alternate" href="https://tapswapcode.net/zh" hrefLang="zh" />
        <link rel="alternate" href="https://tapswapcode.net/ko" hrefLang="ko" />
        
        {/* Schema.org 标记 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": ruMetadata.title,
              "description": ruMetadata.description,
              "inLanguage": "ru",
              "url": "https://tapswapcode.net/ru"
            })
          }}
        />
      </Head>

      <Hero />
    </Box>
  );
} 