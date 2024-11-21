export interface TapswapCode {
  id: string;
  code: string;
  title: string;
  createdAt: string;
  isActive: boolean;
  source: string;
}

export interface CodeStats {
  total: number;
  active: number;
  sources: {
    [key: string]: number;
  };
}
