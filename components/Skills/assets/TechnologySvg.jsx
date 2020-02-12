import React from 'react';
import PropTypes from 'prop-types';

const TechnologySvg = ({ animate }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="304"
    height="85"
    viewBox="0 0 304 85"
    className={animate ? 'start' : null}
  >
    <defs>
      <style>
        {`
      .techno_cls-1 {
        fill: #fff;
      }

      .techno_cls-1, .techno_cls-2 {
        stroke: #beceff;
      }

      .techno_cls-2 {
        fill: #edf2ff;
      }

      .techno_cls-3, .techno_cls-5 {
        fill: #beceff;
      }

      .techno_cls-3 {
        font-size: 22px;
        font-family: PTMono-Bold, PT Mono;
        font-weight: 700;
      }

      .techno_cls-4 {
        fill: #89a5fc;
      }

      .techno_cls-6 {
        stroke: none;
      }

      .techno_cls-7 {
        fill: none;
      }`}
      </style>
    </defs>
    <g
      id="Groupe_4647"
      data-name="Groupe 4647"
      transform="translate(-792 -2499)"
    >
      <g
        id="Rectangle_2968"
        data-name="Rectangle 2968"
        className="techno_cls-1"
        transform="translate(792 2523)"
      >
        <path
          className="techno_cls-6 qGdQyLFO_0"
          d="M0,0H304a0,0,0,0,1,0,0V51a10,10,0,0,1-10,10H10A10,10,0,0,1,0,51V0A0,0,0,0,1,0,0Z"
        />
        <path
          className="techno_cls-7 qGdQyLFO_1"
          d="M1,.5H303a.5.5,0,0,1,.5.5V51a9.5,9.5,0,0,1-9.5,9.5H10A9.5,9.5,0,0,1,.5,51V1A.5.5,0,0,1,1,.5Z"
        />
      </g>
      <g
        id="Rectangle_2970"
        data-name="Rectangle 2970"
        className="techno_cls-2"
        transform="translate(792 2499)"
      >
        <path
          className="techno_cls-6 qGdQyLFO_2"
          d="M10,0H294a10,10,0,0,1,10,10V25a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V10A10,10,0,0,1,10,0Z"
        />
        <path
          className="techno_cls-7 qGdQyLFO_3"
          d="M10,.5H294a9.5,9.5,0,0,1,9.5,9.5V24a.5.5,0,0,1-.5.5H1A.5.5,0,0,1,.5,24V10A9.5,9.5,0,0,1,10,.5Z"
        />
      </g>
      <text
        id="_echo_Hello_world"
        data-name="> echo Hello world"
        className="techno_cls-3"
        transform="translate(806 2560)"
      >
        <tspan x="0" y="0">
          &gt;{' '}
        </tspan>
        <tspan className="techno_cls-4" y="0">
          echo
        </tspan>
        <tspan y="0" xmlSpace="preserve">
          {' '}
          Hello world
        </tspan>
      </text>
      <path
        id="Rectangle_2969"
        data-name="Rectangle 2969"
        className="techno_cls-5 qGdQyLFO_4"
        width="13"
        height="26"
        transform="translate(1062 2541)"
        d="M0 0 L13 0 L13 26 L0 26 Z"
      />
    </g>
    <style data-made-with="vivus-instant">
      {
        '.qGdQyLFO_0{stroke-dasharray:722 724;stroke-dashoffset:723;}.start .qGdQyLFO_0{animation:qGdQyLFO_draw 1000ms ease 0ms forwards;}.qGdQyLFO_1{stroke-dasharray:718 720;stroke-dashoffset:719;}.start .qGdQyLFO_1{animation:qGdQyLFO_draw 1000ms ease 500ms forwards;}.qGdQyLFO_2{stroke-dasharray:650 652;stroke-dashoffset:651;}.start .qGdQyLFO_2{animation:qGdQyLFO_draw 1000ms ease 1000ms forwards;}.qGdQyLFO_3{stroke-dasharray:646 648;stroke-dashoffset:647;}.start .qGdQyLFO_3{animation:qGdQyLFO_draw 1000ms ease 1500ms forwards;}.qGdQyLFO_4{stroke-dasharray:78 80;stroke-dashoffset:79;}.start .qGdQyLFO_4{animation:qGdQyLFO_draw 1000ms ease 2000ms forwards;}@keyframes qGdQyLFO_draw{100%{stroke-dashoffset:0;}}@keyframes qGdQyLFO_fade{0%{stroke-opacity:1;}94.44444444444444%{stroke-opacity:1;}100%{stroke-opacity:0;}}'
      }
    </style>
  </svg>
);

TechnologySvg.propTypes = {
  animate: PropTypes.bool
};

TechnologySvg.defaultProps = {
  animate: false
};

export default TechnologySvg;
