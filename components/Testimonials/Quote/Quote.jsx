import Img from 'shared/components/Img';
import PropTypes from 'prop-types';
import {
  Container,
  Box,
  Row,
  Text,
  QuotationMark,
  HorizLine,
  PeopleBox,
  FullName,
  Title,
  Company,
  ProfilePicture
} from './Styles';

const Quote = ({
  children, fullName, title, company, picture
}) => (
  <Container>
    <Row>
      <Box width="66%">
        <QuotationMark />
        <Text>{children}</Text>
      </Box>
      <PeopleBox width="34%">
        <ProfilePicture><Img src={picture} alt={fullName} title={fullName} /></ProfilePicture>
        <Box width="100%" direction="column">
          <FullName>{fullName}</FullName>
          <Title>{title}</Title>
          <Company>{company}</Company>
        </Box>
      </PeopleBox>
    </Row>
    <Row>
      <Box width="100%" justify="center">
        <HorizLine />
      </Box>
    </Row>
  </Container>
);

Quote.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired
  ]).isRequired,
  fullName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired
};

export default Quote;
