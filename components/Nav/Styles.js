import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';

import LinkedInLogo from 'public/static/img/logos/linkedIn.svg';

export const Style = styled(motion.div).attrs((props) => ({
  style: {
    backgroundColor: `rgba(0, 1, 33, ${props.backgroundOpacity || 0})`
  }
}))`
  position:absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index:999;
  top: 0;

`;

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: white;
`;

export const Button = styled.div`
  height:100%;
  cursor: pointer;
  background-color: ${colors.blueFlash};
  display: flex;
  white-space: nowrap;
  text-align: center;
  align-items: center;
  color: white;
  padding: 16px;
  font-weight:600;

  /* Mobile */
  @media (max-width: ${sizes.md}px) {
    padding: 10px;
  }
`;

export const LinkedIn = styled(LinkedInLogo)`
 cursor: pointer;
margin-left:16px;
width:50px;
margin-top:4px;
padding-right:16px;
`;
