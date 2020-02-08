import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes, } from 'shared/utils/responsive';

export const Style = styled.section`
  background: ${colors.blueLightBackground};
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 100px;
  padding-bottom: 80px;
  margin-top: 80px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    align-items: center;
    flex-direction: column;
    padding-left: 0px;
    padding-bottom: 20px;
  margin-top: 20px;
  }

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    padding-left: 40px;
  }
`;


export const Row = styled.div`
  width: 100%;
  display: flex;
 
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    flex-direction: column;
  }
`;
