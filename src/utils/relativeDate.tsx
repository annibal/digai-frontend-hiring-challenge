/* eslint-disable @typescript-eslint/no-explicit-any */
export function findRepeatingWords(strs: string[]) {
  const subStrs = [];
  const wordCounts: Record<string, number> = {};

  // Find all substrings and their counts
  for (const str of strs) {
    const words = str.split(" ");
    for (const word of words) {
      if (!wordCounts[word]) {
        wordCounts[word] = 0;
      }
      wordCounts[word]++;
    }
  }

  // Filter substrings that appear in all strings
  for (const word in wordCounts) {
    if (wordCounts[word] === strs.length) {
      subStrs.push(word);
    }
  }

  return subStrs;
}

export default function getRelativeDateSpelled(
  valDate: Date | number | string,
  config?: {
    locale?: any;
    localeMatcher?: Intl.RelativeTimeFormatOptions["localeMatcher"];
    numeric?: Intl.RelativeTimeFormatOptions["numeric"];
    style?: Intl.RelativeTimeFormatOptions["style"];
    maxParts?: number;
    joinPartsStr?: string;
    joinLastPartsStr?: string;
    asObject?: boolean;
    mapPartUnits?: {
      year?: string;
      month?: string;
      week?: string;
      day?: string;
      hour?: string;
      minute?: string;
      second?: string;
    };
    padValue?: boolean;
  },
): string {
  const objDate = new Date(valDate);
  const asObject = config?.asObject === true;
  if (valDate == null || isNaN(+valDate)) {
    return (asObject ? { valDate, config, objDate } : "") as string;
  }

  const locale = config?.locale ?? navigator.languages;
  const localeMatcher = config?.localeMatcher ?? "best fit";
  const numeric = config?.numeric ?? "always";
  const style = config?.style ?? "long";
  const maxParts = config?.maxParts ?? 3;
  const joinPartsStr = config?.joinPartsStr ?? ", ";
  const joinLastPartsStr = config?.joinLastPartsStr ?? " and ";
  const mapPartUnits = config?.mapPartUnits ?? {};
  const padValue = config?.padValue == true;

  const parts = [
    { val: 31536000, unit: "year" },
    { val: 2592000, unit: "month" },
    { val: 604800, unit: "week" },
    { val: 86400, unit: "day" },
    { val: 3600, unit: "hour" },
    { val: 60, unit: "minute" },
    { val: 1, unit: "second" },
  ];

  const formatter = new Intl.RelativeTimeFormat(locale, {
    localeMatcher,
    numeric,
    style,
  });

  const deltaSecs = Math.round((objDate.getTime() - Date.now()) / 1000);
  // console.log({ deltaSecs });

  const divParts: any = parts.reduce(
    (prev, { val, unit }) => {
      // console.log({ ...prev, val, unit })
      return val > Math.abs(prev.seconds)
        ? prev
        : {
            segments: [...prev.segments, { val: Math.round(prev.seconds / val), unit }],
            seconds: prev.seconds % val,
          };
    },
    { segments: [], seconds: deltaSecs } as any,
  );
  // console.log({ divParts });

  const formattedParts = divParts.segments.map((seg: { val: number; unit: string }) =>
    formatter.formatToParts(seg.val, seg.unit as any),
  ) as Array<Intl.RelativeTimeFormatPart[]>;

  let timeParts = formattedParts;

  if (padValue)
    timeParts = timeParts.map((seg) =>
      seg.map((part) => (part.type === "integer" ? { ...part, value: part.value.padStart(2, "0") } : part)),
    );

  timeParts = timeParts.map((seg) => {
    const unitPart = seg.find((part) => Boolean((part as any).unit)) as any;
    const customUnitLiteral = mapPartUnits[unitPart?.unit];
    if (customUnitLiteral) return unitPart.value + customUnitLiteral;

    return seg.map((part) => part.value).join("");
  });

  const commonWords = findRepeatingWords(timeParts as any);
  if (timeParts.length > 1) {
    timeParts = timeParts.map((part) =>
      commonWords.reduce((strPart, word) => strPart.replace(new RegExp(word, "gi"), "").trim(), part),
    );
  }
  // console.log('commonWords :>> ', commonWords);
  // console.log('timeParts :>> ', timeParts);

  const timePartsSl = timeParts.slice(0, maxParts);
  const result = [...timePartsSl.slice(0, -2), timePartsSl.slice(-2).join(joinLastPartsStr)].join(joinPartsStr);

  const allObjects = {
    valDate,
    config,
    objDate,
    parts,
    formatter,
    deltaSecs,
    divParts,
    formattedParts,
    commonWords,
    timeParts,
    result,
  };
  //   console.log("getRelativeDateSpelled :>> ", allObjects);

  if (asObject) {
    return allObjects as any;
  }
  return result;
}
