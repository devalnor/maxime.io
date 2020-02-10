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
  padding-bottom: 30px;
  padding-left: 90px;
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
  }
`;

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
  max-height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;

  /* ipad  */
    @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
      max-height: 600px;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    max-height: none;
  }
`;

export const Sector = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  padding: 10px;
  font-size: 15px;
  font-weight: 200;

  b {
    font-weight: 500;
  }
  ul {
    list-style-type: none;
    margin-top:10px;
    margin-bottom:5px;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    text-align: center;
    justify-content: center;
    width: 100%;
    min-height: 200px;
  }
`;
