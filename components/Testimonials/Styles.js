import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';
import { motion } from 'framer-motion';

export const Style = styled.section`
  background: ${colors.blueLightBackground};
  display: flex;
  justify-content: center;
`;

export const Container = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  margin-top: 50px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    align-items: center;
    flex-direction: column;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 20px;
    margin-top: 20px;
  }

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    //padding-left: 20px;
    padding-right: 20px;
  }
`;

// Motion Framer Default Variants
Container.defaultProps = {
  initial: 'hidden',
  variants: {
    showed: {
      transition: { staggerChildren: 0.25, delayChildren: 0 },
    },
    hidden: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  },
};

export const Row = styled(motion.div)`
  width: 100%;
  display: flex;

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    flex-direction: column;
  }
`;

// Motion Framer Default Variants
Row.defaultProps = {
  initial: 'hidden',
  transition: { duration: 1 },
  variants: {
    showed: {
      opacity: 1,
      x: '0%',
    },
    hidden: { opacity: 0, x: '-5%' },
  },
};
