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
          <Title>Contact me if you need…</Title>
        </Row>
        <Row>
          <Icon>
            <Emoji label="Briefcase">💼</Emoji>
          </Icon>
          <Text>
            <h1>
              An entrepreneurial mindset that can understands your business
            </h1>
            I had the chance to work in many sectors which allows me to easily
            understand a new business to bring fresh ideas to it.
          </Text>
        </Row>
        <Row>
          <Icon>
            <Emoji label="Idea">💡</Emoji>
          </Icon>
          <Text>
            <h1>A creative asset that is not afraid to explore new ideas</h1>
            People know me to suggest landing on the moon. Not because it’s
            crazy, because the higher the goal, the greater the rewards.
          </Text>
        </Row>
        <Row>
          <Icon>
            <Emoji label="Hourglass">⏳</Emoji>
          </Icon>
          <Text>
            <h1>A self-managing collaborator who won’t wast your time</h1>
            I’ve worked as an independent freelance since the beginning of my
            career and I don’t need constant hand-holding in order to be
            productive. I know when to make decisions independently and when to
            ask for additional information or help.
          </Text>
        </Row>
        <Row>
          <Icon>
            <Emoji label="Man Technologist">👨‍💻</Emoji>
          </Icon>
          <Text>
            <h1>A huge technologies lover</h1>
            Since my first met with a Commodore 64 when I was 4, I’m in love
            with new technologies. As a self taught learner I’m always studying
            new trends like the Internet of Thing, Neural Network or Cloud
            Computing.
          </Text>
        </Row>
      </Container>
    </Style>
  );
};

export default Principles;
