import { NextApiRequest, NextApiResponse } from 'next';
import { getLatestCodes } from '@/utils/codeFetcher';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const codes = await getLatestCodes();
    res.status(200).json(codes);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
