import { HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useFourierVolume from "../audio-media-services/useFourierVolume";
import scale, { clamp, clamped, logScale } from "@/utils/scale";

export interface IVolumeVisualizerProps extends HTMLAttributes<Element> {
  analyserNode?: AnalyserNode;
  steps?: number;
  gradientRange?: number[];
  gradientSteepness?: number;
  stepClassName?: HTMLAttributes<Element>["className"];
}

export default function VolumeVisualizer({
  analyserNode,
  className,
  steps = 22,
  gradientRange = [3, 1],
  gradientSteepness = 1,
  stepClassName,
  ...restProps
}: IVolumeVisualizerProps) {
  const { volume } = useFourierVolume({ analyserNode });

  const volumeStepArray = useMemo(() => Array(steps).fill(""), [steps]);
  const volScaleMax = useMemo(
    () => logScale([0, 1], gradientRange[0], [0, steps + 1]),
    [gradientRange[0]]
  );
  const volScaleMin = useMemo(
    () => logScale([0, 1], gradientRange[1], [0, steps + 1]),
    [gradientRange[1]]
  );

  const volumeMax = volScaleMax(Math.max(volume, 0.0000001));
  const volumeMin = volScaleMin(Math.max(volume, 0.0000001));
  const gradientScale = logScale(
    [volumeMin, volumeMax],
    gradientSteepness,
    [1, 0]
  );

  return (
    <div
      className={twMerge(
        "font-mono font-sm flex h-6 overflow-hidden gap-1",
        "justify-evenly content-evenly",
        className
      )}
      {...restProps}
    >
      {volumeStepArray.map((_, i) => {
        const opacity = i < volumeMin ? 1 : clamp(gradientScale(i), [0, 1]);
        return (
          <div
            key={i}
            className={twMerge(
              "w-full flex-1 h-100 block rounded-sm",
              "flex flex-col",
              "bg-white",
              stepClassName
            )}
          >
            <div
              style={{ opacity }}
              className={twMerge(
                "w-full flex-1 h-100 block rounded-sm",
                "flex flex-col",
                "bg-purple-900",
                stepClassName
              )}
            ></div>
          </div>
        );
      })}
    </div>
  );
  // <br />
  // Volume: {volume}
  // <br />
  // Max: {maxVolume}
}
