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
  <Style id="contact">
    <Container>
      <Profile>
        <Photo />
      </Profile>
      <Content>
        <Title>Get in touch</Title>
        <p>Let&apos;s talk about what you&apos;re building.</p>
        <Button>
          <Obfuscate
            aria-label="Send Maxime de Visscher an email"
            email="maxime@macoal.com"
          >
            Send me an email
          </Obfuscate>
        </Button>
        <Logos>
          <a
            href="https://github.com/devalnor"
            target="_blank"
            aria-label="View Maxime de Visscher on GitHub"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
          <a
            href="https://be.linkedin.com/in/maximedevisscher"
            target="_blank"
            aria-label="View Maxime de Visscher on LinkedIn"
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
