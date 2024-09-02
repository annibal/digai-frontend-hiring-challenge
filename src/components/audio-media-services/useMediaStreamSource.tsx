import { useEffect, useState } from "react";

export interface UseMediaStreamSourceProps {
  deviceId?: string;
}
export interface UseMediaStreamSourceValue {
  error: string;
  mediaStream?: MediaStream;
  audioCtx?: AudioContext;
  analyserNode?: AnalyserNode;
  mediaSource?: MediaStreamAudioSourceNode;
  getMediaStreamSource: (deviceId?: string) => Promise<{
    mediaStream: MediaStream;
    audioCtx: AudioContext;
    analyserNode: AnalyserNode;
    mediaSource: MediaStreamAudioSourceNode;
  }>;
}

export default function useMediaStreamSource({
  deviceId,
}: UseMediaStreamSourceProps) {
  const [error, setError] = useState("");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [mediaSource, setMediaSource] =
    useState<MediaStreamAudioSourceNode | null>(null);

  const mediaDevicesService = window?.navigator?.mediaDevices;
  const isAvailable = typeof mediaDevicesService?.getUserMedia === "function";

  async function getMediaStreamSource(
    paramDeviceId?: string
  ) {
    if (!isAvailable) {
      setMediaStream(null);
      setError("Media Devices API is not available in this browser");
      return;
    }

    console.log("getMediaStreamSource", { paramDeviceId, deviceId });
    const audioSource = paramDeviceId ?? deviceId;

    const constraints = {
      audio: {
        sampleRate: 44100,
        sampleSize: 16,
        // volume: 0.25,
        deviceId: audioSource ? { exact: audioSource } : undefined,
      },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setError("");
      setMediaStream(stream);
      console.log("setMediaStream:", stream);

      const newAudioCtx = new AudioContext();
      setAudioCtx(newAudioCtx);
      console.log("setAudioCtx:", newAudioCtx);

      const analyser = newAudioCtx.createAnalyser();
      setAnalyserNode(analyser);
      console.log("setAnalyserNode:", analyser);

      const source = newAudioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      setMediaSource(source);
      console.log("setMediaSource:", source);

      // window.localStream = stream;
      // window.localAudio.srcObject = stream;
      // window.localAudio.autoplay = true;

      return {
        mediaStream: stream,
        audioCtx: newAudioCtx,
        analyserNode: analyser,
        mediaSource: source,
      };
    } catch (err) {
      setError(`${err.name}: ${err.message}`);
      console.error(`${err.name}: ${err.message}`);
    }
  }

  useEffect(() => {
    getMediaStreamSource();
  }, [deviceId]);

  return {
    error,
    mediaStream,
    audioCtx,
    analyserNode,
    mediaSource,
    getMediaStreamSource,
  } as UseMediaStreamSourceValue;
}
