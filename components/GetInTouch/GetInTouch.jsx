import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Img from 'shared/components/Img';
import Obfuscate from 'react-obfuscate';
import {
  Style,
  Container,
  Profile,
  Content,
  Title,
  Photo,
  Button,
  Logos,
  LinkedIn,
  Github
} from './Styles';

const GetInTouch = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.2
  });

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView]);
  return (
    <Style>
      <Container>
        <Profile>
          <Photo />
        </Profile>
        <Content>
          <Title>Get In Touch!</Title>
          <p>I&apos;ll be happy to talk business with you!</p>
          <Button>
            <Obfuscate email="maxime@macoal.com">Send me an mail</Obfuscate>
          </Button>
          <Logos>
            <a
              href="https://github.com/devalnor"
              target="_blank"
              label="Github"
              rel="noopener noreferrer"
            >
              <Github />
            </a>
            <a
              href="https://be.linkedin.com/in/maximedevisscher"
              target="_blank"
              label="LinkedIn"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </a>
          </Logos>
        </Content>
      </Container>
    </Style>
  );
};

export default GetInTouch;
