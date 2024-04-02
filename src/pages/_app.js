// _app.js atau _app.jsx

import React from 'react';
import {GoogleTagManager} from '@next/third-parties/google';
import Head from '@/components/Head/Head.js';
import Header from '@/components/Header';
import '../../public/fonts/stylesheet.css';
import '../styles/main.css';

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head />
      <Header />
      <Component {...pageProps} />
      <GoogleTagManager gtmId='G-JNZC27WEH5' />
    </>
  );
}

export default MyApp;
