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
            content="An experienced digital consultant with a broad skill set and deep understanding of the interplay between business, design and technology."
          />
          <meta
            property="og:title"
            content="Maxime de Visscher - Technology Expert &amp; Digital Consultant"
          />
          <meta
            property="og:description"
            content="Developing innovative solutions that bring Customer Experience to your business goals is a passion."
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
            src="https://ackee-analytics-tool.herokuapp.com/tracker.js"
            data-ackee-server="https://ackee-analytics-tool.herokuapp.com"
            data-ackee-domain-id="e6d174ce-2252-470d-b942-7dea8e98c1aa"
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
