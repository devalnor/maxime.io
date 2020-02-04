import Nav from '../components/Nav';

import Introduction from '../components/Introduction';
import Skills from '../components/Skills';

function HomePage() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Introduction />
        <Skills />
      </main>
    </>
  );
}

export default HomePage;
