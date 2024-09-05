import { useEffect, useMemo, useRef, useState } from "react";
import useDurationTracker from "../duration-tracker/useDurationTracker";
import blobToFileURL from "@/utils/blobToFileURL";

export interface IUseMediaRecorderProps {
  mediaStream?: MediaStream;
}

export function downloadBlob(blob: Blob) {
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `Audio_${new Date().getMilliseconds()}.mp3`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export default function useMediaRecorder({
  mediaStream,
}: IUseMediaRecorderProps) {
  const dataChunksRef = useRef<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder>(null);
  const twoFactorStart = useRef<boolean>(false);
  const [recordingFileUrl, setRecordingFileUrl] = useState("");
  const durationTracker = useDurationTracker({
    updateInterval: 60,
    autoStart: false,
  });

  const mimeType = useMemo(() => {
    return MediaRecorder.isTypeSupported("audio/mpeg")
      ? "audio/mpeg"
      : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/wav";
  }, []);

  const handleRecorderDataChunk = (event: BlobEvent) => {
    console.info("Data Chunk Event", event.data);
    if (event.data?.size && event.data?.size > 0) {
      const dataChunk = event.data;
      dataChunksRef.current.push(dataChunk);
      // const recording = new Blob(dataChunksRef.current, { mimeType });
    }

    if (mediaRecorderRef.current.state === "inactive") {
      processRecordingFile();
    }
  };

  const handleRecorderStop = (evt) => {
    console.info("INFO: ", evt, mediaRecorderRef.current);
    durationTracker.pause();
  };
  const handleRecorderStart = (evt) => {
    if (mediaRecorderRef.current.state === "inactive") {
      console.info("INFO: MediaRecorder didn't started");

      if (twoFactorStart.current) {
        console.info("INFO: twoFactorStart", {
          evt,
          recorder: mediaRecorderRef.current,
        });
        twoFactorStart.current = false;
        throw new DOMException(
          "MediaRecorder did not started on second attempt, aborting",
          "InvalidStateError"
        );
      }
      twoFactorStart.current = true;

      setTimeout(() => {
        try {
          mediaRecorderRef.current.start();
        } catch (e) {
          console.info(
            "INFO: MediaRecorder broke when attempting two-factor start",
            {
              evt,
              recorder: mediaRecorderRef.current,
            }
          );
          console.error(e);
        }
      }, 500);
      return;
    }

    if (twoFactorStart.current) {
      console.info(
        "INFO: Two Factor start did manage to make MediaRecorder start working."
      );
      twoFactorStart.current = false;
    }

    console.info("INFO: ", evt, mediaRecorderRef.current);
    durationTracker.reset();
    durationTracker.play();
    dataChunksRef.current = [];
  };
  const handleRecorderPause = (evt) => {
    console.info("INFO: ", evt, mediaRecorderRef.current);
    durationTracker.pause();
  };
  const handleRecorderResume = (evt) => {
    console.info("INFO: ", evt, mediaRecorderRef.current);
    durationTracker.play();
  };

  function createMediaRecorder() {
    if (!mediaStream) return;

    const newMediaRecorder = new MediaRecorder(mediaStream, { mimeType });

    newMediaRecorder.addEventListener("dataavailable", handleRecorderDataChunk);
    newMediaRecorder.addEventListener("stop", handleRecorderStop);
    newMediaRecorder.addEventListener("start", handleRecorderStart);
    newMediaRecorder.addEventListener("pause", handleRecorderPause);
    newMediaRecorder.addEventListener("resume", handleRecorderResume);

    // newMediaRecorder.stop
    // newMediaRecorder.start
    // newMediaRecorder.pause
    // newMediaRecorder.resume
    // newMediaRecorder.state

    mediaRecorderRef.current = newMediaRecorder;
    return newMediaRecorder;
  }

  const processRecordingFile = async () => {
    const recordingObj = new Blob(dataChunksRef.current, { type: mimeType });
    console.info("recordingObj :>> ", recordingObj);
    const fileSrc = await blobToFileURL(recordingObj);
    setRecordingFileUrl(fileSrc);
  };

  useEffect(() => {
    createMediaRecorder();
  }, [mediaStream]);

  const safelyChangeState =
    (fnName) =>
    async (...args) => {
      const tryToCallFunc = () => {
        if (typeof mediaRecorderRef.current?.[fnName] !== "function") {
          return { success: false };
        } else {
          try {
            const retVal = mediaRecorderRef.current?.[fnName](...args);
            return { success: true, data: retVal };
          } catch (e) {
            console.info(
              `INFO: Error when tried to call 'recorder.${fnName}()'`
            );
            console.error(e);
          }
        }
        return { success: false };
      };

      const funcResult1 = await tryToCallFunc();
      if (funcResult1?.success) {
        console.info(
          `INFO: tryToCallFunc 'recorder.${fnName}()' success`,
          funcResult1.data
        );
        return funcResult1;
      }

      console.warn(
        `Can't call 'recorder.${fnName}()' yet.`,
        mediaRecorderRef.current
      );

      const r = await new Promise((resol) => {
        setTimeout(() => {
          const funcResult2 = tryToCallFunc();
          if (funcResult2.success) {
            return resol(funcResult2);
          }

          console.error(
            `Failed to call 'recorder.${fnName}()' on the second attempt - the referece is invalid`
          );
          console.info("INFO: > mediaRecorderRef :>> ", mediaRecorderRef);
          console.info(
            "INFO: > mediaRecorderRef.current :>> ",
            mediaRecorderRef.current
          );
          console.info(
            "INFO: > typeof mediaRecorderRef.current :>> ",
            typeof mediaRecorderRef.current
          );
          resol(false);
        }, 300);
      });
      return r;
    };

  const reset = () => {
    // durationTracker.reset();
    dataChunksRef.current = [];
    setRecordingFileUrl("");
  };

  return {
    mediaRecorder: mediaRecorderRef.current,
    state: mediaRecorderRef.current?.state || "inactive",
    stop: safelyChangeState("stop"),
    start: async () => safelyChangeState("start")(250),
    pause: safelyChangeState("pause"),
    resume: safelyChangeState("resume"),
    reset,
    recordedTime: durationTracker.duration,
    processRecordingFile,
    recordingFileUrl,
    recordingDataChunks: dataChunksRef.current,
    mimeType,
  };
}
