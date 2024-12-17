import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { CodesSection } from '@/components/CodesSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';

const languageMetadata = {
  fa: {
    title: 'کد تپ سواپ امروز | دریافت کد های جدید TapSwap',
    description: 'دریافت جدیدترین کدهای تپ سواپ به صورت روزانه. کد های معتبر و به روز TapSwap را اینجا پیدا کنید.',
    keywords: 'کد تپ سواپ امروز, کد تپ سواپ, تپ سواپ کد, tapswap code',
  },
  en: {
    title: 'TapSwap Codes | Get Latest Reward Codes',
    description: 'Get the latest TapSwap codes updated daily. Find working and verified TapSwap reward codes here.',
    keywords: 'tapswap codes, tap swap codes, tapswap rewards, tapswap promo codes',
  },
  zh: {
    title: 'TapSwap优惠码 | 最新TapSwap兑换码',
    description: '每日更新最新TapSwap优惠码和兑换码。获取可用的TapSwap奖励代码。',
    keywords: 'TapSwap优惠码, TapSwap兑换码, TapSwap码, tapswap代码',
  },
  ko: {
    title: 'TapSwap 코드 | 최신 보상 코드 받기',
    description: '매일 업데이트되는 최신 TapSwap 코드를 받으세요. 검증된 TapSwap 보상 코드를 여기서 찾으세요.',
    keywords: 'TapSwap 코드, 탭스왑 코드, tapswap 보상, tapswap 프로모션',
  },
  ru: {
    title: 'Коды TapSwap | Получите последние коды вознаграждения',
    description: 'Получите последние коды TapSwap, обновляемые ежедневно. Найдите рабочие и проверенные коды вознаграждения TapSwap здесь.',
    keywords: 'коды tapswap, коды tap swap, награды tapswap, промо-коды tapswap',
  },
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const lang = params?.lang as string || 'en';
  
  return {
    props: {
      ...(await serverSideTranslations(lang, ['common'])),
      lang,
    },
  };
};

interface LangPageProps {
  lang: keyof typeof languageMetadata;
}

export default function LangPage({ lang }: LangPageProps) {
  const metadata = languageMetadata[lang];

  const getStructuredData = (lang: string) => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": languageMetadata[lang].title,
      "description": languageMetadata[lang].description,
      "inLanguage": lang,
      "url": `https://tapswapcode.net/${lang}`,
      "isPartOf": {
        "@type": "WebSite",
        "name": "TapSwap Codes",
        "url": "https://tapswapcode.net"
      }
    };
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": metadata.title,
    "description": metadata.description,
    "inLanguage": lang,
    "url": `https://tapswapcode.net/${lang}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": codes.map((code, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Offer",
          "name": code.title,
          "description": code.description,
          "validFrom": code.createdAt,
          "validThrough": code.validUntil
        }
      }))
    }
  };

  return (
    <Box as="main">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={`https://tapswapcode.net/${lang}`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://tapswapcode.net/${lang}`} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
      </Head>

      <Hero />
      <Box id="features">
        <Features />
      </Box>
      <Box id="codes">
        <CodesSection />
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