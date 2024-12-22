import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Tapswap',
  description = 'Your trusted platform for secure and efficient transactions',
  canonical,
}) => {
  const router = useRouter()
  const { locales, locale: currentLocale } = router

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Alternate language versions */}
      {locales?.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${canonical?.split('/').slice(0, -1).join('/')}/${locale}${router.pathname}`}
        />
      ))}
      
      {/* x-default hreflang */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${canonical?.split('/').slice(0, -1).join('/')}/en${router.pathname}`}
      />
      
      {/* No index for non-canonical URLs */}
      {!canonical && <meta name="robots" content="noindex,follow" />}
    </Head>
  )
}
