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
        Developing innovative solutions that bring Customer Experience to your
        business goals <u>is a passion</u>.
      </Quote>
      <About>
        I’m an experienced digital consultant with a broad skill set and deep
        understanding of the interplay between <b>business</b>, <b>design</b>{' '}
        and <b>technology</b>. Over the last decade, I helped customers crafting
        solution that meet the holy grail of memorable user experiences in their
        digital ecosystem.
      </About>
    </Container>
  </Style>
);

export default Introduction;
