import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

// TODO: fix parser, fix word range, highlight word in sentence, display sentence correctly.
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
    </div>
  );
}

export default App;
