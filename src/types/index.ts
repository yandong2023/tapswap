export interface TapswapCode {
  id: string;
  code: string;
  title: string;
  description?: string;
  createdAt: string;
  isActive: boolean;
  source: string;
  validUntil?: string;
}

export interface CodeStats {
  total: number;
  active: number;
  sources: {
    [key: string]: number;
  };
}
