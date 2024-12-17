import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { Hero } from '@/components/landing/Hero/ko';

const koMetadata = {
  title: 'TapSwap 코드 | 최신 보상 코드 받기',
  description: '매일 업데이트되는 최신 TapSwap 코드를 받으세요. 검증된 TapSwap 보상 코드를 여기서 찾으세요.',
  keywords: [
    'TapSwap 코드',
    '탭스왑 코드',
    'tapswap 보상',
    'tapswap 프로모션',
    '탭스왑 최신코드',
    'TapSwap 무료코드'
  ].join(', ')
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ko', ['common'])),
    },
  };
};

export default function KoPage() {
  return (
    <Box as="main">
      <Head>
        <title>{koMetadata.title}</title>
        <meta name="description" content={koMetadata.description} />
        <meta name="keywords" content={koMetadata.keywords} />
        <link rel="canonical" href="https://tapswapcode.net/ko" />
        
        {/* hreflang 标记 */}
        <link rel="alternate" href="https://tapswapcode.net" hrefLang="x-default" />
        <link rel="alternate" href="https://tapswapcode.net/ko" hrefLang="ko" />
        <link rel="alternate" href="https://tapswapcode.net/en" hrefLang="en" />
        <link rel="alternate" href="https://tapswapcode.net/fa" hrefLang="fa" />
        <link rel="alternate" href="https://tapswapcode.net/zh" hrefLang="zh" />
        <link rel="alternate" href="https://tapswapcode.net/ru" hrefLang="ru" />
        
        {/* Schema.org 标记 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": koMetadata.title,
              "description": koMetadata.description,
              "inLanguage": "ko",
              "url": "https://tapswapcode.net/ko"
            })
          }}
        />
      </Head>

      <Hero />
    </Box>
  );
} 