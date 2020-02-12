import { FontObserver } from 'shared/utils/FontObserver';
import PropTypes from 'prop-types';
import { Container } from './Styles';

const ScreenWrapper = ({ fontLoaded }) => (
  <Container animate={fontLoaded ? 'hidden' : 'show'} />
);

ScreenWrapper.propTypes = {
  fontLoaded: PropTypes.bool.isRequired
};

const LoadScreen = () => (
  <FontObserver fontFamily={['Montreal Regular', 'Montserrat']}>
    <ScreenWrapper fontLoaded={false} />
  </FontObserver>
);

export default LoadScreen;
