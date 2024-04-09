const API_URL = "http://localhost:5174/content";

type Content = {
  content: string
}

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<Content> => {
  const res = await fetch(url);

  if (!res.ok)
    return { content: "<speak><s>There was an error</s></speak>" };

  return await res.json();
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  if (!content.startsWith("<speak>")) throw new Error("SSML is invalid.");

  return content
    .replaceAll("<speak>", "")
    .replaceAll("</speak>", "")
    .replaceAll("<p>", "")
    .replaceAll("</p>", "")
    .split("<s>")
    .map(s => s.split("</s>")[0])
    .slice(1)
};

export { fetchContent, parseContentIntoSentences };
