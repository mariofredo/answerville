'use client';
import Head from 'next/head';
import {usePathname} from 'next/navigation';
import Script from 'next/script';
import {useEffect, useState} from 'react';

function MyPage() {
  const path = usePathname();
  const [headName, setHeadName] = useState('home');
  useEffect(() => {
    console.log(path, 'path');
    if (path == '/') {
      setHeadName('home');
    } else if (path) {
      let temp = path.split('/');
      let newPath = temp.splice(1, temp.length).join('-');
      setHeadName(newPath);
    }
  }, [path]);
  return (
    <Head>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0 user-scalable=no'
      />
      <meta name='google-adsense-account' content='ca-pub-5389050614963293' />
      <title>Answerville | {headName}</title>
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
