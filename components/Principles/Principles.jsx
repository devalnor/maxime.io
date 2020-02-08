/* eslint-disable jsx-a11y/accessible-emoji */
import Emoji from 'shared/components/Emoji';
import {
  Style, Container, Title, Row, Icon, Text
} from './Styles';

const Principles = () => (
  <Style>
    <Container>
      <Row>
        <Title>Principles</Title>
      </Row>
      <Row>
        <Icon>
          <Emoji label="Rocket">🚀</Emoji>
        </Icon>
        <Text>
          <h1>Adopt the « First Principle » way of thinking</h1>
          Start thinking on the first basis from which a thing is known. First
          principles is a way of thinking by which a person breaks down a
          problem to its simplest element so that a solution can be found.
          Aristotle is credited with its creation and Elon Musk is a great
          advocate of this way of thinking.
        </Text>
      </Row>
      <Row>
        <Icon>
          <Emoji label="Kiss">💋</Emoji>
        </Icon>
        <Text>
          <h1>Keep It Stupid Simple</h1>
          Said Kelly Johnson aircraft engineer of the famous us aircraft SR-71
          Blackbird. Most solutions work best if they are kept simple rather
          than made complicated. Since then, all good software developper know
          for good reason the KISS acronym.
        </Text>
      </Row>
      <Row>
        <Icon>
          <Emoji label="Peak-No-Evil Monkey">🙊</Emoji>
        </Icon>
        <Text>
          <h1>Watch out the bullshits</h1>
          Nobody is perfect, so always be honest to acknowledge when you made
          bullshit. Is this principle already another bullshit ? I’ll let you
          judge by yourself ;-)
        </Text>
      </Row>
    </Container>
  </Style>
);

export default Principles;
