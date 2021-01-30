import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="it">
        <Head>
          <meta charset="utf-8" />
          <title></title>
          <meta name="description" content="Qui si scopre se carmine (il reale, non Carmine-Bot) ti vuole bene. Se sei qui, molto probabilmente sì." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#fe7f6c" />
          <title>Carmine ti vuole bene? | carminemivuolebene.site</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
