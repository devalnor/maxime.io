import Img from 'shared/components/Img';
import {
  Style, Container, Box, SmallTitle, Row, LogoList
} from './Styles';

const Technologies = () => (
  <Style>
    <Container>
      <Row>
        <Box width="50%">
          <SmallTitle>Development stack</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/js.png" alt="JavaScript" title="JavaScript" />
            <Img src="/static/img/logos/ts.png" alt="TypeScript" title="TypeScript" />
            <Img src="/static/img/logos/react.png" alt="React" title="React" />
            <Img src="/static/img/logos/graphql.png" alt="GraphQL" title="GraphQL" />
            <Img src="/static/img/logos/postgre.png" alt="PostgreSQL" title="PostgreSQL" />
            <Img src="/static/img/logos/docker.png" alt="Docker" title="Docker" />
          </LogoList>
        </Box>
        <Box width="50%">
          <SmallTitle>Cloud services</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/aws.png" alt="Amazon Web Service" title="Amazon Web Service" />
            <Img src="/static/img/logos/heroku.png" alt="Heroku" title="Heroku" />
            <Img src="/static/img/logos/azure.png" alt="Microsoft Azure" title="Microsoft Azure" />
          </LogoList>

        </Box>
      </Row>
      <Row>
        <Box width="50%">
          <SmallTitle>Prototyping</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/xd.png" alt="Adobe XD" title="Adobe XD" />
            <Img src="/static/img/logos/invision.png" alt="Invision" title="Invision" />
            <Img src="/static/img/logos/sketch.png" alt="Sketch" title="Sketch" />
          </LogoList>
        </Box>
        <Box width="50%">
          <SmallTitle>CI/CD &amp; project management</SmallTitle>
          <LogoList>
            <Img src="/static/img/logos/github.png" alt="Github" title="Github" />
            <Img src="/static/img/logos/gitlab.png" alt="Gitlab" title="Gitlab" />
            <Img src="/static/img/logos/jira.png" alt="Atlassian Jira" title="Atlassian Jira" />
          </LogoList>
        </Box>
      </Row>
    </Container>
  </Style>
);

export default Technologies;
