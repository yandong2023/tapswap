export interface TapswapCode {
  id: string;
  code: string;
  title: string;
  description?: string;
  source?: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
}
