import { MediaContextProvider } from 'shared/utils/responsive';
import Nav from 'components/Nav';
import Introduction from 'components/Introduction';
import Skills from 'components/Skills';
import Technologies from 'components/Technologies';
import Customers from 'components/Customers';
import GetInTouch from 'components/GetInTouch';
import Footer from 'components/Footer';

function HomePage() {
  // To move if a router is implemented

  return (
    <MediaContextProvider>
      <header>
        <Nav />
      </header>
      <main>
        <Introduction />
        <Skills />
        <Technologies />
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
