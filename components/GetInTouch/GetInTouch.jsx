import Img from 'shared/components/Img';
import Obfuscate from 'react-obfuscate';
import {
  Style, Container, Profile, Content, Title, Photo
} from './Styles';

const GetInTouch = () => (
  <Style>
    <Container>
      <Profile>
        <Photo />
        <Img
          src="/static/img/labels.png"
          alt="Labels"
          title="Serious Joke!"
          width="150px"
        />
      </Profile>
      <Content>
        <Title>Get In Touch!</Title>
        <p>
          I&apos;ll be happy to talk business with you!
        </p>
        <Obfuscate email="maxime@macoal.com">Send me an mail</Obfuscate>

      </Content>
    </Container>
  </Style>
);

export default GetInTouch;
