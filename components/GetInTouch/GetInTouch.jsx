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

const GetInTouch = () => (
  <Style>
    <Container>
      <Profile>
        <Photo />
      </Profile>
      <Content>
        <Title>Get In Touch!</Title>
        <p>I&apos;ll be happy to talk business with you!</p>
        <Button>
          <Obfuscate email="maxime@macoal.com">Send me an email</Obfuscate>
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

export default GetInTouch;
