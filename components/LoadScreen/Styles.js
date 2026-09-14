/* eslint-disable import/prefer-default-export */
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  0%, 20% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: black;
  pointer-events: none;
  animation: ${fadeOut} 900ms ease-out forwards;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;
