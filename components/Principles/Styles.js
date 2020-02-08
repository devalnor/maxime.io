import styled from 'styled-components';
import { sizes } from 'shared/utils/responsive';
import { colors } from 'shared/utils/theme';

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
  padding-right: 100px;
  margin-top: 60px;
  margin-bottom: 50px;

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    padding-left: 50px;
    padding-right: 50px;
  }
`;

export const Title = styled.div`
  font-family: 'Montreal Regular';
  font-size: 38px;
  color: ${colors.blueFlash};
  text-align: center;
  justify-content: center;
  margin-left: 50px;
  margin-bottom: 30px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    margin-left: 0px;
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

export const Icon = styled.div`
  width: 50px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  font-size: 35px;
  padding-right: 30px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 50px;
  }
`;

export const Text = styled.div`
  max-width: 800px;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  margin-bottom: 40px;
  h1 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    max-width: 700px;
  }


`;
