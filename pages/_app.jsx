/* eslint-disable react/jsx-props-no-spreading */
import App from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import LoadScreen from 'components/LoadScreen';

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
          </title>
        </Head>
        <LoadScreen />
        <Component {...pageProps} />
      </>
    );
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired
};

export default MyApp;
