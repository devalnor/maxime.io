import Introduction from 'components/Introduction';
import Nav from 'components/Nav';
import Skills from 'components/Skills';
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
      </main>
    </MediaContextProvider>
  );
}

export default HomePage;
