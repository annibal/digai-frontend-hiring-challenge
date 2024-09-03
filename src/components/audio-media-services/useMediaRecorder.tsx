import { useRef, useState } from "react";

export interface IUseMediaRecorderProps {
  stream;
}

export function downloadBlob(blob: Blob) {
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `Audio_${new Date().getMilliseconds()}.mp3`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export default function useMediaRecorder({ stream }: IUseMediaRecorderProps) {
  let recordingChunks: Blob[] = [];
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const mimeType = MediaRecorder.isTypeSupported("audio/mpeg")
    ? "audio/mpeg"
    : MediaRecorder.isTypeSupported("audio/webm")
      ? "audio/webm"
      : "audio/wav";

  const options = { mimeType };

  function createMediaRecorder() {
    const newMediaRecorder = new MediaRecorder(stream, options);
    recordingChunks = [];
    
    newMediaRecorder.ondataavailable = (e) => {
      recordingChunks.push(e.data);
    };

    newMediaRecorder.onstop = () => {
      // const recordBlob = new Blob(recordingChunks, {
      //   type: mimeType,
      // });
      // downloadBlob(recordBlob);
      
      recordingChunks = [];
    };
    
    setMediaRecorder(newMediaRecorder);
    return newMediaRecorder;
  }

  function stopRecording() {
    mediaRecorder.onstop = () => {
      // setCurrentRecord({
      //   ...currentRecord,
      //   file: window.URL.createObjectURL(recordBlob),
      // });
      recordingChunks = [];
    };

    mediaRecorder.stop();

    // setIsRecording(false);
    // setIsRecordingFinished(true);
    // setTimer(0);
    // clearTimeout(timerTimeout);
  }
}
