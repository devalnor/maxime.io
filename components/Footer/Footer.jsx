import { Style, Container } from './Style';

const Footer = () => (
  <Style>
    <Container>© 2020–{new Date().getFullYear()} Macoal</Container>
  </Style>
);

export default Footer;
