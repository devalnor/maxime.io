import React from 'react';
import PropTypes from 'prop-types';

function BusinessSvg({ animate }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="211"
      height="99"
      viewBox="0 0 211 99"
      className={animate ? 'start' : null}
    >
      <defs>
        <style>
          {`
        .business_cls-1 {
          fill: #fff;
        }
  
        .business_cls-1, .business_cls-2 {
          stroke: #beceff;
        }
  
        .business_cls-2 {
          fill: #eff4ff;
        }
      `}
        </style>
      </defs>
      <g
        id="Groupe_4649"
        data-name="Groupe 4649"
        transform="translate(-191.5 -1063.636)"
      >
        <path
          id="TracÃ©_5679"
          data-name="TracÃ© 5679"
          className="business_cls-1 EieLilGg_0"
          d="M56.2,18.142a30.488,30.488,0,0,1,21.7,8.972L91.1,40.307l12.006-1.121.858-11.743L90.77,14.249a48.894,48.894,0,0,0-69.07.066l12.864,12.8A30.611,30.611,0,0,1,56.2,18.142Z"
          transform="translate(184.615 1064.136)"
        />
        <path
          id="TracÃ©_5680"
          data-name="TracÃ© 5680"
          className="business_cls-2 EieLilGg_1"
          d="M18.142,56.352a30.688,30.688,0,0,1,8.972-21.8L14.315,21.7a49.1,49.1,0,0,0,0,69.3l12.864-12.92A30.484,30.484,0,0,1,18.142,56.352Z"
          transform="translate(192 1056.752)"
        />
        <path
          id="TracÃ©_5681"
          data-name="TracÃ© 5681"
          className="business_cls-1 EieLilGg_2"
          d="M218.673,108.045a30.488,30.488,0,0,1-21.7-8.972L181.8,83.9l-.858,11.743-12.006,1.121-.132-.132h0l15.239,15.239a48.735,48.735,0,0,0,69,0L240.179,99.007A29.5,29.5,0,0,1,218.673,108.045Z"
          transform="translate(134.526 1035.884)"
        />
        <path
          id="TracÃ©_5682"
          data-name="TracÃ© 5682"
          className="business_cls-1 EieLilGg_3"
          d="M224.935,0a48.4,48.4,0,0,0-34.5,14.315L187.2,17.548l12.8,12.8,3.233-3.233a30.658,30.658,0,0,1,43.342,0l12.864-12.864A48.61,48.61,0,0,0,224.935,0Z"
          transform="translate(128.264 1064.136)"
        />
        <path
          id="TracÃ©_5683"
          data-name="TracÃ© 5683"
          className="business_cls-1 EieLilGg_4"
          d="M56.2,115.872A30.224,30.224,0,0,1,34.564,106.9L21.7,119.764a48.735,48.735,0,0,0,69,0L77.906,106.9A30.488,30.488,0,0,1,56.2,115.872Z"
          transform="translate(184.615 1028.057)"
        />
        <path
          id="TracÃ©_5684"
          data-name="TracÃ© 5684"
          className="business_cls-2 EieLilGg_5"
          d="M290.064,21.7h0L277.2,34.554a31.007,31.007,0,0,1,0,43.6l12.864,12.92A49.216,49.216,0,0,0,290.064,21.7Z"
          transform="translate(97.637 1056.752)"
        />
        <path
          id="Rectangle_2945"
          data-name="Rectangle 2945"
          className="business_cls-2 EieLilGg_6"
          width="74.941"
          height="18.142"
          transform="matrix(0.707, -0.707, 0.707, 0.707, 262.497, 1134.937)"
          d="M0 0 L74.941 0 L74.941 18.142 L0 18.142 Z"
        />
      </g>
      <style data-made-with="vivus-instant">
        {
          '.EieLilGg_0{stroke-dasharray:205 207;stroke-dashoffset:206;}.start .EieLilGg_0{animation:EieLilGg_draw 3000ms ease 0ms forwards;}.EieLilGg_1{stroke-dasharray:162 164;stroke-dashoffset:163;}.start .EieLilGg_1{animation:EieLilGg_draw 3000ms ease 0ms forwards;}.EieLilGg_2{stroke-dasharray:210 212;stroke-dashoffset:211;}.start .EieLilGg_2{animation:EieLilGg_draw 3000ms ease 0ms forwards;}.EieLilGg_3{stroke-dasharray:171 173;stroke-dashoffset:172;}.start .EieLilGg_3{animation:EieLilGg_draw 3000ms ease 0ms forwards;}.EieLilGg_4{stroke-dasharray:162 164;stroke-dashoffset:163;}.start .EieLilGg_4{animation:EieLilGg_draw 3000ms ease 0ms forwards;}.EieLilGg_5{stroke-dasharray:162 164;stroke-dashoffset:163;}.start .EieLilGg_5{animation:EieLilGg_draw 3000ms ease 0ms forwards;}.EieLilGg_6{stroke-dasharray:187 189;stroke-dashoffset:188;}.start .EieLilGg_6{animation:EieLilGg_draw 3000ms ease 0ms forwards;}@keyframes EieLilGg_draw{100%{stroke-dashoffset:0;}}@keyframes EieLilGg_fade{0%{stroke-opacity:1;}94.44444444444444%{stroke-opacity:1;}100%{stroke-opacity:0;}}'
        }
      </style>
    </svg>
  );
}

BusinessSvg.propTypes = {
  animate: PropTypes.bool
};

BusinessSvg.defaultProps = {
  animate: false
};

export default BusinessSvg;
