import { PlayingState } from "../lib/speech";

/*
 * Implement a component that provides basic UI options such as playing, pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
export const Controls = ({
  play,
  pause,
  loadNewContent,
  state,
}: {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}) => {
  const buttonLabel = () => {
    switch (true) {
      case state === "initialized" || state === "playing":
        return "Pause";
      case state === "paused" || state === "ended":
        return "Play";
      default:
        return "Play";
    }
  };

  const buttonAction = () => {
    switch (true) {
      case state === "initialized" || state === "playing":
        pause();
        break;
      case state === "paused" || state === "ended":
        play();
        break;
      default:
        play();
        break;
    }
  };

  return (
    <div>
      <button onClick={buttonAction}>{buttonLabel()}</button>
      <button onClick={loadNewContent}>Load new content</button>
    </div>
  );
};
