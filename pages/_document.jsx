import Document, {
  Html, Head, Main, NextScript
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { mediaStyles } from 'shared/utils/responsive';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    let serverInfo = { host: '', protocol: '' };
    if (ctx.req || false) {
      serverInfo = {
        protocol: ctx.req.connection.encrypted || false ? 'https' : 'http',
        host: ctx.req.headers.host
      };
      // Force https in production env.
      // Because on now.sh ctx.req.connection.encrypted is not present event in https
      if ((process.env || false) && process.env.NODE_ENV === 'production') {
        serverInfo.protocol = 'https';
      }
      serverInfo.rootUrl = `${serverInfo.protocol}://${serverInfo.host}`;
    }

    try {
      ctx.renderPage = () => originalRenderPage({
        // eslint-disable-next-line react/jsx-props-no-spreading
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
      });
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        serverInfo,
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
    const { serverInfo } = this.props;
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
          <meta
            property="og:image"
            content={`${serverInfo.rootUrl}/static/img/me.jpg`}
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
