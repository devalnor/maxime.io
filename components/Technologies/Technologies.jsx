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
            <Img src="/static/img/logos/js.png" definitions={['2x']} alt="Javascript" />
            <Img src="/static/img/logos/ts.png" definitions={['2x']} alt="Typescript" />
            <Img src="/static/img/logos/react.png" definitions={['2x']} alt="React" />
            <Img src="/static/img/logos/graphql.png" definitions={['2x']} alt="GraphQL" />
            <Img src="/static/img/logos/postgre.png" definitions={['2x']} alt="PostgreSQL" />
            <Img src="/static/img/logos/docker.png" definitions={['2x']} alt="Docker" />
          </LogoList>
        </Box>
        <Box width="50%">
          <SmallTitle>Cloud Services</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/aws.png" definitions={['2x']} alt="Amazon Web Service" />
            <Img src="/static/img/logos/heroku.png" definitions={['2x']} alt="Heroku" />
            <Img src="/static/img/logos/azure.png" definitions={['2x']} alt="Microsoft Azure" />
          </LogoList>

        </Box>
      </Row>
      <Row>
        <Box width="50%">
          <SmallTitle>Prototyping</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/xd.png" definitions={['2x']} alt="Adobe XD" />
            <Img src="/static/img/logos/invision.png" definitions={['2x']} alt="Invision" />
            <Img src="/static/img/logos/sketch.png" definitions={['2x']} alt="Sketch" />
          </LogoList>
        </Box>
        <Box width="50%">
          <SmallTitle>CI / CR &amps; Project Management</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/github.png" definitions={['2x']} alt="Github" />
            <Img src="/static/img/logos/gitlab.png" definitions={['2x']} alt="Gitlan" />
            <Img src="/static/img/logos/jira.png" definitions={['2x']} alt="Atlasian JIRA" />
          </LogoList>
        </Box>
      </Row>
    </Container>
  </Style>
);

export default Technologies;
