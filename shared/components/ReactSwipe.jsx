// Adapted from https://raw.githubusercontent.com/voronianski/react-swipe/gh-pages/src/index.js

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Swipe from 'swipe-js-iso';
import isEqual from 'lodash.isequal';

class ReactSwipe extends Component {
  componentDidMount() {
    const { swipeOptions } = this.props;
    if (this.isSupportedEnvironment()) {
      this.containerEl = React.createRef();
      this.swipe = Swipe(this.containerEl.current, swipeOptions);
    }
  }

  componentDidUpdate(prevProps) {
    const { childCount, swipeOptions, enabled } = this.props;
    const shouldUpdateSwipeInstance = prevProps.childCount !== childCount
      || !isEqual(prevProps.swipeOptions, swipeOptions)
      || prevProps.enabled !== enabled;

    if (shouldUpdateSwipeInstance) {
      if (typeof this.swipe !== 'undefined') {
        this.swipe.kill();
      }

      this.swipe = Swipe(this.containerEl.current, swipeOptions);
    }
  }

  componentWillUnmount() {
    // this.swipe.kill();
    if (this.isSupportedEnvironment() && typeof this.swipe !== 'undefined') {
      this.swipe.kill();
    }
    this.swipe = undefined;
  }

  getPos() {
    return this.swipe.getPos();
  }

  getNumSlides() {
    return this.swipe.getNumSlides();
  }

  // Because static function is not working:
  // eslint-disable-next-line class-methods-use-this
  isSupportedEnvironment() {
    return (
      typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined'
    );
  }

  slide(...args) {
    this.swipe.slide(...args);
  }

  next() {
    this.swipe.next();
  }

  prev() {
    this.swipe.prev();
  }

  render() {
    const {
      id, className, style, children, enabled
    } = this.props;

    if (enabled) {
      return (
        <div
          id={id}
          ref={this.containerEl}
          className={`react-swipe-container ${className}`}
          style={style.container}
        >
          <div style={style.wrapper}>
            {React.Children.map(children, (child) => {
              if (!child) {
                return null;
              }

              const childStyle = child.props.style
                ? { ...style.child, ...child.props.style }
                : style.child;

              return React.cloneElement(child, { style: childStyle });
            })}
          </div>
        </div>
      );
    }
    return <>{children}</>;
  }
}

ReactSwipe.propTypes = {
  swipeOptions: PropTypes.shape({
    startSlide: PropTypes.number,
    speed: PropTypes.number,
    auto: PropTypes.number,
    continuous: PropTypes.bool,
    disableScroll: PropTypes.bool,
    stopPropagation: PropTypes.bool,
    swiping: PropTypes.func,
    callback: PropTypes.func,
    transitionEnd: PropTypes.func
  }),
  style: PropTypes.shape({
    container: PropTypes.object,
    wrapper: PropTypes.object,
    child: PropTypes.object
  }),
  id: PropTypes.string,
  className: PropTypes.string,
  childCount: PropTypes.number,
  enabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

ReactSwipe.defaultProps = {
  swipeOptions: {},
  style: {
    container: {
      overflow: 'hidden',
      visibility: 'hidden',
      position: 'relative'
    },
    wrapper: {
      overflow: 'hidden',
      position: 'relative'
    },
    child: {
      float: 'left',
      width: '100%',
      position: 'relative',
      transitionProperty: 'transform'
    }
  },
  id: undefined,
  className: '',
  childCount: 0,
  enabled: true
};

export default ReactSwipe;
