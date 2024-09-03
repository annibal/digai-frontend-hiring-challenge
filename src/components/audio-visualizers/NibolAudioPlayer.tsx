
import { HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface INibolAudioPlayer extends HTMLAttributes<Element> {
}

export default function NibolAudioPlayer({
  className,
  ...restProps
}: INibolAudioPlayer) {

  return (
    <div {...restProps} className={twMerge("block", className)}>
      Nibol Audio Player
    </div>
  )
}