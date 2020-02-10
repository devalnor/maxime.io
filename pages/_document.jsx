import Document, {
  Html, Head, Main, NextScript
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { mediaStyles } from 'shared/utils/responsive';

class MyDocument extends Document {
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
      <Html>
        <Head>
          <meta
            name="description"
            content="I’m an experienced digital consultant with a broad skill set and deep understanding of the interplay between business, design and technology. Over the last decade, I helped customers crafting solution that meet the holy grail of memorable user experiences in their digital ecosystem."
          />
          <meta
            property="og:title"
            content="Maxime de Visscher - Technology Expert &amp; Digital Consultant"
          />
          <meta
            property="og:description"
            content="Developing innovative solutions that bring Customer Experience to your business goals is a passion."
          />
          <style
            type="text/css"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
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

export default MyDocument;
