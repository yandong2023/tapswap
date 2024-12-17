import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { Hero } from '@/components/landing/Hero/fa';

const faMetadata = {
  title: 'کد تپ سواپ امروز | دریافت کد های جدید TapSwap',
  description: 'دریافت جدیدترین کدهای تپ سواپ به صورت روزانه. کد های معتبر و به روز TapSwap را اینجا پیدا کنید.',
  keywords: [
    'کد تپ سواپ امروز',
    'کد تپ سواپ',
    'تپ سواپ کد',
    'کد های تپ سواپ رایگان',
    'کد تپ سواپ جدید',
    'کد تپ سواپ امروز رایگان'
  ].join(', ')
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'fa', ['common'])),
    },
  };
};

export default function FaPage() {
  return (
    <Box as="main">
      <Head>
        <title>{faMetadata.title}</title>
        <meta name="description" content={faMetadata.description} />
        <meta name="keywords" content={faMetadata.keywords} />
        <link rel="canonical" href="https://tapswapcode.net/fa" />
        
        {/* hreflang 标记 */}
        <link rel="alternate" href="https://tapswapcode.net" hrefLang="x-default" />
        <link rel="alternate" href="https://tapswapcode.net/fa" hrefLang="fa" />
        <link rel="alternate" href="https://tapswapcode.net/en" hrefLang="en" />
        <link rel="alternate" href="https://tapswapcode.net/zh" hrefLang="zh" />
        <link rel="alternate" href="https://tapswapcode.net/ko" hrefLang="ko" />
        <link rel="alternate" href="https://tapswapcode.net/ru" hrefLang="ru" />
        
        {/* Schema.org 标记 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": faMetadata.title,
              "description": faMetadata.description,
              "inLanguage": "fa",
              "url": "https://tapswapcode.net/fa",
              "isPartOf": {
                "@type": "WebSite",
                "name": "TapSwap Codes",
                "url": "https://tapswapcode.net"
              }
            })
          }}
        />
      </Head>

      <Hero />
      {/* 其他波斯语特定组件 */}
    </Box>
  );
} 