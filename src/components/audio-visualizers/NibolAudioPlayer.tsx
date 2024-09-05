import { HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface INibolAudioPlayerOnChangeProps {
  isPlaying: boolean;
  currentTime: number;
  error: string;
  duration: number;
  percentPlayed: number;
  canPlay: boolean;
}
export interface INibolAudioPlayer
  extends Omit<HTMLAttributes<Element>, "onChange"> {
  src?: string;
  isPlaying?: boolean;
  currentTime?: number;
  onChange?: (args: INibolAudioPlayerOnChangeProps) => void;
}

const getPercentPlayed = (len?: number, val?: number) => {
  if (isNaN(+len) || len == null || isNaN(+val) || val == null) return 0;
  return len === 0 ? 0 : val / len;
};

export default function NibolAudioPlayer({
  src,
  isPlaying,
  currentTime,
  onChange,
  className,
  ...restProps
}: INibolAudioPlayer) {
  const audioElmRef = useRef<HTMLAudioElement>();
  const [stt_currentTime, stt_setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [stt_isPlaying, stt_setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [error, setError] = useState("");
  const [qCurrTimeUpd, setQCurrTimeUpd] = useState<number | null>(null);
  const [bufferTimes, setBufferTimes] = useState<number[]>([]);
  const [isFixingInfinityBug, setIsFixingInfinityBug] = useState(false);

  const hasAudio = src != null && typeof src === "string" && src.length > 10;

  // const percentPlayed = getPercentPlayed(duration, stt_currentTime);

  const onUpdate = (elm: HTMLAudioElement, eventName: string) => {
    console.debug(`NibolAudioPlayer on${eventName}()`, { elm });

    if (isFixingInfinityBug) {
      return;
    }

    if (elm.duration === Infinity) {
      setIsFixingInfinityBug(true);
      elm.currentTime = 1e100;
      setTimeout(() => {
        elm.play();
        setTimeout(() => {
          elm.currentTime = 1e100;
          setTimeout(() => {
            elm.play();
            setTimeout(() => {
              elm.pause();
              setTimeout(() => {
                elm.currentTime = 0;
                elm.pause();
                setIsFixingInfinityBug(false);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
      return;
    }

    const newValues = {
      isPlaying: !elm.paused,
      canPlay: elm.readyState === 4 && !elm.error,
      error: elm.error
        ? `Erro [${elm.error.code}] ao reproduzir áudio: ${elm.error.message}`
        : "",
      currentTime: elm.currentTime,
      duration: elm.duration,
      percentPlayed: getPercentPlayed(elm.currentTime, elm.duration),
    };

    if (eventName === "ended") {
      elm.currentTime = 0;
      newValues.isPlaying = false;
      newValues.currentTime = 0;
      newValues.percentPlayed = 0;
    }

    stt_setIsPlaying(isPlaying);
    setCanPlay(canPlay);
    setError(error);
    stt_setCurrentTime(currentTime);
    setDuration(duration);

    if (typeof onChange === "function") {
      onChange(newValues);
    }
  };

  useEffect(() => {
    const el = audioElmRef.current;
    onUpdate(el, "readystatechange");
  }, [audioElmRef.current?.readyState]);

  useEffect(() => {
    const el = audioElmRef.current;
    if (hasAudio && el) {
      el.load();
    }
  }, [src]);
  
  useEffect(() => {
    const el = audioElmRef.current;
    if (isPlaying != stt_isPlaying && hasAudio && el) {
      el[["pause", "play"][+!!isPlaying]]();
    }
  }, [isPlaying]);

  // useEffect(() => {
  //   console.log("NibolAudioPlayer: set currentTime", {
  //     currentTime,
  //     stt_currentTime,
  //     bufferTimes,
  //     el: audioElmRef.current,
  //     isPlaying,
  //     stt_isPlaying,
  //   });
  //   if (currentTime === null) return;
  //   if (currentTime === audioElmRef.current?.currentTime) return;
  //   if (bufferTimes.includes(currentTime)) return;
  //   setBufferTimes([]);
  //   setQCurrTimeUpd(currentTime);
  // }, [currentTime]);

  return (
    <>
      <div
        {...restProps}
        className={twMerge(
          "block w-full flex items-center justify-center",
          className
        )}
      >
        <audio
          className="w-full"
          controls
          autoPlay={false}
          src={src}
          ref={audioElmRef}
          style={{ display: "block" }}
          onLoadedData={(evt) =>
            onUpdate(evt.nativeEvent.target as HTMLAudioElement, "loadeddata")
          }
          onLoadedMetadata={(evt) =>
            onUpdate(evt.nativeEvent.target as HTMLAudioElement, "metadata")
          }
          onError={(evt) =>
            onUpdate(evt.nativeEvent.target as HTMLAudioElement, "error")
          }
          onTimeUpdate={(evt) =>
            onUpdate(evt.nativeEvent.target as HTMLAudioElement, "timeupdate")
          }
          onPlay={(evt) =>
            onUpdate(evt.nativeEvent.target as HTMLAudioElement, "play")
          }
          onPause={(evt) =>
            onUpdate(evt.nativeEvent.target as HTMLAudioElement, "pause")
          }
          onEnded={(evt) =>
            onUpdate(evt.nativeEvent.target as HTMLAudioElement, "ended")
          }
        />
      </div>
    </>
  );
}
