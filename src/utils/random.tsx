export function randomElement<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function randomRange(min?: number, max?: number, decimal?: number): number {
  decimal = decimal == null || decimal < 0 ? Math.pow(10, 0) : Math.pow(10, decimal);
  min = (min == null ? 0 : min) * decimal;
  max = (max == null ? 100 : max) * decimal;
  return Math.floor(Math.random() * (max - min) + min) / decimal;
}

export function getRandomDistinctElements<T>(list: T[], count?: number): T[] {
  count = !count || isNaN(+count) ? 10 : +count;

  const words:T[] = [];
  let listCopy:T[] = list.slice();

  for (let i = 0; i < count; i++) {
    const len = listCopy.length;

    if (i < count && len < 1) {
      listCopy = listCopy.slice();
    }

    const wordIdx = Math.floor(Math.random() * len);
    const word = listCopy.splice(wordIdx, 1)[0];
    words.push(word);
  }

  return words;
}
