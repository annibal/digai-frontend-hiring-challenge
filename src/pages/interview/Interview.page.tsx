import { Link, useParams } from "react-router-dom";
import {
  PiTrashFill,
  PiRecordFill,
  PiPlayFill,
  PiPauseFill,
  PiStopFill,
  PiFloppyDiskBackFill,
  PiPaperPlaneTiltFill,
  PiMicrophoneFill,
} from "react-icons/pi";
import RecorderButton from "./RecorderButton";
import { ReactNode, useState } from "react";
import useAudioMediaServices from "@/components/audio-media-services/useAudioMediaServices";
import VolumeVisualizer from "@/components/audio-visualizers/VolumeVisualizer";
import NibolAudioPlayer from "@/components/audio-visualizers/NibolAudioPlayer";

export default function InterviewPage() {
  const { interviewId } = useParams();

  const audsvc = useAudioMediaServices();
  window["audsvc"] = audsvc;
  const {
    permMicrophone,
    mediaStreamData,

    isMicPlayback,
    setisMicPlayback,

    mediaDevices,

    availableMics,
    selectedMic,
    setSelectedMic,

    availableSpkrs,
    selectedSpk,
    setSelectedSpk,
    
    digitalRecorder,
  } = audsvc;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasAnswerRecorded, setHasAnswerRecorded] = useState(false);

  return (
    <>
      <section className="flex items-center flex-col">
        <div className="flex items-center gap-2 w-full flex">
          <div className="w-48 hidden md:block"></div>

          <h1 className="title-font text-3xl mb-8 font-medium text-gray-900 md:mx-auto mr-auto">
            Entrevista
          </h1>

          <div className="w-48 flex justify-center items-center">
            <div className="mb-6 py-2 px-3 w-full border-2 border-gray-300 rounded-lg bg-white flex gap-3">
              <div className="text-xl appearance-none leading-tight">
                <PiMicrophoneFill />
              </div>
              <VolumeVisualizer
                steps={12}
                gradientRange={[1.6, 0.92]}
                className="h-5 w-full"
                stepClassName="bg-gray-200"
                analyserNode={mediaStreamData.analyserNode}
              />
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto border-2 border-gray-300 px-2 sm:px-6 pt-4 rounded-lg bg-white">
          <div className="flex mb-4 items-center">
            <p className="text-sm text-gray-600">
              Pergunta <span className="font-bold text-indigo-500">01</span> de{" "}
              <span className="font-bold">05</span>
            </p>
            <span className="text-md inline-block font-mono px-2 ml-auto border border-pink-800 bg-pink-200 text-pink-800 rounded-lg">
              03:00
            </span>
          </div>
          <h2 className="text-xl text-gray-900 font-medium title-font mb-4">
            Fingerstache flexitarian street art 8-bit waist co, subway tile poke
            farm?
          </h2>

          <div className="flex justify-between align-center py-1 gap-4">
            <div className="inline-block text-md font-mono text-gray-400">
              00:00&nbsp;
            </div>
            <div className="inline-block text-md font-mono text-pink-800">
              -01:13
            </div>
          </div>

          <div className="border border-gray-700 p-6 rounded-lg flex gap-1">
            <NibolAudioPlayer />
          </div>

          <div className="flex justify-center align-center py-1 gap-4">
            <div className="inline-block text-md font-mono px-3 border border-blue-800 bg-blue-200 text-blue-800 rounded-lg mx-auto">
              01:47
            </div>
          </div>

          <div
            className="mt-16 border-b-2 border-blue-50"
            style={{ marginBottom: "-4px" }}
          >
            <div className="pt-0 pb-0 px-1 gap-1 flex flex-row border-2 border-b-0 bg-blue-50 border-gray-300 rounded-t-lg">
              <RecorderButton
                label="Excluir"
                disabled={!hasAnswerRecorded}
                icon={<PiTrashFill />}
                onClick={() => {
                  setHasAnswerRecorded(false);
                  setIsPlaying(false);
                }}
              />
              <RecorderButton
                label="Gravar"
                color="pink"
                active={isRecording}
                disabled={isRecording || hasAnswerRecorded}
                icon={<PiRecordFill className="text-pink-800" />}
                onClick={async () => {
                  const isSuccess = await digitalRecorder.start();
                  if (isSuccess) {
                    setIsRecording(true);
                    setIsPlaying(true);
                  }
                }}
              />
              <RecorderButton
                label="Play"
                active={isPlaying}
                disabled={isPlaying || (!hasAnswerRecorded && !isRecording)}
                icon={<PiPlayFill />}
                onClick={async () => {
                  if (digitalRecorder.state === "paused") {
                    const isSuccess = await digitalRecorder.resume();
                    if (isSuccess) {
                      setIsPlaying(true);
                    }
                  }
                  
                  if (digitalRecorder.state === "inactive") {
                    // setIsPlaying(true);
                  }
                }}
              />
              <RecorderButton
                label="Pause"
                active={!isPlaying && (hasAnswerRecorded || isRecording)}
                disabled={!isPlaying}
                icon={<PiPauseFill />}
                onClick={async () => {
                  if (digitalRecorder.state === "recording") {
                    const isSuccess = await digitalRecorder.pause();
                    if (isSuccess) {
                      setIsPlaying(false);
                    }
                  }
                  
                  if (digitalRecorder.state === "inactive") {
                    // setIsPlaying(false);
                  }
                }}
              />
              <RecorderButton
                label="Encerrar"
                disabled={!isRecording}
                icon={<PiStopFill />}
                onClick={async () => {
                  const isSuccess = await digitalRecorder.stop();
                  if (isSuccess) {
                    setIsPlaying(false);
                    setIsRecording(false);
                    setHasAnswerRecorded(true);
                  }
                }}
              />
              <RecorderButton
                label="Salvar & Enviar"
                disabled={!hasAnswerRecorded}
                icon={<PiFloppyDiskBackFill />}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto flex justify-end mt-8">
          <Link
            to={`/interview-after/${interviewId}`}
            className="mt-8 inline-flex items-center leading-none text-white bg-indigo-500 border-0 py-4 px-8 focus:outline-none hover:bg-indigo-600 rounded text-xl"
          >
            Enviar Respostas
            <PiPaperPlaneTiltFill className="ml-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
