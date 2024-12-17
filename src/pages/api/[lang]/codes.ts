import { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query;
  
  // 实现缓存策略
  const cacheKey = `codes:${lang}`;
  const cachedData = await redis.get(cacheKey);
  
  if (cachedData) {
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json(JSON.parse(cachedData));
  }
  
  const codes = await getCodesByLanguage(lang as string);
  await redis.setex(cacheKey, 300, JSON.stringify(codes));
  
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).json(codes);
} 