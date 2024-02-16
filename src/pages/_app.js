// _app.js atau _app.jsx

import React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from '@/components/Head/Head.js'
import Header from '@/components/Header';
import "../../public/fonts/stylesheet.css"
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
