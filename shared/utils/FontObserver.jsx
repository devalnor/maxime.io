import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FontFaceObserver from 'fontfaceobserver';

export const useFontFace = (fontFamilies, timeout = 2000) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const observers = fontFamilies.map((fontFamily) => new FontFaceObserver(fontFamily).load());

    Promise.all(observers)
      .then(() => {
        setFontLoaded(true);
      })
      .catch(() => {
        setFontLoaded(false);
      });

    // Force a timeout even if all the fonts are not loaded
    // This will produce a FOUT effect but nevermind it's beter than a black screen
    setTimeout(() => {
      console.warn('Font loading timeout');
      setFontLoaded(true);
    }, timeout);
  }, [fontFamilies]);

  return fontLoaded;
};

export const FontObserver = ({ fontFamily, children }) => {
  const fontLoaded = useFontFace(fontFamily);

  return <>{React.cloneElement(children, { fontLoaded })}</>;
};

FontObserver.propTypes = {
  fontFamily: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired
};
