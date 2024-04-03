// _app.js atau _app.jsx
import React from 'react';
import Head from '@/components/Head/Head.js';
import Header from '@/components/Header';
import {TitleContextProvider} from '@/context';
import '../../public/fonts/stylesheet.css';
import '../styles/main.css';

function MyApp({Component, pageProps}) {
  return (
    <TitleContextProvider>
      <Head />
      <Header />
      <Component {...pageProps} />
      <script
        async
        src={`https://www.googletagmanager.com/gtm.js?id=G-JNZC27WEH5`}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=G-JNZC27WEH5`}
          height='0'
          width='0'
          style={{display: 'none', visibility: 'hidden'}}
        />
      </noscript>
    </TitleContextProvider>
  );
}

export default MyApp;
