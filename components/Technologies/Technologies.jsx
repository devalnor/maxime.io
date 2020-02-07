import { Media } from 'shared/utils/responsive';
import Img from 'shared/components/Img';
import {
  Style, Container, Box, SmallTitle, Row, LogoList
} from './Styles';

const Technologies = () => (
  <Style>
    <Container>
      <Row>
        <Box width="50%">
          <SmallTitle>Development Stack</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/js.png" def={[2]} alt="Javascript" />
            <Img src="/static/img/logos/ts.png" def={[2]} alt="Typescript" />
            <Img src="/static/img/logos/react.png" def={[2]} alt="React" />
            <Img src="/static/img/logos/graphql.png" def={[2]} alt="GraphQL" />
            <Img src="/static/img/logos/postgre.png" def={[2]} alt="PostgreSQL" />
            <Img src="/static/img/logos/docker.png" def={[2]} alt="Docker" />
          </LogoList>
        </Box>
        <Box width="50%">
          <SmallTitle>Cloud Services</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/aws.png" def={[2]} alt="Amazon Web Service" />
            <Img src="/static/img/logos/heroku.png" def={[2]} alt="Heroku" />
            <Img src="/static/img/logos/azure.png" def={[2]} alt="Microsoft Azure" />
          </LogoList>

        </Box>
      </Row>
      <Row>
        <Box width="50%">
          <SmallTitle>Prototyping</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/xd.png" def={[2]} alt="Adobe XD" />
            <Img src="/static/img/logos/invision.png" def={[2]} alt="Invision" />
            <Img src="/static/img/logos/sketch.png" def={[2]} alt="Sketch" />
          </LogoList>
        </Box>
        <Box width="50%">
          <SmallTitle>CI / CR &amps; Project Management</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/github.png" def={[2]} alt="Github" />
            <Img src="/static/img/logos/gitlab.png" def={[2]} alt="Gitlan" />
            <Img src="/static/img/logos/jira.png" def={[2]} alt="Atlasian JIRA" />
          </LogoList>
        </Box>
      </Row>
    </Container>
  </Style>
);

export default Technologies;
