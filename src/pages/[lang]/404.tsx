import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'error'])),
    },
  };
};

export default function Custom404() {
  const { t } = useTranslation('error');
  
  return (
    <div>
      <h1>{t('404.title')}</h1>
      <p>{t('404.description')}</p>
    </div>
  );
} 