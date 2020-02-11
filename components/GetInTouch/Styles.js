import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';
import { motion } from 'framer-motion';
import GithubLogo from 'public/static/img/logos/github.svg';
import LinkedInLogo from 'public/static/img/logos/linkedIn.svg';

export const Style = styled.section`
  background: ${colors.darkBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.blueSky};
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
  padding-right: 100px;
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
  width: 25%;
  min-width: 25%;
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
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  letter-spacing: -0.022em;
  font-size: 21px;
  font-weight: 200;
  line-height: 40px;
  padding-left: 20px;
  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    padding-left: 10px;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 100%;
    font-size: 16px;
    line-height: 30px;
    padding-right: 0px;
    text-align: center;
    padding-left: 0px;
  }

  p {
    padding-bottom: 30px;
  }
`;

export const Button = styled(motion.div)`
  transform-origin: center;
  position: relative;
  background-color: ${colors.blueFlash};
  text-align: center;
  width: 50%;

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    width: 66%;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 100%;
  }

  a {
    display: block;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    color: white;
    font-weight: 400;
    text-decoration: none;
    color: white;
    /* mobile */
    @media (max-width: ${sizes.md}px) {
      width: 100%;
      text-align: center;
      font-weight: 500;
      padding-top: 15px;
      padding-bottom: 15px;
      font-size: 18px;
    }
  }
`;

Button.defaultProps = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.95 }
};

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

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 250px;
    height: 250px;
  }
`;

export const LinkedIn = styled(LinkedInLogo)`
  cursor: pointer;
  margin-left: 16px;
  width: 60px;
  margin-top: 4px;
  padding-right: 16px;
`;

export const Github = styled(GithubLogo)`
  cursor: pointer;
  margin-left: 16px;
  width: 60px;
  margin-top: 4px;
  padding-right: 16px;
`;

export const Logos = styled.div`
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    width: 66%;
  }
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 100%;
  }
`;
