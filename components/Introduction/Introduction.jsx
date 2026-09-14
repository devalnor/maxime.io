import {
  Style,
  Container,
  Photo,
  Title,
  FullName,
  AuthorBox,
  Quote,
  About
} from './Styles';

const Introduction = () => (
  <Style>
    <Photo />
    <Container>
      <AuthorBox>
        <FullName>Maxime de Visscher</FullName>
        <Title>
          <span>Technology Expert &amp; Digital Consultant</span>
        </Title>
      </AuthorBox>

      <Quote>
        Developing innovative solutions that connect customer experience with
        business goals <u>is my passion</u>.
      </Quote>
      <About>
        I’m an experienced digital consultant with a broad skill set and a deep
        understanding of how <b>business</b>, <b>design</b> and <b>technology</b>{' '}
        work together. Over the years, I’ve helped organizations craft solutions
        that create useful, memorable experiences across their digital ecosystems.
      </About>
    </Container>
  </Style>
);

export default Introduction;
