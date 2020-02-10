import { useState, useCallback } from 'react';
import { animateScroll } from 'react-scroll';

import useEventListener from 'shared/hooks/useEventListener';
import {
  Style, Container, Menu, Button, LinkedIn
} from './Styles';

const Nav = () => {
  const [backgroundOpacity, setBackgroundOpacity] = useState();
  const [navStatus, setNavStatus] = useState('normal');

  const handleScroll = useCallback(() => {
    const { scrollY } = window;

    // Fixed Nav
    if (scrollY > 200) {
      setNavStatus('fixed');
      if (scrollY > 400) {
        setBackgroundOpacity(Math.min((window.scrollY - 400) * 0.002, 1));
      }
      // Hide Nav afer 50px scroll down
    } else if (scrollY > 50) {
      if (navStatus === 'normal') {
        setNavStatus('hidden');
        setBackgroundOpacity(0);
      }
      // Restore Nav to normal when scroll on top
    } else if (scrollY === 0) {
      setBackgroundOpacity(0);
      setNavStatus('normal');
    }
  });

  // Add event listener using our hook
  useEventListener('scroll', handleScroll);

  const navAnimations = {
    normal: { position: 'absolute', y: 0 },
    fixed: { position: 'fixed', y: 0 },
    hidden: { y: -100 }
  };

  const handleOnClick = () => {
    // window.scrollTo(0, document.body.scrollHeight);
    animateScroll.scrollToBottom();
  };

  return (
    <Style
      backgroundOpacity={backgroundOpacity}
      animate={navStatus}
      initial="normal"
      variants={navAnimations}
    >
      <Container>
        <Menu>
          <Button onClick={handleOnClick}>Get In Touch </Button>
          <a href="https://be.linkedin.com/in/maximedevisscher" rel="noopener noreferrer" target="_blank">
            <LinkedIn />
          </a>
        </Menu>
      </Container>
    </Style>
  );
};

export default Nav;
