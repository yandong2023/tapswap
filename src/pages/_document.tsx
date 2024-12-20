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
          
          {currentLocale === 'fa' && (
            <>
              <meta name="description" content="جدیدترین کدهای تخفیف را کشف و به اشتراک بگذارید. به‌روزرسانی در لحظه، استفاده رایگان." />
              <meta name="keywords" content="کد تخفیف,کد تخفیف فروشگاه,کوپن تخفیف,تخفیف خرید,صرفه‌جویی,TapSwap" />
              <meta property="og:title" content="TapSwap - پلتفرم اشتراک‌گذاری کد تخفیف" />
              <meta property="og:description" content="جدیدترین کدهای تخفیف را کشف و به اشتراک بگذارید. به‌روزرسانی در لحظه، استفاده رایگان." />
              <meta property="og:locale" content="fa_IR" />
            </>
          )}
          
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
