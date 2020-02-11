import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactSwipe from 'shared/components/ReactSwipe';
import useWindowSize from 'shared/hooks/useWindowSize';
import { sizes } from 'shared/utils/responsive';
import {
  Style,
  Title,
  Container,
  Row,
  Sector,
  SectorContainer
} from './Styles';

const Customers = () => {
  const windowSize = useWindowSize();
  const [currentWidth, setcurrentWidth] = useState(1024);
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1
  });

  // InView dectection
  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView]);

  // Responsive Slider
  useEffect(() => {
    setcurrentWidth(windowSize.width || 1024);
  }, [windowSize]);

  return (
    <Style>
      <Container ref={ref} animate={isVisible ? 'showed' : 'hidden'}>
        <Row>
          <Title>Customers I have worked for</Title>
        </Row>
        <Row justify="flex-start">
          <ReactSwipe
            className="carousel"
            enabled={!(currentWidth >= sizes.md)}
            swipeOptions={{
              auto: 2000,
              continuous: true
            }}
          >
            <SectorContainer>
              <Sector>
                <b>Agencies</b>
                <ul>
                  <li>DogStudio</li>
                  <li>Emakina</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>Automotive</b>
                <ul>
                  <li>Audi</li>
                  <li>Interlease</li>
                  <li>Mercedes-Benz</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>
                  Art, Tourism <br />
                  and Entertainment
                </b>
                <ul>
                  <li>Dragone</li>
                  <li>Musée d’Orsay</li>
                  <li>Pairi Daiza</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>FMCG</b>
                <ul>
                  <li>Bongrain</li>
                  <li>PMI</li>
                  <li>Mandarine Napoleon</li>
                  <li>Stassen</li>
                  <li>Vins de Bordeaux</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>Financial services</b>
                <ul>
                  <li>Axa Bank</li>
                  <li>BCGE</li>
                  <li>Beo Bank</li>
                  <li>BKCP</li>
                  <li>Dutch Bank</li>
                  <li>Keytrade Bank</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>Industrial and Energy</b>
                <ul>
                  <li>Baxter</li>
                  <li>Engie</li>
                  <li>Ores</li>
                  <li>Services industriels de Genève (SIG)</li>
                  <li>Thomas &amp; Pirons</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>Institution, Education and Associations</b>
                <ul>
                  <li>Belgium&apos;s Chancellery of the Prime Minister</li>
                  <li>CLL</li>
                  <li>Education Above All Fundation</li>
                  <li>European Parliament</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>Media</b>
                <ul>
                  <li>BBC Sport</li>
                  <li>IPM</li>
                  <li>Net Events</li>
                  <li>RMB</li>
                  <li>RTBF Auvio</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>Publishing</b>
                <ul>
                  <li>Casterman</li>
                  <li>Dargaud</li>
                  <li>Dupuis</li>
                  <li>Editions Delagrave</li>
                  <li>J’ai lu</li>
                  <li>Le Lombard</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>Retail and distribution</b>
                <ul>
                  <li>Cuisine Plus</li>
                  <li>Dufry</li>
                  <li>Eastpak</li>
                  <li>Ixina</li>
                  <li>Levi’s</li>
                  <li>The Phone House</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>Travel and transporation</b>
                <ul>
                  <li>Aegean</li>
                  <li>De Lijn</li>
                  <li>Europe Assistance</li>
                  <li>OuiBus</li>
                  <li>TEC</li>
                  <li>Thalys</li>
                  <li>Touring Assistance</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <b>Telecom</b>
                <ul>
                  <li>Belgacom</li>
                  <li>Join Experience</li>
                  <li>Proximus</li>
                  <li>VOO</li>
                </ul>
              </Sector>
            </SectorContainer>
          </ReactSwipe>
        </Row>
      </Container>
    </Style>
  );
};

export default Customers;
