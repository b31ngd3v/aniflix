import Head from "next/head";

export default function Header({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="index,follow" />
        <meta httpEquiv="content-language" content="en" />
        <meta
          name="description"
          content="Aniflix is a Free anime streaming website which you can watch English Subbed and Dubbed Anime online with No Account and Daily update. WATCH NOW!"
        />
        <meta
          name="keywords"
          content="anime to watch, watch anime,anime online, free anime online, online anime, anime streaming, stream anime online, english anime, english dubbed anime"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <meta name="apple-mobile-web-app-status-bar" content="#202125" />
        <meta name="theme-color" content="#202125" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
    </>
  );
}
