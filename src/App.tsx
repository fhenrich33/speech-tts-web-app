import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

/**
TODO: 
* - Playback order of events
* - Highlight word in sentence
* - Out of bounds bug(?)
* - Clear logs.
*/
function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { play, pause, playbackState, currentSentenceIdx, currentWordRange } =
    useSpeech(sentences);

  async function loadContent() {
    const { content } = await fetchContent();
    setSentences(parseContentIntoSentences(content));
  }

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentSentenceIdx={currentSentenceIdx}
          currentWordRange={currentWordRange}
        />
      </div>
      <div>
        <Controls
          play={play}
          pause={pause}
          loadNewContent={loadContent}
          state={playbackState}
        />
      </div>
      {/* DELETE AFTER DONE. */}
      <br />
      <br />
      <div>
        <b>DEBUG</b>
        <br />
        sentences: {JSON.stringify(sentences || [], null, 2)}
        <br />
        current sentence index: {currentSentenceIdx || 0}
        <br />
        current sentence: {sentences[currentSentenceIdx || 0]}
        <br />
        current word range: {JSON.stringify(currentWordRange || [], null, 2)}
        <br />
        playback state: {playbackState}
      </div>
      {/* DELETE AFTER DONE. */}
    </div>
  );
}

export default App;
