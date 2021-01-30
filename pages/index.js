import Background from "./../components/Canvas";
import Head from "next/head";
export default function Index() {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="description" content="Qui si scopre se carmine (il reale, non Carmine-Bot) ti vuole bene. Se sei qui, molto probabilmente sì." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `WebFont.load({google: {families: [Roboto:wght@900]}})`,
          }}
        />
        <meta name="theme-color" content="#fe7f6c" />
        <title>Carmine ti vuole bene? | carminemivuolebene.site</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,900&display=swap" rel="stylesheet"></link>
      </Head>
      <Background fps={15} msg="Molto" heartsNumber={50} />
    </>
  );
}
