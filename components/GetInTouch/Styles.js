import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';

export const Style = styled.section`
  background: ${colors.darkBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  min-height: 400px;
`;

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-content: center;
  padding-top: 60px;
  padding-bottom: 10px;
  padding-left: 100px;
  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 40px;
    flex-direction: column;
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

export const Profile = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 100%;
  }
`;

export const Content = styled.div`
  width: 67%;
  letter-spacing: -0.022em;
  max-width: 778px;
  font-size: 21px;
  font-weight: 200;
  line-height: 40px;
  padding-right: 60px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 100%;
    font-size: 16px;
    line-height: 30px;
    padding-right: 0px;
  }

  p {
    padding-bottom: 30px;
  }
  a {
    color: white;
    font-weight: 400;
  }
`;

export const Title = styled.div`
  font-family: 'Montreal Regular';
  font-size: 38px;
  color: white;
  justify-content: center;
  margin-bottom: 30px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    margin-top: 40px;
    margin-left: 0px;
    font-size: 20px;
    margin-bottom: 10px;
    text-align: center;
  }
`;

export const Photo = styled.div`
  background-color: ${colors.darkBackground};
  background-image: url('../static/img/me.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: block;
  width: 250px;
  height: 250px;
  max-height: 250px;
  max-width: 250px;
  margin: 20px;

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 250px;
    height: 250px;
  }
`;
