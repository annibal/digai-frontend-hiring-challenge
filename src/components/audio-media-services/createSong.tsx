// https://www.taniarascia.com/musical-instrument-web-audio-api/
export const ToneFrequencies = {
  C: [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01],
  Db: [17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92],
  D: [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64],
  Eb: [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03],
  E: [20.6, 41.2, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02],
  F: [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83],
  Gb: [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96],
  G: [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96],
  Ab: [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44],
  A: [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0],
  Bb: [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31],
  B: [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07],
};

type IToneScaleName = keyof typeof ToneFrequencies;
export interface ISongTone {
  scaleName: IToneScaleName;
  scaleNumber: number;
  frequency: number;
  start: number;
  end: number;
  isLast?: boolean;
  index: number;
}

export type ISongSheetNote = [string | null, number];

export interface ICreateQueuedTonesConfig {
  sheet: ISongSheetNote[];
  speedModifier?: number;
}

export interface ICreateOscillatorConfig {
  tone: ISongTone;
  baseTime: number;
  audioContext: AudioContext;
  type?: "sawtooth" | "custom" | "sine" | "square" | "triangle";
  volumePeak?: number;
  volumeOff?: number;
  onSongEnd?: () => void;
  onTonePlayed?: (props: { tone: ISongTone; elapsedTime: number }) => void;
}

export function createQueuedTones({
  sheet,
  speedModifier = 1,
}: ICreateQueuedTonesConfig) {
  const partialToneQ: Partial<ISongTone>[] = [];
  sheet.forEach((note, idx) => {
    const prevTone = partialToneQ[idx - 1];
    const scaleName = note[0] ? (note[0].slice(0, -1) as IToneScaleName) : null;
    const scaleNumber = note[0] ? Number(note[0].slice(-1)) : null;
    const duration = note[1] * speedModifier;

    const frequency = ToneFrequencies[scaleName]?.[scaleNumber] || -1;
    const start = prevTone?.end || 0;
    const end = start + duration * speedModifier;

    const tone: Partial<ISongTone> = {
      frequency,
      start,
      end,
      scaleName: scaleName,
      scaleNumber: scaleNumber,
    };

    partialToneQ.push(tone);
  });

  const toneQueue = partialToneQ
    .filter((ptone) => ptone.frequency != null)
    .map((tone, index) => ({ ...tone, index }));
  toneQueue[toneQueue.length - 1].isLast = true;
  return toneQueue as ISongTone[];
}

export function createNoteOscillator({
  tone,
  baseTime,
  audioContext,
  type,
  volumePeak,
  volumeOff,
  onSongEnd,
  onTonePlayed,
}: ICreateOscillatorConfig) {
  const startTime = tone.start + baseTime;
  const endTime = tone.end + baseTime;
  const duration = endTime - startTime;
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = tone.frequency;
  oscillator.type = type;
  oscillator.start(startTime);
  oscillator.stop(endTime);

  if (typeof onTonePlayed === "function") {
    oscillator.addEventListener("ended", () => {
      const elapsedTime = audioContext.currentTime - baseTime;
      onTonePlayed({ tone, elapsedTime });
    });
  }
  if (tone.isLast && typeof onSongEnd === "function") {
    oscillator.addEventListener("ended", onSongEnd);
  }

  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(volumePeak || 1, startTime);
  // gainNode.gain.setValueAtTime(volumePeak, startTime + Math.max(1/8, duration/2))
  // gainNode.gain.exponentialRampToValueAtTime(volumeOff, endTime + duration / 2);
  const safeVolumeOff = Math.max(volumeOff || 0, 0.00001);
  gainNode.gain.linearRampToValueAtTime(
    safeVolumeOff,
    endTime - Math.min(1 / 8, duration / 2)
  );
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  return oscillator;
}

export default function createSong(
  sheet: ISongSheetNote[],
  config: Omit<ICreateOscillatorConfig, "tone" | "baseTime"> &
    Omit<ICreateQueuedTonesConfig, "sheet"> & { baseTime?: number }
) {
  const { speedModifier, ...oscillatorConfig } = config;
  const songTonesQueue = createQueuedTones({
    sheet,
    speedModifier,
  });

  const songDuration = songTonesQueue.slice(-1).pop().end;

  const baseTime =
    config.baseTime == null ? config.audioContext.currentTime : config.baseTime;
  const songOscillators = songTonesQueue.map((tone) =>
    createNoteOscillator({ ...oscillatorConfig, baseTime, tone })
  );

  return { songTonesQueue, songOscillators, songDuration };
}

export function stopAllOscillators(oscillators: OscillatorNode[]) {
  oscillators.forEach((osc) => {
    try {
      osc.onended = () => {};
      osc.stop(0);
    } catch (e) {
      String(e);
    }
  });
}

