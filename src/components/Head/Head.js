'use client';
import {useTitle} from '@/context';
import Head from 'next/head';
import Script from 'next/script';

// Your page component
function MyPage() {
  const {currentTitle} = useTitle();
  return (
    <Head>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0 user-scalable=no'
      />
      <meta name='google-adsense-account' content='ca-pub-5389050614963293' />
      <title>Answerville {currentTitle ? `| ${currentTitle}` : '| Home'}</title>
      <link rel='icon' href='../../app/favicon.ico' />
      <Script
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5389050614963293'
        strategy='afterInteractive'
        crossorigin='anonymous'
      />
    </Head>
  );
}

export default MyPage;
