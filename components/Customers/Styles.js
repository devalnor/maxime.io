import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';
import { motion } from 'framer-motion';

export const Style = styled.section`
  background: ${colors.blueFlash};
  display: flex;
  justify-content: center;
  color: white;
  height: auto;
`;

export const Container = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 90px;
  padding-right: 90px;

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 20px;
    padding-bottom: 0px;
  }
`;

// Motion Framer Default Variants
Container.defaultProps = {
  initial: 'hidden',
  variants: {
    showed: {
      transition: { staggerChildren: 0.1, delayChildren: 0 }
    },
    hidden: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  }
};

export const Title = styled.div`
  font-family: 'Montreal Regular';
  font-size: 38px;
  color: white;
  text-align: center;
  justify-content: center;
  margin-bottom: 30px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    margin-left: 0px;
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

export const Row = styled.div`
  width: 100%;

  /* Desktop */
  @media (min-width: ${sizes.md + 1}px) {
    max-height: 620px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    max-height: 600px;
  }
`;

export const SectorContainer = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  max-width: 20%;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    min-height: 200px;
  }
`;

export const Sector = styled(motion.div)`
  font-size: 15px;
  font-weight: 200;
  padding: 10px;
  line-height: 1.1;

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    max-width: 50%;
    padding: 0px;
    margin: 0px;
  }

  h3 {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  ul {
    list-style-type: none;
    margin-top: 10px;
    margin-bottom: 10px;
    li {
      margin-top: 7px;
    }
  }
`;

// Motion Framer Default Variants
Sector.defaultProps = {
  transition: { duration: 0.5 },
  variants: {
    showed: {
      opacity: 1,
      x: '0%'
    },
    hidden: { opacity: 0, x: '-10%' }
  }
};
