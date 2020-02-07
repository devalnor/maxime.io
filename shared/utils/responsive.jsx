/* eslint-disable react/jsx-props-no-spreading */
// these sizes are arbitrary and you can set them to whatever you wish
import React from 'react';
import { css } from 'styled-components';
import { createMedia } from '@artsy/fresnel';

export const sizes = {
  sm: 0,
  md: 768,
  lg: 1024,
  xl: 1192,
  ipad: 900
};

const AppMedia = createMedia({ breakpoints: sizes });

// Generate CSS to be injected into the head
export const mediaStyles = AppMedia.createMediaStyle();

// Retro compatibility
export const Desktop = (props) => (
  <Media {...props} at="sm" />
);
export const Tablet = (props) => (
  <Media {...props} at="md" />
);

export const Mobile = (props) => (
  <Media {...props} greaterThan="md" />
);

export const { Media, MediaContextProvider } = AppMedia;

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
