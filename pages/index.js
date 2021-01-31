import Background from "./../components/Canvas";
import Head from "next/head";
export default function Index() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Qui si scopre se carmine (il reale, non Carmine-Bot) ti vuole bene. Se sei qui, molto probabilmente sì." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fe7f6c" />
        <title>Carmine ti vuole bene? | carminemivuolebene.site</title>
      </Head>
      <div style={{ fontFamily: "Roboto" }}></div>
      <Background fps={10} msg="Molto" heartsNumber={200} />
    </>
  );
}
