import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Trackimal</title>
        <link rel="icon" type="image/x-icon" href="/rab.svg"></link>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
