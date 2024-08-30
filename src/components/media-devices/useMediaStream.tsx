import { useEffect, useState } from "react";

export interface UseMediaStreamProps {
  audioSource?: string;
  disableImmediateCall?: boolean;
}
export interface UseMediaStreamValue {
  error: string;
  mediaStream?: MediaStream;
  getMediaStream: (constraints: MediaStreamConstraints) => Promise<MediaStream>;
  manualUpdate: () => void;
}

export default function useMediaStream({
  audioSource,
  disableImmediateCall,
}: UseMediaStreamProps) {
  const [error, setError] = useState("");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [immediateCalled, setImmediateCalled] = useState(false);
  const [lastManualUpdate, setLastManualUpdate] = useState<number>(Date.now());

  const mediaDevicesService = window?.navigator?.mediaDevices;
  const isAvailable = typeof mediaDevicesService?.getUserMedia === "function";

  async function getMediaStream(
    constraints: MediaStreamConstraints
  ): Promise<MediaStream> {
    if (!isAvailable) {
      setMediaStream(null);
      setError("Media Devices API is not available in this browser");
      return;
    }

    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      setError("");
      setMediaStream(stream);
      // window.localStream = stream;
      // window.localAudio.srcObject = stream;
      // window.localAudio.autoplay = true;
      console.log("setMediaStream:", stream);

      return stream;
    } catch (err) {
      setError(`${err.name}: ${err.message}`);
      console.error(`${err.name}: ${err.message}`);
    }
  }

  function manualUpdate() {
    setLastManualUpdate(Date.now());
    getMediaStream({
      audio: {
        sampleRate: 44100,
        sampleSize: 16,
        // volume: 0.25,
        deviceId: audioSource ? { exact: audioSource } : undefined,
      },
    });
  }

  // useEffect(() => {
  //   if (!immediateCalled) {
  //     console.log('getMediaStream useEffect : first immediate call')
  //     setImmediateCalled(true);
  //     if (disableImmediateCall) {
  //       console.log('getMediaStream useEffect : disabled, exiting')
  //       return;
  //     }
  //   } else {
      
  //     console.log('getMediaStream useEffect : not the first call')
  //   }

  //   getMediaStream({
  //     audio: {
  //       sampleRate: 44100,
  //       sampleSize: 16,
  //       // volume: 0.25,
  //       deviceId: audioSource ? { exact: audioSource } : undefined,
  //     },
  //   });
  // }, [audioSource, lastManualUpdate]);

  return {
    error,
    mediaStream,
    getMediaStream,
    manualUpdate,
  } as UseMediaStreamValue;
}
