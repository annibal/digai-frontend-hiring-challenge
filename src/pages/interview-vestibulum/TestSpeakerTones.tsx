import { HTMLAttributes, useEffect, useRef, useState } from "react";
import playOhSuzanna from "./oh_suzanna";
import { PiPlayFill, PiStopFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { ISongTone } from "@/components/audio-media-services/createSong";
import scale from "@/utils/scale";

export interface ITestSpeakerTones extends HTMLAttributes<Element> {
  audioContext?: AudioContext;
}

export default function TestSpeakerTones({
  audioContext,
  className,
  ...restProps
}: ITestSpeakerTones) {
  const [isTestingSpk, setIsTestingSpk] = useState(false);
  const [testSongArray, setTestSongArray] = useState<
    (ISongTone & { played: boolean })[]
  >([]);

  // frequency:  261.63
  // index:  34
  // isLast:  true
  // scaleName:  "C"
  // scaleNumber:  4
  // end:  8
  // start:  7.25
  const startTimeScale = scale([0, 7.25]);
  const frequencyScale = scale([261.63, 440]);
  const lastToneWidth = startTimeScale(8) - startTimeScale(7.25);
  const widthScale = scale([0, 100], [0, Math.abs(1 - lastToneWidth)]);

  const stopTestSong = () => {
    if (audioOutputTestRef.current) {
      try {
        audioOutputTestRef.current();
        audioOutputTestRef.current = null;
      } catch (e) {
        console.log("Failed to stop oscillators when testing speakers");
        console.error(e);
      }
    }
  }

  useEffect(() => {
    if (isTestingSpk && audioOutputTestRef.current) {
      stopTestSong();
    }
  }, [audioContext?.["sinkId"]])

  const audioOutputTestRef = useRef<() => void>();
  useEffect(() => {
    if (!audioContext) return;

    if (isTestingSpk) {
      const { stopOhSuzanna, duration, melodyTones } = playOhSuzanna(
        audioContext,
        {
          onSongEnd: () => {
            setIsTestingSpk(false);
          },
          onTonePlayed: ({ tone, elapsedTime }) => {
            setTestSongArray(
              melodyTones.map((t) => ({
                ...t,
                played: tone.index + 1 >= t.index,
              }))
            );
          },
        }
      );
      setTestSongArray(melodyTones.map((t) => ({ ...t, played: false })));
      audioOutputTestRef.current = stopOhSuzanna;
    } else {
      stopTestSong();
    }
  }, [isTestingSpk]);

  return (
    <>
      <button
        {...restProps}
        onClick={() => setIsTestingSpk(!isTestingSpk)}
        className={twMerge(
          "mr-4 py-2 px-6",
          "inline-flex text-lg",
          isTestingSpk
            ? "text-white bg-indigo-600 hover:bg-indigo-700"
            : "text-indigo-700 bg-indigo-50 hover:bg-indigo-100",
          "border border-indigo-700",
          "focus:outline-none rounded",
          className
        )}
      >
        {isTestingSpk ? <PiStopFill /> : <PiPlayFill />}
      </button>

      {isTestingSpk ? (
        <div
          className={twMerge("inline-flex text-lg relative")}
          style={{
            width: `250px`,
            height: `36px`,
          }}
        >
          {testSongArray.map((tone) => {
            if (tone.frequency < 0) return "";

            const posTop = frequencyScale(tone.frequency) * 80;
            const toneStart = startTimeScale(tone.start) * 100;
            const toneEnd = startTimeScale(tone.end) * 100;
            const width = widthScale(toneEnd - toneStart) * 100;
            const posLeft = widthScale(toneStart) * 100;
            
            return (
              <div
                key={tone.index}
                className={twMerge(
                  "absolute rounded-sm",
                  tone.played ? "bg-indigo-700" : "bg-gray-400"
                )}
                style={{
                  top: `${posTop}%`,
                  height: `20%`,
                  left: `${posLeft}%`,
                  width: `calc(${width}% - 1px)`,
                  minWidth: "3px",
                }}
              ></div>
            );
          })}
        </div>
      ) : (
        <p className="">Testar áudio</p>
      )}
    </>
  );
}
