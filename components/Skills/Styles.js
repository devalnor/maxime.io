import styled from 'styled-components';
import { colors } from 'shared/utils/theme';
import { sizes } from 'shared/utils/responsive';

export const Style = styled.section`
background: linear-gradient(180deg, #ffffff 0%, #f4f7fc 100%);
display: flex;
justify-content: center;
`;

export const Container = styled.div`
background-color: red;
max-width: 1200px;
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
/* mobile */
@media (max-width: ${sizes.md}px) {
  align-items: center;
}
`;

export const Box = styled.div`
width: 33%;
`;


export const Title = styled.div`
font-family: 'Montreal Regular';
font-size: 39px;
color: ${colors.blueFlash};

`;
