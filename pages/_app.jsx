/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { withRouter } from 'next/router';
// Fonts & Style
import 'typeface-montserrat';
import '../styles.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>
            Maxime de Visscher | Technology Expert &amp; Digital Consultant
            Digital Consultant
          </title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default withRouter(MyApp);
