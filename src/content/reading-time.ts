const WORDS_PER_MINUTE = 200;
const WORD_PATTERN = /[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu;

export function getReadingTimeMinutes(content: string | undefined) {
  const wordCount = content?.match(WORD_PATTERN)?.length ?? 0;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
