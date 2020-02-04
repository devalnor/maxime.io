import styled from "styled-components";
import { colors } from "../lib/theme.js";

const Style = styled.section`
  background-image: url("../static/img/me.png");
  background-position-x: -430px;
  background-repeat: no-repeat;
  background-color: ${colors.darkBackground};
  background-blend-mode: screen;
  background-size: contain;
  color: white;
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: space-around;
  padding-left: 200px;
  padding-right: 200px;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  xbackground-color: red;
`;

const Me = styled.div`
  background-image: url("../static/img/me.png");
  background-color: ${colors.darkBackground};
  width: 800px;
  height: 800px;
  left: -400px;
  background-blend-mode: screen;
  position: absolute;
`;

const Quote = styled.div`
  font-family: "Montreal Regular";
  max-width: 760px;
  font-size: 45px;
  letter-spacing: -0.031em;
  margin-bottom: 50px;
  u {
    font-family: inherit;
  }
`;

const About = styled.div`
  letter-spacing: -0.022em;
  max-width: 760px;
  font-size: 21px;
  font-weight: 200;
  line-height: 40px;

  b {
    font-weight: 500;
  }
`;

const FullName = styled.div`
  background-color: ${colors.blueFlash};
  padding: 20px;
`;

const Introduction = () => {
  return (
    <Style>
      <Container>
        <div></div>
        <Quote>
          Developing innovative solutions that bring Customer Experience into
          the business goals <u>is a passion</u>.
        </Quote>
        <About>
          I’m an experienced digital consultant with a broad skill set and deep
          understanding of the interplay between <b>business</b>, <b>design</b>{" "}
          and <b>technology</b>. Over the last decade, I helped customers
          crafting solution that meet the holy grail of memorable user
          experiences in their digital ecosystem.
        </About>
      </Container>
    </Style>
  );
};

export default Introduction;
