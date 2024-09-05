import { Link, useParams } from "react-router-dom";
import {
  PiPlayPauseFill,
  PiArrowsClockwiseBold,
  PiRecordFill,
} from "react-icons/pi";
import { useStoreContext } from "@/providers/StoreProvider";
import { getIndexFormatter } from "@/utils/formatIndex";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import blobToFileURL from "@/utils/blobToFileURL";
import NibolAudioPlayer, {
  INibolAudioPlayerOnChangeProps,
} from "@/components/audio-visualizers/NibolAudioPlayer";
import { twMerge } from "tailwind-merge";

const formatTimer = (ms: number) => dayjs.duration(ms).format("mm:ss");

export default function InterviewAfterPage() {
  const { questions = [] } = useStoreContext();
  const canOverwriteAnswer = false;
  const [isAnswerIdxPlaying, setIsAnswerIdxPlaying] = useState(-1);

  const mimeType = useMemo(() => {
    return MediaRecorder.isTypeSupported("audio/mpeg")
      ? "audio/mpeg"
      : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/wav";
  }, []);

  const listIndexFormatter = getIndexFormatter(questions);

  const [answerDurations, setAnswerDurations] = useState<number[]>([]);
  const [qAnswers, setQAnswers] = useState<string[]>([]);
  useEffect(() => {
    Promise.all(
      questions.map((question) => {
        const recordingObj = new Blob(question.audioAnswer, {
          type: mimeType,
        });
        return blobToFileURL(recordingObj);
      })
    ).then((answerAudioFiles) => {
      setQAnswers(answerAudioFiles);
    });
  }, [questions]);

  const handleAudioPlayerChange = (
    audioPlayerProps: INibolAudioPlayerOnChangeProps,
    answerIndex: number
  ) => {
    console.log(answerIndex, audioPlayerProps);
    setAnswerDurations((arr) => {
      const tempArr = arr.slice();
      tempArr[answerIndex] = audioPlayerProps.duration * 1000;
      return tempArr;
    });
    if (audioPlayerProps.isPlaying) {
      setIsAnswerIdxPlaying(answerIndex);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <section className="flex flex-col">
        <h1 className="mb-12 title-font text-3xl font-medium text-gray-900">
          Respostas Enviadas
        </h1>

        <ul className="flex flex-wrap gap-4 md:gap-8">
          {questions.map((question, idx) => (
            <li
              className="block w-full max-w-lg border-2 border-gray-300 px-3 sm:px-6 py-4 rounded-lg bg-white"
              key={idx}
            >
              <div className="flex">
                <div className="flex-shrink-0 flex-grow-0 whitespace-nowrap font-bold text-indigo-500 font-mono w-16 text-right hidden md:block">
                  P 0{listIndexFormatter(idx + 1)}:&nbsp;
                </div>
                <p className="flex-grow text-md text-gray-900 font-medium title-font mb-2 mr-3 leading-tight">
                  {question.question}
                </p>

                <div className="flex-shrink-0 flex-grow-0 whitespace-nowrap">
                  <div className="inline-block text-sm font-mono md:w-16 w-12 text-center border border-pink-800 bg-pink-200 text-pink-800 rounded-lg">
                    {formatTimer(question.limit * 1000)}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0 flex-grow-0 whitespace-nowrap font-bold text-indigo-500 font-mono w-16 text-right hidden md:block">
                  R 0{listIndexFormatter(idx + 1)}:&nbsp;
                </div>
                <div className="w-full flex-grow border border-gray-700 p-1 rounded-lg mr-3">
                  <NibolAudioPlayer
                    src={qAnswers[idx]}
                    isPlaying={isAnswerIdxPlaying === idx}
                    onChange={(props) => handleAudioPlayerChange(props, idx)}
                  />
                </div>

                <div className="flex-shrink-0 flex-grow-0 whitespace-nowrap">
                  <div className="inline-block text-sm font-mono md:w-16 w-12 text-center border border-blue-800 bg-blue-200 text-blue-800 rounded-lg">
                    {formatTimer(answerDurations[idx] || 0)}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0 flex-grow-0 w-16 hidden md:block"></div>

                <div className="flex-grow w-full mt-1 flex items-start justify-between mr-3">
                  <button
                    onClick={() =>
                      setIsAnswerIdxPlaying(
                        isAnswerIdxPlaying === idx ? -1 : idx
                      )
                    }
                    className={twMerge(
                      "inline-flex items-center justify-center py-2 w-20 focus:outline-none rounded text-xl",
                      isAnswerIdxPlaying === idx
                        ? "text-indigo-100 bg-indigo-500 hover:bg-indigo-600"
                        : "text-indigo-700 bg-indigo-50 hover:bg-indigo-100",
                      isAnswerIdxPlaying === idx
                        ? "border border-indigo-900"
                        : "border border-indigo-700"
                    )}
                  >
                    <PiPlayPauseFill />
                  </button>
                  {canOverwriteAnswer && (
                    <button className="inline-flex items-center justify-center gap-2 text-white bg-pink-600 border border-pink-600 py-2 w-20 focus:outline-none hover:bg-pink-700 hover:border-pink-700 rounded text-lg">
                      <PiRecordFill />
                      <PiArrowsClockwiseBold />
                    </button>
                  )}
                </div>

                <div className="flex-shrink-0 flex-grow-0 md:w-16 w-12"></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
