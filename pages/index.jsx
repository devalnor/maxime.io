import Introduction from 'components/Introduction';
import Nav from 'components/Nav';
import Skills from 'components/Skills';

import Technologies from 'components/Technologies';
import Testimonials from 'components/Testimonials';
import { MediaContextProvider } from 'shared/utils/responsive';

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

      </main>
    </MediaContextProvider>
  );
}

export default HomePage;
