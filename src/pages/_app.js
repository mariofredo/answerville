// _app.js atau _app.jsx

import React from 'react';
import Header from '@/components/Header';
import "../../public/fonts/stylesheet.css"
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
