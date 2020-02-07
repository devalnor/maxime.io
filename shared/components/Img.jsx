/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';

const Img = ({
  definitions, src, ...restprops
}) => {
  const srcSet = definitions.map((def) => `${src.split('.').slice(0, -1).join('.')}@${def}.${src.split('.').pop()} ${def}`);
  return (
    <div>
      <img src={src} srcSet={srcSet} {...restprops} />
    </div>
  );
};


Img.propTypes = {
  definitions: PropTypes.arrayOf(PropTypes.string).isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};


export default Img;
