/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { withRouter } from 'next/router';
// Fonts & Style
import 'typeface-montserrat';
import '../styles.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    let serverInfo = { host: '', protocol: '' };
    if (ctx.req || false) {
      serverInfo = {
        protocol: ctx.req.connection.encrypted || false ? 'https' : 'http',
        host: ctx.req.headers.host
      };
      serverInfo.rootUrl = `${serverInfo.protocol}://${serverInfo.host}`;
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, serverInfo };
  }

  render() {
    const { Component, pageProps, serverInfo } = this.props;

    return (
      <>
        <Head>
          <title>
            Maxime de Visscher |{serverInfo.rootUrl} Technology Expert &amp;
            Digital Consultant
          </title>
          <meta property="og:image" content={`${serverInfo.rootUrl}/static/img/me.jpg`} />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default withRouter(MyApp);
