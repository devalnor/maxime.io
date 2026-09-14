/* eslint-disable no-restricted-globals */
import Document, {
  Html, Head, Main, NextScript
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { mediaStyles } from 'shared/utils/responsive';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () => originalRenderPage({
        // eslint-disable-next-line react/jsx-props-no-spreading
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
      });
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Maxime de Visscher connects business, design and technology to create useful, memorable digital experiences."
          />
          <link rel="canonical" href="https://maxime.io/" />
          <meta
            property="og:title"
            content="Maxime de Visscher - Technology Expert &amp; Digital Consultant"
          />
          <meta
            property="og:description"
            content="Connecting business, design and technology to create useful, memorable digital experiences."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://maxime.io" />
          <meta
            property="og:image"
            content="https://maxime.io/static/img/opengraph-1200x630.jpg"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <style
            type="text/css"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />

          <script
            async
            defer
            data-website-id="99b8581d-9792-4bcc-86a8-000c9ddfe628"
            src="https://umami.macoal.com/umami.js"
          />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
