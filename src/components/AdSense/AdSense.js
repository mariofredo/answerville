// AdSense.js
import Script from 'next/script';

const AdSense = () => (
  <>
    {/* <Script
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5389050614963293"
      strategy="afterInteractive"
      crossorigin="anonymous"
    /> */}
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-5389050614963293"
      data-ad-slot="5389050614963293" // Gantilah dengan slot ID AdSense Anda
      data-ad-format="auto"
    />
  </>
);

export default AdSense;
