import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';
import { motion } from 'framer-motion';

export const Style = styled.section`
  background: linear-gradient(180deg, #ffffff 0%, #f4f7fc 100%);
  display: flex;
  justify-content: center;
`;

export const Container = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    align-items: center;
    flex-direction: column;
  }
`;

// Motion Framer Default Variants
Container.defaultProps = {
  initial: 'hidden',
  variants: {
    showed: {
      transition: { staggerChildren: 0.25, delayChildren: 0 }
    },
    hidden: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  }
};

export const Box = styled(motion.div)`
  width: ${(props) => props.width || '33%'};
  flex-direction: column;
  align-items: center;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 100%;
  }
`;

// Motion Framer Default Variants
Box.defaultProps = {
  transition: {
    duration: 0.5,
    type: 'tween',
    staggerChildren: 0,
    delayChildren: 1
  },
  variants: {
    showed: {
      opacity: 1,
      y: 0
    },
    hidden: { opacity: 0, y: '-40px' }
  }
};

export const BoxElem = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || 'center'};
  align-items: center;
  height: ${(props) => props.height || null};
`;

export const IconContainer = styled.div`
  display: flex;
  margin-top: 10px;
  min-height: 140px;
  align-items: flex-end;
  justify-content: center;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    align-items: center;
  }

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    margin-top: 0px;
    transform: scale(0.8);
  }
`;

export const Title = styled.div`
  font-family: 'Montreal Regular';
  font-size: 38px;
  color: ${colors.blueFlash};
  text-align: center;
  justify-content: center;
  margin-top: 30px;
`;

export const SkillList = styled(motion.ul)`
  list-style-type: none;
  margin-top: 40px;
  margin-bottom: 40px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const SkillItem = styled(motion.li)`
  font-family: 'Montreal Regular';
  font-size: 19px;
  font-weight: 200;
  color: ${colors.blueDark};
  letter-spacing: -0.022em;
  line-height: 42px;
`;

export const HorizLine = styled(motion.div)`
  height: ${(props) => props.size || '1px'};
  width: ${(props) => props.width || '100%'};
  background-color: ${colors.blueSky};
`;

// Motion Framer Default Variants
HorizLine.defaultProps = {
  initial: 'hidden',
  transition: { duration: 0.2 },
  variants: {
    showed: {
      opacity: 1,
      scale: 1
    },
    hidden: { opacity: 1, scale: 0 }
  }
};

export const VertLine = styled(motion.div)`
  width: ${(props) => props.size || '1px'};
  height: ${(props) => props.height || '100%'};
  background-color: ${colors.blueSky};
`;

// Motion Framer Default Variants
VertLine.defaultProps = {
  initial: 'hidden',
  transition: { duration: 1 },
  variants: {
    showed: {
      opacity: 1,
      scale: 1
    },
    hidden: { opacity: 1, scale: 0 }
  }
};
