import { useState, useEffect } from 'react';
import { useInView, InView } from 'react-intersection-observer';
import { Media } from 'shared/utils/responsive';
import BusinessSVG from './assets/BusinessSvg';
import DesignSvg from './assets/DesignSvg';
import TechnologySvg from './assets/TechnologySvg';

import {
  Style,
  Container,
  Box,
  BoxElem,
  Title,
  SkillList,
  SkillItem,
  IconContainer,
  HorizLine,
  VertLine
} from './Styles';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.2
  });

  useEffect(() => {
    if (sectionInView && !isVisible) {
      setIsVisible(true);
    }
  }, [sectionInView]);
  return (
    <Style>
      <Container ref={sectionRef} animate={isVisible ? 'showed' : 'hidden'}>
        <Box>
          <Media greaterThan="sm">
            <BoxElem height="50px" />
            <BoxElem justify="flex-end">
              <HorizLine size="1px" width="50%" />
            </BoxElem>
          </Media>
          <BoxElem>
            <VertLine size="1px" height="50px" />
          </BoxElem>
          <Title>Business</Title>
          <BoxElem>
            <InView threshold="0.5">
              {({ inView, ref }) => (
                <IconContainer ref={ref}>
                  <BusinessSVG animate={inView} />
                </IconContainer>
              )}
            </InView>
          </BoxElem>

          <BoxElem>
            <SkillList>
              <SkillItem>Customer Experience</SkillItem>
              <SkillItem>Digital Marketing</SkillItem>
              <SkillItem>Business Strategy</SkillItem>
              <SkillItem>New Biz Development</SkillItem>
              <SkillItem>Project Management</SkillItem>
            </SkillList>
          </BoxElem>
        </Box>
        <Box>
          <Media greaterThan="sm">
            <BoxElem height="50px">
              <VertLine size="1px" height="50px" />
            </BoxElem>
            <BoxElem>
              <HorizLine size="1px" width="100%" />
            </BoxElem>
          </Media>
          <BoxElem>
            <VertLine size="1px" height="50px" />
          </BoxElem>
          <Title>Design</Title>
          <BoxElem>
            <InView threshold="0.5">
              {({ inView, ref }) => (
                <IconContainer ref={ref}>
                  <DesignSvg animate={inView} />
                </IconContainer>
              )}
            </InView>
          </BoxElem>
          <BoxElem>
            <SkillList>
              <SkillItem>Information Architecture</SkillItem>
              <SkillItem>Wireframing</SkillItem>
              <SkillItem>UX Architecture </SkillItem>
              <SkillItem>Presentation Design</SkillItem>
            </SkillList>
          </BoxElem>
        </Box>
        <Box>
          <Media greaterThan="sm">
            <BoxElem height="50px" />
            <BoxElem justify="flex-start">
              <HorizLine size="1px" width="50%" />
            </BoxElem>
          </Media>
          <BoxElem>
            <VertLine size="1px" height="50px" />
          </BoxElem>
          <Title>Technology</Title>
          <BoxElem>
            <InView threshold="0.5">
              {({ inView, ref }) => (
                <IconContainer ref={ref}>
                  <TechnologySvg animate={inView} />
                </IconContainer>
              )}
            </InView>
          </BoxElem>
          <BoxElem>
            <SkillList>
              <SkillItem>Technical Expertise</SkillItem>
              <SkillItem>Technology Radar</SkillItem>
              <SkillItem>Research &amp; Development</SkillItem>
              <SkillItem>Prototyping &amp; POC</SkillItem>
            </SkillList>
          </BoxElem>
        </Box>
      </Container>
    </Style>
  );
};

export default Skills;
