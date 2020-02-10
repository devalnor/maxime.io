import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';

export const Style = styled.section`
  background: ${colors.darkBackground};
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  padding-top: 40px;
  padding-bottom: 40px;

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    padding-top: 60px;
  }
`;

export const Container = styled.div`
  width: 1200px;
  font-size:14px;
`;
