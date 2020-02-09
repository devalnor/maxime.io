import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';

export const Style = styled.section`
  background: ${colors.blueFlash};
  display: flex;
  justify-content: center;
  color: white;
  height: auto;
`;

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 10px;
  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 40px;
  }
`;

export const Title = styled.div`
  font-family: 'Montreal Regular';
  font-size: 38px;
  color: white;
  text-align: center;
  justify-content: center;
  margin-left: 50px;
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
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    justify-content: center;
    align-items: center;

    flex-direction: row;
    flex-wrap: nowrap;
    max-height: none;
  }
`;

export const Sector = styled.div`
  width: 16.6667%;
  padding: 10px;
  font-size: 15px;
  font-weight: 200;
  b {
    font-weight: 500;
    line-height: 3;
  }
  ul {
    list-style-type: none;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    text-align: center;
    width: 100%;
  }
`;
