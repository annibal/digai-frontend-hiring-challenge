import { useEffect, useMemo, useRef, useState } from "react";

export interface IUseDurationTracker {
  updateInterval?: number;
  autoStart?: boolean;
}

export default function useDurationTracker({
  updateInterval = 300,
  autoStart = true,
}: IUseDurationTracker) {
  const lastTime = useRef<number>(performance.now());
  const lastTimePlayed = useRef<number>(performance.now());
  const [duration, setDuration] = useState<number>(0);
  const isTrackingRef = useRef<boolean>(autoStart == null ? true : Boolean(autoStart));

  const updateDuration = () => {
    const rightNow = performance.now();
    const elapsedTime = rightNow - lastTime.current;

    if (isTrackingRef.current) {
      setDuration((duration) => duration + elapsedTime);
      lastTime.current = rightNow;
    }
    
    return duration + elapsedTime;
  };

  const pause = () => {
    if (isTrackingRef.current) {
      updateDuration();
      isTrackingRef.current = false
    }
  }
  
  const play = () => {
    if (!isTrackingRef.current) {
      lastTime.current = lastTimePlayed.current = performance.now();
      isTrackingRef.current = true;
      updateDuration();
    }
  }

  const reset = () => {
    const trackedDuration = duration;
    lastTime.current = lastTimePlayed.current = performance.now();
    isTrackingRef.current = true;
    setDuration(0);
    return trackedDuration;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateDuration();
    }, updateInterval);
    console.debug(`created tracker interval: "${intervalId}"`)

    return () => {
      console.debug(`cleared tracker interval: "${intervalId}"`)
      clearInterval(intervalId);
    }
  }, [updateInterval, lastTimePlayed]);

  return {
    duration,
    updateDuration,
    pause,
    play,
    reset,
    isPlaying: isTrackingRef.current,
  }
}
