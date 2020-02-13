import styled from 'styled-components';
import { sizes } from 'shared/utils/responsive';

export const Style = styled.section`
  background: white;
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
  padding-top: 80px;
  padding-bottom: 80px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    align-items: center;
    flex-direction: column;
    padding-left: 0px;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    padding-left: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

export const Box = styled.div`
  width: ${(props) => props.width || '33%'};
  flex-direction: row;
  align-items: center;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 100%;
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

export const SmallTitle = styled.div`
  font-size: 14px;
  margin-top: 10px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    text-align: center;
    margin-top: 10px;
  }
`;

export const LogoList = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 0px;
  flex-wrap: wrap;

  img {
    margin-right: 15px;
    margin-top: 15px;
    height: 50px;
  }

  /* ipad */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    padding-right: 100px;
    margin-bottom: 10px;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    justify-content: center;
    align-items: center;

    margin-bottom: 0px;
    margin-top: 0px;

    img {
      margin-right: 15px;
      height: 30px;
    }
  }
`;
