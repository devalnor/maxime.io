import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';

export const Container = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 50px;
  margin-right: 60px;
`;

export const Box = styled.div`
  width: ${(props) => props.width || '33%'};
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'left'};
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

export const Text = styled.div`
  position: relative;
  font-size: 20px;
  line-height: 40px;
  color: ${colors.darkBackground};
  font-weight: 500;
  padding-left: 50px;
  padding-right: 50px;

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    margin-bottom: 40px;
    line-height: 30px;
  }
`;

export const HorizLine = styled.div`
  display: flex;
  height: 1px;
  width: 90%;
  background-color: ${colors.blueSky};
  margin-top: 20px;
  /* mobile */
  @media (max-width: ${sizes.md}px) {
    width: 70%;
  }
`;

export const QuotationMark = styled.div`
  position: absolute;
  width: 94px;
  height: 110px;
  background-image: url('../static/img/white_quote.svg');
  background-repeat: no-repeat;
  background-blend-mode: screen;
  background-size: contain;
  margin-top: -30px;
`;

export const PeopleBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    flex-direction: column;
  }
`;

export const FullName = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    text-align: center;
  }
`;

export const Title = styled.div`
  font-size: 14px;
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    text-align: center;
  }
`;

export const Company = styled.div`
  font-weight: bold;
  font-size: 14px;
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    text-align: center;
  }
`;

export const ProfilePicture = styled.div`
  position: relative;
  margin-left: 30px;
  margin-right: 30px;

  /* ipad  */
  @media (max-width: ${sizes.ipad}px) and (min-width: ${sizes.md}px) {
    //margin-left: 0px;
  }

  /* mobile */
  @media (max-width: ${sizes.md}px) {
    padding-left: 20px;
    img {
      margin-left: 0px;
      margin-right: 0px;
    }
  }
`;
