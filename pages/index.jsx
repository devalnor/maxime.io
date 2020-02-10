import { MediaContextProvider } from 'shared/utils/responsive';
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
