import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { Masthead } from './Masthead';
import { Features } from './Features';
import { PageWrapper } from 'app/components/PageWrapper';
import videojs from 'video.js';
import WaveSurfer from 'wavesurfer.js';

/*
// Required imports when using videojs-wavesurfer 'live' mode with the microphone plugin
import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import * as MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;
*/

// Register videojs-wavesurfer plugin
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';


export function HomePage() {
let audioNode : any = React.useRef();
const videoJsOptions : any = {
  controls: true,
  bigPlayButton: false,
  width: 600,
  height: 300,
  fluid: false,
  plugins: {
      wavesurfer: {
          backend: 'MediaElement',
          displayMilliseconds: true,
          debug: true,
          waveColor: '#163b5b',
          progressColor: 'black',
          cursorColor: 'black',
          hideScrollbar: true
      }
  }
};

  useEffect(() => {
    let player = videojs(audioNode, videoJsOptions, () => {
      // print version information at startup
      const version_info = 'Using video.js ' + videojs.VERSION +
          ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
          ' and wavesurfer.js ' + WaveSurfer.VERSION;
      videojs.log(version_info);

      // load file
      player.src({src: 'hal.wav', type: 'audio/wav'});
  });
  },[]);
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <audio id="myAudio" ref={ node => audioNode = node} className="video-js vjs-default-skin"></audio>
      <PageWrapper>
        <Masthead />
        <Features />
      </PageWrapper>
    </>
  );
}
