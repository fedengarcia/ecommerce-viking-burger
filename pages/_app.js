import "../styles/styles.scss";
import {CartContext} from '../Context/CartContext';
import {StorageContext} from '../Context/StorageContext';
import Head from 'next/head';
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>VIKINGS BURGERS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta charSet="utf-8"/>
        <meta name="description" content="A ESCRIBIR"/>
	      <meta name="keywords" content="hamburguesa, burger, vikings, zarate, emprendimiento, comida, delivery, comida rapida"/>
        <meta name="theme-color" content="#403C3C"/>
        <link rel="icon" href="/logo.png" />
      </Head>

      <StorageContext>
        <CartContext>

        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-RPZN9TNL38`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RPZN9TNL38', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

          <Component {...pageProps} />
        </CartContext>
      </StorageContext>
    </>
  )
  }

export default MyApp
