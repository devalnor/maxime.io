// Fonts & Style
import 'typeface-montserrat';
import '../styles.css';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/jsx-props-no-spreading
const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired
};

export default MyApp;
