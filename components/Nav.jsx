import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { colors } from '../lib/theme';
import useEventListener from '../hooks/useEventListener';
import LinkedInLogo from '../public/static/img/linkedIn.svg';

const Style = styled.nav`
  position: ${({ fixed }) => (fixed ? 'fixed' : 'absolute')};
  width: 100%;
  xheight: 50px;
  display: flex;
  justify-content: center;
  margin-top: ${({ fixed }) => (fixed ? '0px' : '16px')};
  background-color: rgba(0, 1, 21, ${(props) => props.backgroundOpacity || 0});
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const FullName = styled.div`
  background-color: ${colors.blueFlash};
  padding: 16px;
  color: white;
  white-space: nowrap;
`;

const Title = styled.div`
  display: flex;
  white-space: nowrap;
  text-align: center;
  color: white;
  padding: 16px;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: white;
`;


const Button = styled.div`
  background-color: ${colors.blueFlash};
  display: flex;
  white-space: nowrap;
  text-align: center;
  align-items: center;
  color: white;
  padding: 16px;
  font-weight:600;
`;


const LinkedIn = styled(LinkedInLogo)`
margin-left:16px;
width:37px;
`;


const Nav = () => {
  const [backgroundOpacity, setBackgroundOpacity] = useState();
  const [fixed, setFixed] = useState(false);

  const handleScroll = useCallback(() => {
    const { scrollY } = window;
    setBackgroundOpacity(Math.min(window.scrollY * 0.001, 1));
    if (scrollY > 16) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  });

  // Add event listener using our hook
  useEventListener('scroll', handleScroll);


  return (
    <Style backgroundOpacity={backgroundOpacity} fixed={fixed}>
      <Container>
        <FullName>Maxime de Visscher</FullName>
        <Title>
          <span>Technology Expert &amp; Digital Consultant</span>
        </Title>
        <Menu>
          <Button>Get In Touch  </Button>
          <LinkedIn width={37} />
        </Menu>
      </Container>
    </Style>
  );
};

export default Nav;
