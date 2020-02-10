import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';

export const Style = styled.section`
  background-color: ${colors.darkBackground};
  color: white;
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  padding-left: 200px;
  padding-right: 200px;

  /* Desktop */
  @media (min-width: ${sizes.md + 1}px) {
    background-image: url('../static/img/me.jpg');
    background-position-x: -430px;
    background-repeat: no-repeat;
    background-size: contain;
  }

  /* Tablet */
  @media (max-width: ${sizes.lg}px) {
    padding-right: 60px;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    padding-left: 40px;
    padding-right: 40px;
    height: auto;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 100px;
  /* Tablet */
  @media (max-width: ${sizes.lg}px) {
    padding-left: 0px;
  }
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    align-items: center;
  }
`;

export const Quote = styled.div`
  font-family: 'Montreal Regular';
  max-width: 740px;
  font-size: 45px;
  letter-spacing: -0.031em;
  margin-top: 30px;
  margin-bottom: 50px;
  u {
    font-family: inherit;
  }

  /* Tablet */
  @media (max-width: ${sizes.lg}px) {
    font-size: 39px;
  }

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    font-size: 39px;
  }

  /* Mobile */
  @media (max-width: ${sizes.md}px) {
    font-size: 27px;
    text-align: center;
  }
`;

export const About = styled.div`
  letter-spacing: -0.022em;
  max-width: 778px;
  font-size: 21px;
  font-weight: 200;
  line-height: 40px;

  b {
    font-weight: 500;
  }
  padding-bottom: 40px;
  /* Mobile */
  @media (max-width: ${sizes.md}px) {
    font-size: 15px;
    line-height: 27px;
  }
`;

export const AuthorBox = styled.div`
  max-width: 1200px;
  width: 50%;
  display: flex;
  flex-direction: row;

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 200px;
    flex-direction: column;
  }
`;

export const FullName = styled.div`
  background-color: ${colors.blueFlash};
  padding: 10px;
  color: white;
  white-space: nowrap;
  text-align: center;

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    padding: 5px;
    font-weight: 500;
  }
`;

export const Title = styled.div`
  display: flex;
  text-align: center;
  color: white;
  padding: 10px;
  @media (min-width: ${sizes.md}px) {
    white-space: nowrap;
  }
`;

export const Photo = styled.div`
  background-color: ${colors.darkBackground};
  background-image: url('../static/img/me.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: block;
  width: 100%;
  height: 100%;
  min-height: 350px;
  min-width: 350px;
`;
