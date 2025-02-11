import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Quote from './Quote';
import { Style, Container, Row } from './Styles';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <Style>
      <Container ref={ref} animate={isVisible ? 'showed' : 'hidden'}>
        <Row>
          <Quote
            fullName="Alexandre Papanastassiou"
            title="Integration Manager"
            company="Emakina Group"
            picture="/static/img/people/apa.png"
          >
            I can only say how impressed I am with his{' '}
            <b>amazing mix of digital culture</b>, creativity and skills. He is{' '}
            <b>a true swiss knife</b> able to work on a variety of aread from
            pitches, to UX design, to coding.
          </Quote>
        </Row>
        <Row>
          <Quote
            fullName="Cedric Gyselinck"
            title="Senior Account Manager"
            company="La niche Agency"
            picture="/static/img/people/cedx.png"
          >
            If you’re looking for a guy who{' '}
            <b>will give your business a fresh start, with great ideas</b> that
            match your customers’ expectations, you just found the right guy.
          </Quote>
        </Row>
        <Row>
          <Quote
            fullName="Maurizio Pedriale"
            title="Director Of Technology"
            company="Emakina"
            picture="/static/img/people/mpe.png"
          >
            I appreciate his <b>entrepreneurial mindset</b>, often seeing beyond
            the mere technical implications of a technology and trying to
            anticipate trends and possibilities.
          </Quote>
        </Row>
      </Container>
    </Style>
  );
};

export default Testimonials;
