import "../styles/globals.css";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
