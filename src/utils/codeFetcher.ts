import axios from 'axios';
import cheerio from 'cheerio';
import { TapswapCode } from '@/types';
import { mergeWithLocalStorage } from './storage';

// 通用的请求头
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

async function fetchBitpinCodes(): Promise<TapswapCode[]> {
  try {
    const response = await axios.get('https://bitpin.ir/academy/tapswap-codes-29-aban/', { headers });
    const $ = cheerio.load(response.data);
    const codes: TapswapCode[] = [];

    $('article .entry-content p').each((_, element) => {
      const text = $(element).text().trim();
      if (text.includes('CODE:') || text.includes('code:') || text.includes('兑换码')) {
        const codeMatch = text.match(/(?:CODE:|code:|兑换码)[:\s]*([A-Za-z0-9]+)/);
        if (codeMatch && codeMatch[1]) {
          codes.push({
            id: Math.random().toString(36).substr(2, 9),
            code: codeMatch[1].trim(),
            title: codeMatch[1].trim(),
            description: text,
            source: 'BitPin Academy',
            createdAt: new Date().toISOString(),
            isActive: true,
          });
        }
      }
    });

    return codes;
  } catch (error) {
    console.error('Error fetching from BitPin:', error);
    return [];
  }
}

async function fetchTelegramCodes(): Promise<TapswapCode[]> {
  try {
    // 这里可以添加从Telegram频道获取代码的逻辑
    // 需要使用Telegram API或者其他方式
    return [];
  } catch (error) {
    console.error('Error fetching from Telegram:', error);
    return [];
  }
}

async function fetchDiscordCodes(): Promise<TapswapCode[]> {
  try {
    // 这里可以添加从Discord服务器获取代码的逻辑
    // 需要使用Discord API
    return [];
  } catch (error) {
    console.error('Error fetching from Discord:', error);
    return [];
  }
}

// 预设的一些代码数据
const predefinedCodes: TapswapCode[] = [
  // 29 آبان
  { id: '1', code: '3ing', title: 'Grow 100,000 Followers', createdAt: '2023-11-20', isActive: true, source: 'BitPin Academy' },
  { id: '2', code: '4ppy', title: 'Achieve $6,500', createdAt: '2023-11-20', isActive: true, source: 'BitPin Academy' },
  { id: '3', code: '&8QLf', title: 'Get Involved, Earn, and Collect Part 2', createdAt: '2023-11-20', isActive: true, source: 'BitPin Academy' },
  { id: '4', code: 'l6lo', title: 'Social Media', createdAt: '2023-11-20', isActive: true, source: 'BitPin Academy' },
  { id: '5', code: '5M3%&', title: 'McDonald\'s x Doodles Collab', createdAt: '2023-11-20', isActive: true, source: 'BitPin Academy' },
  { id: '6', code: '3Mb&D', title: 'Earning Rewards Part 1', createdAt: '2023-11-20', isActive: true, source: 'BitPin Academy' },
  { id: '7', code: 'tine', title: 'Relaxed Methods', createdAt: '2023-11-20', isActive: true, source: 'BitPin Academy' },
  { id: '8', code: 'shtag', title: 'Traffic Arbitrage', createdAt: '2023-11-20', isActive: true, source: 'BitPin Academy' },
  { id: '9', code: 'roof', title: 'Become a Millionaire', createdAt: '2023-11-20', isActive: true, source: 'BitPin Academy' },
  
  // 28 آبان
  { id: '10', code: '5ns2', title: 'Profit from Your Music', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  { id: '11', code: 'nd1er', title: 'Fiverr In 2025', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  { id: '12', code: '3tomm', title: 'High-Demand Digital Products', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  { id: '13', code: '7De5R', title: 'Earn On your Tweets', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  { id: '14', code: '6Nd%Y', title: 'Get Involved, Earn, and Collect! Part 1', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  { id: '15', code: 'sday', title: 'Earning With Your Drone', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  { id: '16', code: 'i8ng', title: 'TikTok Account', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  { id: '17', code: 'K8[e&', title: 'Info Finance X Blockchain X AI', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  { id: '18', code: 'hpful', title: 'Twitch Tactics', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  { id: '19', code: '8e2ce', title: 'Flipping Furniture', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  { id: '20', code: 'uate', title: 'Generate Income Online', createdAt: '2023-11-19', isActive: true, source: 'BitPin Academy' },
  
  // Adding more recent codes...
  // Note: More codes can be added here in the same format
];

export async function fetchCodes(): Promise<TapswapCode[]> {
  try {
    // For now, we'll return predefined codes
    // In the future, this can be expanded to fetch from multiple sources
    return predefinedCodes;
  } catch (error) {
    console.error('Error fetching codes:', error);
    return [];
  }
}

// Helper function to save codes to local storage
export function saveCodesToStorage(codes: TapswapCode[]) {
  try {
    localStorage.setItem('tapswap_codes', JSON.stringify(codes));
  } catch (error) {
    console.error('Error saving codes to storage:', error);
  }
}

// Helper function to get codes from local storage
export function getCodesFromStorage(): TapswapCode[] {
  try {
    const storedCodes = localStorage.getItem('tapswap_codes');
    return storedCodes ? JSON.parse(storedCodes) : [];
  } catch (error) {
    console.error('Error getting codes from storage:', error);
    return [];
  }
}

// Helper function to merge and deduplicate codes
export function mergeCodes(existingCodes: TapswapCode[], newCodes: TapswapCode[]): TapswapCode[] {
  const mergedCodes = [...existingCodes];
  
  newCodes.forEach(newCode => {
    const existingIndex = mergedCodes.findIndex(
      existing => existing.code === newCode.code
    );
    
    if (existingIndex === -1) {
      mergedCodes.push(newCode);
    }
  });
  
  return mergedCodes.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// 获取所有来源的代码
export async function getLatestCodes(): Promise<TapswapCode[]> {
  try {
    const [bitpinCodes, telegramCodes, discordCodes] = await Promise.all([
      fetchBitpinCodes(),
      fetchTelegramCodes(),
      fetchDiscordCodes()
    ]);

    // 合并所有来源的代码
    const allCodes = [
      ...bitpinCodes,
      ...telegramCodes,
      ...discordCodes,
      ...predefinedCodes
    ];

    // 合并到本地存储并返回
    return mergeWithLocalStorage(allCodes);
  } catch (error) {
    console.error('Error getting latest codes:', error);
    // 如果获取失败，返回本地存储的代码和预设代码
    return mergeWithLocalStorage(predefinedCodes);
  }
}
