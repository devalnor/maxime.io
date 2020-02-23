const StructData = () => {
  const data = {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: 'Maxime de Visscher',
    url: 'https://maxime.io',
    image: 'https://maxime.io/static/img/opengraph-1200x630.jpg',
    jobTitle: 'Technology Expert &amp; Digital Consultant'
  };

  // eslint-disable-next-line react/no-danger
  return (<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />);
};

export default StructData;
