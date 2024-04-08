/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange = [0, 0],
  currentSentenceIdx = 0,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const currentWord = sentences.length
    ? sentences[currentSentenceIdx].slice(
        currentWordRange[0],
        currentWordRange[1]
      )
    : "";
  const currentSentence = sentences.length ? sentences[currentSentenceIdx] : "";

  return (
    <div data-testid="currently-reading">
      <span data-testid="current-word">{currentWord}</span>
      <p data-testid="current-sentence">{currentSentence}</p>
    </div>
  );
};
