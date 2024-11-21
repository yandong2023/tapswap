import { TapswapCode } from '@/types';

const STORAGE_KEY = 'tapswap_codes';

export function saveToLocalStorage(codes: TapswapCode[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
}

export function getFromLocalStorage(): TapswapCode[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }
  return [];
}

export function mergeWithLocalStorage(newCodes: TapswapCode[]): TapswapCode[] {
  const storedCodes = getFromLocalStorage();
  
  // 合并新旧代码，使用ID去重
  const mergedCodes = [...storedCodes];
  newCodes.forEach(newCode => {
    const existingIndex = mergedCodes.findIndex(code => code.code === newCode.code);
    if (existingIndex === -1) {
      mergedCodes.push(newCode);
    } else {
      // 更新现有代码的状态
      mergedCodes[existingIndex] = {
        ...mergedCodes[existingIndex],
        ...newCode,
      };
    }
  });

  // 按时间排序
  const sortedCodes = mergedCodes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // 保存到本地存储
  saveToLocalStorage(sortedCodes);
  
  return sortedCodes;
}
