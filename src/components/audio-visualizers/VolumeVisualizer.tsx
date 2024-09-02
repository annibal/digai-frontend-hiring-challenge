import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface IVolumeVisualizerProps extends HTMLAttributes<Element> {
  analyserNode?: AnalyserNode;
}

export default function VolumeVisualizer({
  analyserNode,
  className,
  ...restProps
}: IVolumeVisualizerProps) {
  const reqAnimFrameRef = useRef<any>(null);
  const [volume, setVolume] = useState(0);
  const [maxVolume, setMaxVolume] = useState(0);
  const [volume2, setVolume2] = useState(0);
  const [maxVolume2, setMaxVolume2] = useState(0);

  const startUpdateVolumeLoop = () => {
    const pcmData = new Float32Array(analyserNode.fftSize || 0);

    const updateVolume = () => {
      // alg 1
      analyserNode.getFloatTimeDomainData(pcmData);
      let itens = [];
      let im = 0;
      let sumSquares = 0.0;
      for (const amplitude of pcmData) {
        itens.push(((amplitude * amplitude * 1000) | 0) / 1000);
        sumSquares += amplitude * amplitude;
        im = Math.max(im, sumSquares)
      }
      const newVolume = Math.sqrt(sumSquares / pcmData.length);
      setVolume(newVolume);
      // console.log(im)

      // alg 2
      const array = new Uint8Array(analyserNode.frequencyBinCount);
      analyserNode.getByteFrequencyData(array);
      let sum = 0;
      let items = [];

      for (let i = 0; i < array.length; i++) {
        sum += array[i];
        items.push(array[i]);
      }
      const average = sum / array.length;
      setVolume2(average);

      // loop
      reqAnimFrameRef.current = requestAnimationFrame(updateVolume);
    };

    updateVolume();
  };

  useEffect(() => {
    if (!analyserNode) {
      setVolume(0);
      setVolume2(0);
      setMaxVolume(0);
      setMaxVolume2(0);
      return;
    }

    cancelAnimationFrame(reqAnimFrameRef.current || 0);
    startUpdateVolumeLoop();

    return () => {
      cancelAnimationFrame(reqAnimFrameRef.current || 0);
    };
  }, [analyserNode]);

  useEffect(() => {
    if (analyserNode) {
      setMaxVolume(Math.max(maxVolume, volume));
    }
  }, [volume, analyserNode]);

  useEffect(() => {
    if (analyserNode) {
      setMaxVolume2(Math.max(maxVolume2, volume2));
    }
  }, [volume2, analyserNode]);

  return (
    <div className={twMerge("font-mono", className)} {...restProps}>
      Volume 1: {volume}
      <br />
      Max 1: {maxVolume}
      <br />
      Volume 2: {volume2}
      <br />
      Max 2: {maxVolume2}
      <br />- MAX db: {analyserNode?.maxDecibels || "- n/a -"}
      <br />- MIN db: {analyserNode?.minDecibels || "- n/a -"}
      <br />- Channel Count: {analyserNode?.channelCount || "- n/a -"}
      <br />- FFT Size: {analyserNode?.fftSize || "- n/a -"}
      <br />- N° Inputs: {analyserNode?.numberOfInputs || "- n/a -"}
      <br />- N° Outputs: {analyserNode?.numberOfOutputs || "- n/a -"}
    </div>
  );
}
