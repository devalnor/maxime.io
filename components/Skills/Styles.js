import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';
import { motion } from 'framer-motion';

export const Style = styled.section`
  background: linear-gradient(180deg, #ffffff 0%, #f4f7fc 100%);
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
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

export const Box = styled.div`
  width: ${(props) => props.width || '33%'};
  flex-direction: column;
  align-items: center;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 100%;
  }
`;

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

export const HorizLine = styled.div`
  height: ${(props) => props.size || '1px'};
  width: ${(props) => props.width || '100%'};
  background-color: ${colors.blueSky};
`;

export const VertLine = styled.div`
  width: ${(props) => props.size || '1px'};
  height: ${(props) => props.height || '100%'};
  background-color: ${colors.blueSky};
`;
