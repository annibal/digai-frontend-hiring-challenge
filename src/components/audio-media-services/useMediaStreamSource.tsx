import { useEffect, useRef, useState } from "react";

export interface UseMediaStreamSourceProps {
  inputDeviceId?: string;
  outputDeviceId?: string;
  playback?: boolean;
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

function disconnectPlayback(
  source: MediaStreamAudioSourceNode,
  destination: AudioNode
) {
  try {
    source.disconnect(destination);
  } catch (e) {
    console.debug("Error on disconnecting playback", { source, destination });
    console.debug(e);
  }
}

function connectPlayback(
  source: MediaStreamAudioSourceNode,
  destination: AudioNode
) {
  try {
    const res = source.connect(destination);
    return res;
  } catch (e) {
    console.debug("Error on connecting playback", { source, destination });
    console.debug(e);
  }
}

export default function useMediaStreamSource({
  inputDeviceId,
  outputDeviceId,
  playback,
}: UseMediaStreamSourceProps) {
  const [error, setError] = useState("");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [mediaSource, setMediaSource] =
    useState<MediaStreamAudioSourceNode | null>(null);
  const playbackRef = useRef<AudioNode>();
  const audioCtxRef = useRef<AudioContext>();
  const inputDeviceRef = useRef<string>();
  const outputDeviceRef = useRef<string>();

  const mediaDevicesService = window?.navigator?.mediaDevices;
  const isAvailable = typeof mediaDevicesService?.getUserMedia === "function";

  // useEffect(() => {
  //   if (inputDeviceRef.current != inputDeviceId) {
  //     console.log("input device changed", { newState: inputDeviceId, oldState: inputDeviceRef.current});
  //     inputDeviceRef.current = inputDeviceId;
  //     disconnectPlayback(mediaSource, playbackRef.current);
  //   }
  // }, [inputDeviceId])

  // useEffect(() => {
  //   if (outputDeviceRef.current != outputDeviceId) {
  //     console.log("output device changed", { newState: outputDeviceId, oldState: outputDeviceRef.current});
  //     outputDeviceRef.current = outputDeviceId;
  //     disconnectPlayback(mediaSource, playbackRef.current);
  //   }
  // }, [outputDeviceId])

  async function getMediaStreamSource(
    paramInputDeviceId?: string,
    paramOutputDeviceId?: string
  ) {
    if (!isAvailable) {
      setMediaStream(null);
      setError("Media Devices API is not available in this browser");
      return;
    }

    const audioSource = paramInputDeviceId ?? inputDeviceId;
    const audioDest = paramOutputDeviceId ?? outputDeviceId;

    disconnectPlayback(mediaSource, playbackRef.current);

    const constraints = {
      audio: {
        sampleRate: 44100,
        sampleSize: 16,
        deviceId: audioSource ? { exact: audioSource } : undefined,
      },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setError("");
      setMediaStream(stream);
      console.debug("setMediaStream:", stream);

      const ctxOpts: AudioContextOptions = {};
      if (audioDest) {
        ctxOpts["sinkId"] = audioDest;
      }
      const newAudioCtx = new (AudioContext || window["webkitAudioContext"])(ctxOpts);
      setAudioCtx(newAudioCtx);
      console.debug("setAudioCtx:", newAudioCtx);
      audioCtxRef.current = newAudioCtx;

      // newAudioCtx.onstatechange = function () {
      //   console.log(newAudioCtx.state);
      // };

      const analyser = newAudioCtx.createAnalyser();
      setAnalyserNode(analyser);
      console.debug("setAnalyserNode:", analyser);

      const source = newAudioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      setMediaSource(source);
      console.debug("setMediaSource:", source);

      // window.localStream = stream;
      // window.localAudio.srcObject = stream;
      // window.localAudio.autoplay = true;
      if (playback) {
        playbackRef.current = connectPlayback(source, newAudioCtx.destination);
      }

      return {
        mediaStream: stream,
        audioCtx: newAudioCtx,
        analyserNode: analyser,
        mediaSource: source,
      };
    } catch (err) {
      setError(`${err.name}: ${err.message}`);
      console.error(`${err.name}: ${err.message}`);

      // "SecurityError"
      // You need to use HTTPS to be able to select audio output devices.

      // "AbortError"
      // throw if some problem occurred which prevented the device from being used.

      // "InvalidStateError"
      // Thrown if current document is not fully active.

      // "NotAllowedError"
      // Permissions Policy | HTTP rather than HTTPS | Thrown if one or more of the requested source devices cannot be used at this time

      // "NotFoundError"
      // Thrown if no media tracks of the type specified were found that satisfy the given constraints.

      // "NotReadableError"
      // A hardware error occurred which prevented access to the device.

      // "OverconstrainedError"
      // no candidate devices which met the criteria requested - human-readable message explaining the problem.

      // "SecurityError"
      // Thrown if user media support is disabled

      // "TypeError"
      // insecure context | constraints is empty | all constraints are false
    }
  }

  function setPlayback(active: boolean) {
    if (!mediaSource || !audioCtx) return;

    if (active) {
      if (playbackRef.current) {
        disconnectPlayback(mediaSource, playbackRef.current);
      }
      playbackRef.current = connectPlayback(mediaSource, audioCtx.destination);
    } else {
      if (playbackRef.current) {
        disconnectPlayback(mediaSource, playbackRef.current);
        playbackRef.current = null;
      }
    }
  }

  useEffect(() => {
    let fnTeardown = () => {
      console.debug("teardown:empty - mediaStream");
    };

    getMediaStreamSource().then((mediaStreamData) => {
      fnTeardown = () => {
        console.debug("teardown:ok - mediaStream");
        mediaStreamData.audioCtx.close();
      };
    });

    return () => {
      fnTeardown();
    };
  }, [inputDeviceId, outputDeviceId]);

  useEffect(() => {
    setPlayback(playback);
  }, [playback, inputDeviceId, outputDeviceId]);

  return {
    error,
    mediaStream,
    audioCtx,
    analyserNode,
    mediaSource,
    getMediaStreamSource,
    setPlayback,
  } as UseMediaStreamSourceValue;
}
