export default function formatIndex(idx: number, maxLen?: number) {
  const strLength = maxLen == null || isNaN(+maxLen) ? 2 : Math.max(2, +maxLen);
  if (idx == null || isNaN(+idx)) return "?".repeat(strLength);
  return idx.toString().padStart(strLength, "0");
}


export function getListMaxLength(list: (unknown | number)[]) {
  if (!list || !Array.isArray(list)) {
    return 0;
  }
  if (list.every(listItem => !isNaN(+listItem))) {
    return Math.max(...(list.map(listItem => +(listItem || 0))))
  }
  return list.length.toString().length
}

export function getIndexFormatter(list: (unknown | number)[]) {
  const listLen = getListMaxLength(list);
  return (idx: number) => formatIndex(idx, listLen);
}