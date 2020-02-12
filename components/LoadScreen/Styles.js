/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  color: white;
  background-color: black;
`;

// Motion Framer Default Variants
Container.defaultProps = {
  transition: { duration: 2.5 },
  innitial: 'show',
  variants: {
    showed: {
      opacity: 1,
      display: 'block',
    },
    hidden: {
      opacity: 0,
      display: 'none',
      transitionEnd: {
        display: 'none'
      }
    }
  }
};
