export interface TapswapCode {
  id: string;
  code: string;
  title: string;
  description?: string;
  createdAt: string;
  isActive: boolean;
  source?: string;
  validUntil?: string;
}

export interface CodeStats {
  total: number;
  active: number;
  sources: {
    [key: string]: number;
  };
}

export interface TapswapCodeMultilingual extends TapswapCode {
  language: string;
  translations?: {
    [key: string]: {
      title: string;
      description: string;
    }
  }
}

export interface LocalizedContent {
  title: string;
  description: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface LanguageConfig {
  [key: string]: LocalizedContent;
}

export const languageConfigs: LanguageConfig = {
  fa: {
    title: 'کد تپ سواپ امروز',
    description: 'دریافت جدیدترین کدهای تپ سواپ به صورت روزانه',
    keywords: ['کد تپ سواپ امروز', 'کد تپ سواپ', 'تپ سواپ کد'],
    metaTitle: 'کد تپ سواپ امروز | دریافت کد های جدید TapSwap',
    metaDescription: 'دریافت جدیدترین کدهای تپ سواپ به صورت روزانه. کد های معتبر و به روز TapSwap را اینجا پیدا کنید.'
  },
  zh: {
    title: 'TapSwap优惠码',
    description: '最新TapSwap兑换码每日更新',
    keywords: ['TapSwap优惠码', 'TapSwap兑换码', 'TapSwap码'],
    metaTitle: 'TapSwap优惠码 | 最新TapSwap兑换码',
    metaDescription: '每日更新最新TapSwap优惠码和兑换码。获取可用的TapSwap奖励代码。'
  },
  ko: {
    title: 'TapSwap 코드',
    description: '매일 업데이트되는 최신 TapSwap 코드',
    keywords: ['TapSwap 코드', '탭스왑 코드', 'tapswap 보상'],
    metaTitle: 'TapSwap 코드 | 최신 보상 코드 받기',
    metaDescription: '매일 업데이트되는 최신 TapSwap 코드를 받으세요. 검증된 TapSwap 보상 코드를 여기서 찾으세요.'
  },
  ru: {
    title: 'Коды TapSwap',
    description: 'Ежедневные обновления кодов TapSwap',
    keywords: ['коды tapswap', 'коды tap swap', 'награды tapswap'],
    metaTitle: 'Коды TapSwap | Получите последние коды вознаграждения',
    metaDescription: 'Получите последние коды TapSwap, обновляемые ежедневно. Найдите рабочие и проверенные коды вознаграждения TapSwap здесь.'
  },
  en: {
    title: 'TapSwap Codes',
    description: 'Get Latest TapSwap Codes Daily',
    keywords: ['tapswap codes', 'tap swap codes', 'tapswap rewards'],
    metaTitle: 'TapSwap Codes | Get Latest Reward Codes',
    metaDescription: 'Get the latest TapSwap codes updated daily. Find working and verified TapSwap reward codes here.'
  }
  // ... 其他语言
};
