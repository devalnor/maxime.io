/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';

const Img = ({
  definitions, src, alt, title, ...restprops
}) => {
  const srcSet = definitions.map(
    (def) => `${src
      .split('.')
      .slice(0, -1)
      .join('.')}@${def}.${src.split('.').pop()} ${def}`
  );
  return (
    <img src={src} srcSet={srcSet} {...restprops} alt={alt} title={title} />
  );
};

Img.propTypes = {
  definitions: PropTypes.arrayOf(PropTypes.string),
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string
};

Img.defaultProps = {
  definitions: ['2x'],
  title: ''
};

export default Img;
