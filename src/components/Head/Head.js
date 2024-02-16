// Import the Head component
import Head from 'next/head';

// Your page component
function MyPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no"/>
        <title>Answerville</title>
        <link rel="icon" href="../../app/favicon.ico" />
      </Head>
    </>
  );
}

export default MyPage;
