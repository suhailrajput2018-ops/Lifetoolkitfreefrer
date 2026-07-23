import Script from 'next/script';

export function AdSenseScript() {
  return (
    <>
      <Script
        id="adsense-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-5554704158829427",
              enable_page_level_ads: true
            });
          `,
        }}
      />
      <Script
        id="adsense-script"
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5554704158829427"
        crossOrigin="anonymous"
      />
    </>
  );
}
