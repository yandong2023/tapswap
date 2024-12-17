import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { Hero } from '@/components/landing/Hero/zh';

const zhMetadata = {
  title: 'TapSwap优惠码 | 最新TapSwap兑换码',
  description: '每日更新最新TapSwap优惠码和兑换码。获取可用的TapSwap奖励代码。',
  keywords: [
    'TapSwap优惠码',
    'TapSwap兑换码',
    'TapSwap码',
    'tapswap代码',
    'TapSwap最新优惠码',
    'TapSwap今日兑换码'
  ].join(', ')
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'zh', ['common'])),
    },
  };
};

export default function ZhPage() {
  return (
    <Box as="main">
      <Head>
        <title>{zhMetadata.title}</title>
        <meta name="description" content={zhMetadata.description} />
        <meta name="keywords" content={zhMetadata.keywords} />
        <link rel="canonical" href="https://tapswapcode.net/zh" />
        
        {/* hreflang 标记 */}
        <link rel="alternate" href="https://tapswapcode.net" hrefLang="x-default" />
        <link rel="alternate" href="https://tapswapcode.net/zh" hrefLang="zh" />
        <link rel="alternate" href="https://tapswapcode.net/en" hrefLang="en" />
        <link rel="alternate" href="https://tapswapcode.net/fa" hrefLang="fa" />
        <link rel="alternate" href="https://tapswapcode.net/ko" hrefLang="ko" />
        <link rel="alternate" href="https://tapswapcode.net/ru" hrefLang="ru" />
        
        {/* Schema.org 标记 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": zhMetadata.title,
              "description": zhMetadata.description,
              "inLanguage": "zh",
              "url": "https://tapswapcode.net/zh",
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
      {/* 其他中文特定组件 */}
    </Box>
  );
} 