import { MediaContextProvider } from 'shared/utils/responsive';
import Nav from 'components/Nav';
import Introduction from 'components/Introduction';
import Skills from 'components/Skills';
import Technologies from 'components/Technologies';
import Testimonials from 'components/Testimonials';
import Principles from 'components/Principles';
import Arguments from 'components/Arguments';

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

      </main>
    </MediaContextProvider>
  );
}

export default HomePage;
