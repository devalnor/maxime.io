import { MediaContextProvider } from 'shared/utils/responsive';
import { useAckee } from 'use-ackee';
import Nav from 'components/Nav';
import Introduction from 'components/Introduction';
import Skills from 'components/Skills';
import Technologies from 'components/Technologies';
import Testimonials from 'components/Testimonials';
import Principles from 'components/Principles';
import Arguments from 'components/Arguments';
import Customers from 'components/Customers';
import GetInTouch from 'components/GetInTouch';
import Footer from 'components/Footer';

function HomePage() {
  // To move if a router is implemented
  useAckee(
    '/',
    {
      server: 'https://ackee-analytics-tool.herokuapp.com',
      domainId: 'e6d174ce-2252-470d-b942-7dea8e98c1aa'
    },
    {
      ignoreLocalhost: true,
      detailed: true
    }
  );
  return (
    <MediaContextProvider>
      <header>
        <Nav />
      </header>
      <main>
        <Introduction />
        <Skills />
        <Technologies />
        <Testimonials />
        <Principles />
        <Arguments />
        <Customers />
        <GetInTouch />
      </main>
      <footer>
        <Footer />
      </footer>
    </MediaContextProvider>
  );
}

export default HomePage;
