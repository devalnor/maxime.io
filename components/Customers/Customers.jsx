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
          <Title>Missions I have worked on</Title>
        </Row>
        <Row justify="flex-start">
          <ReactSwipe
            id="customerSwipe"
            className="carousel"
            enabled={!(currentWidth >= sizes.md)}
            swipeOptions={{
              auto: 2000,
              continuous: true
            }}
          >
            <SectorContainer>
              <Sector>
                <h3>Agencies I worked for</h3>
                <ul>
                  <li>DogStudio</li>
                  <li>Emakina</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <h3>Automotive</h3>
                <ul>
                  <li>Audi</li>
                  <li>Interlease</li>
                  <li>Mercedes-Benz</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <h3>
                  Art, Tourism and
                  <br /> Entertainment
                </h3>
                <ul>
                  <li>Dragone</li>
                  <li>Musée d’Orsay</li>
                  <li>Pairi Daiza</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <h3>FMCG</h3>
                <ul>
                  <li>Bongrain</li>
                  <li>Mandarine Napoleon</li>
                  <li>Stassen</li>
                  <li>Vins de Bordeaux</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <h3>Financial services</h3>
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
                <h3>Industrial and Energy</h3>
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
                <h3>
                  Institution, Education <br /> and Associations
                </h3>
                <ul>
                  <li>Belgium&apos;s Chancellery of the Prime Minister</li>
                  <li>CLL</li>
                  <li>Education Above All Fundation</li>
                  <li>European Parliament</li>
                  <li>IHECS Academy</li>
                </ul>
              </Sector>
            </SectorContainer>
            <SectorContainer>
              <Sector>
                <h3>Media</h3>
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
                <h3>Publishing</h3>
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
                <h3>Retail and distribution</h3>
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
                <h3>Travel and transporation</h3>
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
                <h3>Telecom</h3>
                <ul>
                  <li>Belgacom</li>
                  <li>Join Experience</li>
                  <li>Proximus</li>
                  <li>Orange</li>
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
