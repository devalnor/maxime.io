/* eslint-disable jsx-a11y/accessible-emoji */

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Emoji from 'shared/components/Emoji';
import {
  Style, Container, Title, Row, Icon, Text
} from './Styles';

const Principles = () => {
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
      <Container ref={ref} animate={isVisible ? 'showed' : 'hidden'}>
        <Row>
          <Title>Principles {Title.demo}</Title>
        </Row>
        <Row>
          <Icon>
            <Emoji label="Rocket">🚀</Emoji>
          </Icon>
          <Text>
            <h2>Adopt the « First Principle » way of thinking</h2>
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
            <h2>Keep It Stupid Simple (KISS)</h2>
            From Kelly Johnson aircraft engineer of the famous us aircraft SR-71
            Blackbird. Most solutions work best if they are kept simple rather
            than made complicated. Since then, all software developper know for
            good reason the KISS acronym.
          </Text>
        </Row>
        <Row>
          <Icon>
            <Emoji label="Peak-No-Evil Monkey">🙊</Emoji>
          </Icon>
          <Text>
            <h2>Watch out the bullshits</h2>
            Nobody is perfect, always be honest to acknowledge when you made
            bullshit. Is this third principle another one? I’ll let you judge by
            yourself ;)
          </Text>
        </Row>
      </Container>
    </Style>
  );
};

export default Principles;
