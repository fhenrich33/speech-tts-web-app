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
  sentences = [""],
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const [headRange, tailRange] = currentWordRange;
  const index = currentSentenceIdx <= sentences.length ? currentSentenceIdx : 0;

  const currentWord = sentences[index].slice(headRange, tailRange);
  const currentSentence = sentences[index];

  const sentenceHead = currentSentence.substring(0, headRange);
  const sentenceTail = currentSentence.substring(
    tailRange,
    currentSentence.length
  );

  const currentContent =
    currentSentence === currentWord
      ? currentSentence
      : `${sentenceHead}<span data-testid="current-word" style="color: red">${currentWord}</span>${sentenceTail}`;

  return (
    <div data-testid="currently-reading">
      <p
        data-testid="current-sentence"
        dangerouslySetInnerHTML={{ __html: currentContent }}
      ></p>
      <p>{sentences.join(" ")}</p>
    </div>
  );
};
