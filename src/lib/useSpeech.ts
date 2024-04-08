import { useEffect, useState } from 'react';

import { PlayingState, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const engine = createSpeechEngine({
    onBoundary: (e) => {
      console.log("onBoundary", e);
      setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
    },
    onEnd: (e) => {
      console.log("onEnd", e);
      setCurrentSentenceIdx(currentSentenceIdx < sentences.length - 1 ? currentSentenceIdx + 1 : 0);
      setCurrentWordRange([0, 0]);
    },
    onStateUpdate: (e) => {
      console.log("onStateUpdate", e);
      setPlaybackState(e);
    },
  })

  const play = () => {
    console.log("play pressed")
    engine.load(sentences[currentSentenceIdx || 0]);
    engine.play();
  };

  const pause = () => {
    console.log("pause pressed")
    engine.pause();
  };

  useEffect(() => {
    setCurrentSentenceIdx(0);
    setCurrentWordRange([0, 0]);
  }, [sentences])

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
