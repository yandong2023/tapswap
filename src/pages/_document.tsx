import Document, { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

class MyDocument extends Document<DocumentProps> {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale || 'en';
    const dir = currentLocale === 'fa' ? 'rtl' : 'ltr';

    return (
      <Html lang={currentLocale} dir={dir}>
        <Head>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <meta name="theme-color" content="#3182CE" />
          <meta name="google-site-verification" content="collFDWKf0XUI7TpAqf2fr7Ai_fz587la0_84Uzp7Gk" />
          
          {/* Add canonical URL */}
          <link 
            rel="canonical" 
            href={`https://tapswapcode.net${currentLocale === 'en' ? '' : `/${currentLocale}`}`} 
          />
          
          {/* 添加多语言支持的元标签 */}
          <link rel="alternate" href="https://tapswapcode.net" hrefLang="x-default" />
          <link rel="alternate" href="https://tapswapcode.net/en" hrefLang="en" />
          <link rel="alternate" href="https://tapswapcode.net/zh" hrefLang="zh" />
          <link rel="alternate" href="https://tapswapcode.net/ko" hrefLang="ko" />
          <link rel="alternate" href="https://tapswapcode.net/fa" hrefLang="fa" />
          <link rel="alternate" href="https://tapswapcode.net/ru" hrefLang="ru" />
          
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-EM390M5M95" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-EM390M5M95');
              `
            }}
          />
          
          {/* 添加结构化数据 */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "TapSwap优惠码分享平台",
                  "description": "智能优惠码管理系统，实时更新全网优惠券，支持淘宝天猫优惠券、京东优惠码等多平台优惠",
                  "url": "https://tapswapcode.net",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://tapswapcode.net/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              `
            }}
          />
          
          {/* 添加语言标记 */}
          <link rel="alternate" hreflang="fa" href="https://tapswapcode.net/fa" />
          <link rel="alternate" hreflang="en" href="https://tapswapcode.net/en" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
