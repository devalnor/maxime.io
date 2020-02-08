import React from 'react';
import PropTypes from 'prop-types';

const Emoji = ({ children, label }) => (
  <span role="img" aria-label={label}>
    {children}
  </span>
);

Emoji.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

export default Emoji;
