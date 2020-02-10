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
          I’m happy to talk business or simply give you some free advice. If
          both sides see value in working together, we’ll move forward. If not,
          that’s okay too. Worst case we both had a nice chat and received some
          free feedback.
        </p>
        <p>
          Send me an email at <Obfuscate email="maxime@macoal.com" />
        </p>
      </Content>
    </Container>
  </Style>
);

export default GetInTouch;
