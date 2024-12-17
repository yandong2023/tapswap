import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function useLanguageRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    const userLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'fa', 'zh', 'ko', 'ru'];
    
    if (!router.pathname.includes('/[lang]') && supportedLangs.includes(userLang)) {
      router.push(`/${userLang}${router.pathname}`);
    }
  }, [router.pathname]);
} 