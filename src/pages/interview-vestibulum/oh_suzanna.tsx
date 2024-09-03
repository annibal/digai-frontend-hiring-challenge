import createSong, {
  ICreateOscillatorConfig,
  ISongSheetNote,
  stopAllOscillators,
} from "@/components/audio-media-services/createSong";

// Oh Susanna
const melodySheet: ISongSheetNote[] = [
  ["C4", 1/2], ["D4", 1/2],
  ["E4", 1],   ["G4", 1], ["G4", 1], [null, 3/4], ["A4", 1/4],
  ["G4", 1],   ["E4", 1], ["C4", 1], ["C4", 1/2], ["D4", 1/2],
  ["E4", 1],   ["E4", 1], ["D4", 1], ["C4", 1],

  ["D4", 2+3/4],  [null, 1/4], ["C4", 1/2], ["D4", 1/2],
  ["E4", 1],   ["G4", 1], ["G4", 1], [null, 3/4], ["A4", 1/4],
  ["G4", 1],   ["E4", 1], ["C4", 1], ["C4", 1/2], ["D4", 1/2],
  ["E4", 1],   ["E4", 1], ["D4", 1], ["D4", 1],
  ["C4", 3],
];
const harmonySheet: ISongSheetNote[] = [
  [null, 1],

  ["C2", 2],   ["C2", 2],   ["C2", 2],   ["C2", 2],
  ["C2", 2],   ["C2", 2],   ["G2", 2],   ["G2", 2],

  ["C2", 2],   ["C2", 2],   ["C2", 2],   ["C2", 2],
  ["E2", 2],   ["D2", 2],   ["C2", 3],
];

export default function playOhSuzanna(
  audioContext: AudioContext,
  config?: {
    onSongEnd?: ICreateOscillatorConfig["onSongEnd"];
    onTonePlayed?: ICreateOscillatorConfig["onTonePlayed"];
  }
) {
  const { onSongEnd, onTonePlayed } = config || {};
  const baseTime = audioContext.currentTime;
  const melodySong = createSong(melodySheet, {
    audioContext: audioContext,
    baseTime,
    type: "sawtooth",
    volumePeak: 0.9,
    speedModifier: 0.5,
    onSongEnd,
    onTonePlayed,
  });
  const harmonySong = createSong(harmonySheet, {
    audioContext: audioContext,
    baseTime,
    type: "sine",
    volumePeak: 0.6,
    speedModifier: 0.5,
  });

  // console.log({ melodySong, harmonySong })

  function stopOhSuzanna() {
    stopAllOscillators(melodySong.songOscillators);
    stopAllOscillators(harmonySong.songOscillators);
  }

  return {
    stopOhSuzanna,
    duration: melodySong.songDuration,
    melodyOscillators: melodySong.songOscillators,
    melodyTones: melodySong.songTonesQueue,
    harmonyOscillators: harmonySong.songOscillators,
    harmonyTones: harmonySong.songTonesQueue,
  };
}
