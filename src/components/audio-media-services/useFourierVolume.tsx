import scale from "@/utils/scale";
import { useEffect, useMemo, useRef, useState } from "react";

export enum EVolumeModes {
  "float",
  "pcm",
}

export interface IUseFourierVolume {
  analyserNode: AnalyserNode,
  volumeMode?: EVolumeModes,
}
const volTypeBufferMap = { [EVolumeModes.pcm]: "fftSize", [EVolumeModes.float]: "frequencyBinCount" };
const volTypeScaleMap = { [EVolumeModes.pcm]: scale([0, 0.6], [0, 1]), [EVolumeModes.float]: scale([0, 150], [0, 1]) };

export default function useFourierVolume({ analyserNode, volumeMode = EVolumeModes.float }: IUseFourierVolume) {
  const reqAnimFrameRef = useRef<any>(null);
  const [volume, setVolume] = useState(0);
  const [maxVolume, setMaxVolume] = useState(-Infinity);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (analyserNode) {
      setMaxVolume(Math.max(maxVolume, volume));
    }
  }, [volume, analyserNode]);

  const bufferLength = analyserNode?.[volTypeBufferMap[volumeMode]] || 1024;
  const volumeScale = volTypeScaleMap[volumeMode] || ((val: number) => val);

  const bufferArray = useMemo(() => new Uint8Array(bufferLength), [bufferLength]);

  const startUpdateVolumeLoop = () => {
    const updateVolume = () => {
      if (volumeMode === EVolumeModes.pcm) {
        analyserNode.getByteTimeDomainData(bufferArray);
        let itens = [];
        let im = 0;
        let sumSquares = 0.0;
        for (const amplitude of bufferArray) {
          itens.push(((amplitude * amplitude * 1000) | 0) / 1000);
          sumSquares += amplitude * amplitude;
          im = Math.max(im, sumSquares)
        }
        const newVolume = Math.sqrt(sumSquares / bufferArray.length);
        setVolume(newVolume);
      }
      
      if (volumeMode === EVolumeModes.float) {
        analyserNode.getByteFrequencyData(bufferArray);
        let sum = 0;
        let count = 0;
  
        for (let i = 0; i < bufferArray.length; i++) {
          sum += bufferArray[i];
          count += 1;
        }
        const newVolume = count == 0 ? 0 : sum / count;
        setVolume(newVolume);
      }
  
      // loop
      if (isRunning) {
        reqAnimFrameRef.current = requestAnimationFrame(updateVolume);
      }
    };
    updateVolume();
  };

  useEffect(() => {
    if (!analyserNode) {
      setVolume(0);
      setMaxVolume(-Infinity);
      setIsRunning(false);
      return;
    }

    cancelAnimationFrame(reqAnimFrameRef.current || 0);
    setIsRunning(true)
    startUpdateVolumeLoop();

    return () => {
      cancelAnimationFrame(reqAnimFrameRef.current || 0);
    };
  }, [analyserNode]);

  return {
    rawVolume: volume,
    volume: volumeScale(volume),
    rawMaxVolume: maxVolume,
    maxVolume: volumeScale(maxVolume),
    isRunning,
    setIsRunning,
    bufferArray,
  }
}