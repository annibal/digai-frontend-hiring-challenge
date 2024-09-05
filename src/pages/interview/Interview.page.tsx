import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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
import { Fragment, ReactNode, useEffect, useState } from "react";
import useAudioMediaServices from "@/components/audio-media-services/useAudioMediaServices";
import VolumeVisualizer from "@/components/audio-visualizers/VolumeVisualizer";
import NibolAudioPlayer, {
  INibolAudioPlayerOnChangeProps,
} from "@/components/audio-visualizers/NibolAudioPlayer";
import dayjs from "dayjs";
import scale from "@/utils/scale";
import { useStoreContext } from "@/providers/StoreProvider";
import { twMerge } from "tailwind-merge";
import { Question } from "@/providers/interview.provider";
import blobToFileURL from "@/utils/blobToFileURL";

const formatTimer = (ms: number) => dayjs.duration(ms).format("mm:ss");

export default function InterviewPage() {
  const navigate = useNavigate();
  const { questionId, interviewId } = useParams();
  const { questions = [], setQuestionAnswerFile } = useStoreContext();

  const currentQuestionIdx = questions.findIndex((q) => q.id === questionId);
  const currentQuestion =
    currentQuestionIdx === -1
      ? ({} as Question)
      : questions[currentQuestionIdx];

  const firstUnansweredQuestion = questions.find((q) => !q.hasAnswer);
  const allQuestionsAnswered = questions.every((q) => q.hasAnswer);

  const maxAnswerTimeMs = currentQuestion?.limit * 1000;

  useEffect(() => {
    // console.log({
    //   currentQuestion,
    //   currentQuestionIdx,
    //   questionId,
    //   firstUnansweredQuestion,
    //   allQuestionsAnswered,
    //   maxAnswerTimeMs,
    //   questions,
    // });
    if (!currentQuestion?.id && !allQuestionsAnswered) {
      if (firstUnansweredQuestion) {
        return navigate(
          `/interview/${interviewId}/${firstUnansweredQuestion.id}`
        );
      } else {
        console.error("fail");
      }
    }
  }, [questionId, currentQuestion, currentQuestionIdx]);

  const [audioFileSrcFromAnswer, setAudioFileSrcFromAnswer] =
    useState<string>("");

  const parseAnswerAudioFile = async () => {
    const recordingObj = new Blob(currentQuestion.audioAnswer, {
      type: digitalRecorder.mimeType,
    });
    blobToFileURL(recordingObj).then((audioFileSrc) => {
      setAudioFileSrcFromAnswer(audioFileSrc);
    });
  };
  useEffect(() => {
    if (currentQuestion.hasAnswer) {
      parseAnswerAudioFile();
    } else {
      setAudioFileSrcFromAnswer("");
    }
  }, [currentQuestion.hasAnswer, currentQuestion.id]);

  const audsvc = useAudioMediaServices();
  const { mediaStreamData, digitalRecorder } = audsvc;

  const [isPlaying, setIsPlaying] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  useEffect(() => {
    setIsRecording(digitalRecorder.state !== "inactive");
  }, [digitalRecorder.state]);

  const [hasAnswerRecorded, setHasAnswerRecorded] = useState(false);
  useEffect(() => {
    const src = digitalRecorder.recordingFileUrl;
    setHasAnswerRecorded(
      src != null && typeof src === "string" && src.length > 10
    );
  }, [digitalRecorder.recordingFileUrl]);

  const withThisAllQuestionsAreAnswered =
    questions.every((q) => q.hasAnswer || q.id === questionId) &&
    hasAnswerRecorded;

  const currTime = Math.round(digitalRecorder.recordedTime);
  const remainingTime = maxAnswerTimeMs - currTime;
  const timerPositionScale = scale([0, maxAnswerTimeMs], [0, 100]);

  const handleAudioPlayerChange = (
    audioPlayerProps: INibolAudioPlayerOnChangeProps
  ) => {
    setAnswerDuration(audioPlayerProps.duration * 1000);
    if (!isRecording) {

      setIsPlaying(audioPlayerProps.isPlaying);
    }
    setPlayerTime(audioPlayerProps.currentTime * 1000);
  };
  const [answerDuration, setAnswerDuration] = useState(0);
  const [playerTime, setPlayerTime] = useState(0);

  useEffect(() => {
    console.debug("on questionId", questionId);
    digitalRecorder.reset();
    setIsPlaying(false);
    setPlayerTime(0);
  }, [questionId]);

  const fmtQuestionIndex = (idx: number) =>
    idx
      .toString()
      .padStart(Math.max(2, questions.length.toString().length), "0") || "??";
  return (
    <>
      <section className="flex items-center flex-col">
        <div className="flex items-center gap-2 w-full">
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

        <div className="w-full max-w-2xl mx-auto sm:px-6 py-2 flex flex-row gap-2">
          {questions.map((q) => {
            const dot = (
              <div
                className={twMerge(
                  "w-4 h-4 border-2 border-gray-300 px-2 rounded-full bg-white overflow-hidden hover:border-indigo-400 cursor-pointer",
                  q.hasAnswer && "bg-indigo-700",
                  q.id === questionId &&
                    "bg-indigo-400 border-indigo-600 hover:border-indigo-800",
                  q.id === questionId &&
                    q.hasAnswer &&
                    "bg-blue-400 hover:border-indigo-800",
                  q.id === questionId &&
                    hasAnswerRecorded &&
                    "bg-green-600 border-indigo-600 hover:border-indigo-800",
                  hasAnswerRecorded && "hover:bg-red-400 hover:border-red-800"
                )}
              />
            );
            return (
              <Fragment key={q.id}>
                {hasAnswerRecorded ? (
                  <span>{dot}</span>
                ) : (
                  <Link to={`/interview/${interviewId}/${q.id}`}>{dot}</Link>
                )}
              </Fragment>
            );
          })}
        </div>

        <div className="w-full max-w-2xl mx-auto border-2 border-gray-300 px-2 sm:px-6 pt-4 rounded-lg bg-white">
          <div className="flex mb-4 items-center">
            <p className="text-sm text-gray-600">
              Pergunta{" "}
              <span
                className={twMerge(
                  "font-bold",
                  currentQuestion.hasAnswer
                    ? "text-green-600"
                    : "text-indigo-500"
                )}
              >
                {fmtQuestionIndex(currentQuestionIdx + 1)}
              </span>{" "}
              de{" "}
              <span className="font-bold">
                {fmtQuestionIndex(questions.length)}
              </span>
            </p>
            <span className="text-md inline-block font-mono px-2 ml-auto border border-pink-800 bg-pink-200 text-pink-800 rounded-lg">
              {formatTimer(maxAnswerTimeMs)}
            </span>
          </div>
          <h2 className="text-xl text-gray-900 font-medium title-font mb-4">
            {currentQuestion?.question}
          </h2>

          <div className="flex justify-between align-center py-1 gap-4">
            <div className="inline-block text-md font-mono text-gray-400">
              00:00&nbsp;
            </div>
            <div className="inline-block text-md font-mono text-pink-800">
              -{formatTimer(remainingTime)}
            </div>
          </div>

          <div className="border border-gray-700 h-20 p-1 rounded-lg flex gap-1 items-stretch justify-center">
            <NibolAudioPlayer
              src={
                hasAnswerRecorded
                  ? digitalRecorder.recordingFileUrl
                  : audioFileSrcFromAnswer
              }
              isPlaying={
                (hasAnswerRecorded || currentQuestion.hasAnswer) &&
                isPlaying &&
                !isRecording
              }
              onChange={handleAudioPlayerChange}
            />
          </div>

          <div
            className="relative py-1"
            style={{ width: "calc(100% - 70px)", left: "35px" }}
          >
            <div
              className="relative inline-block text-md font-mono px-3 border border-blue-800 bg-blue-200 text-blue-800 rounded-lg mx-auto"
              style={{
                width: "70px",
                transform: "translateX(-50%)",
                left: `${timerPositionScale(currTime)}%`,
              }}
            >
              {formatTimer(currTime)}
            </div>
          </div>

          <div className="flex justify-end align-center h-8">
            {(hasAnswerRecorded || currentQuestion.hasAnswer) && (
              <div className="inline-block text-md font-mono leading-none">
                <span className="text-gray-500">Resposta: </span>
                <span className="text-indigo-700">
                  {formatTimer(playerTime)}
                </span>
                <span className="text-gray-500">{" / "}</span>
                <span className="text-indigo-700">
                  {formatTimer(answerDuration)}
                </span>
              </div>
            )}
          </div>

          <div
            className="mt-8 border-b-2 border-blue-50"
            style={{ marginBottom: "-4px" }}
          >
            <div className="pt-0 pb-0 px-1 gap-1 flex flex-row border-2 border-b-0 bg-blue-50 border-gray-300 rounded-t-lg">
              <RecorderButton
                label={
                  hasAnswerRecorded && currentQuestion.hasAnswer
                    ? "Manter Original"
                    : "Excluir"
                }
                disabled={!hasAnswerRecorded}
                icon={<PiTrashFill />}
                onClick={async () => {
                  if (hasAnswerRecorded) {
                    const isSuccess =
                      (await digitalRecorder.reset()) as unknown;
                    if (isSuccess) {
                      setIsPlaying(false);
                    }
                  }
                  if (currentQuestion.hasAnswer) {
                    await parseAnswerAudioFile();
                  }
                }}
              />
              <RecorderButton
                label={currentQuestion.hasAnswer ? "Nova Gravação" : "Gravar"}
                color="pink"
                active={isRecording}
                disabled={isRecording || hasAnswerRecorded || isPlaying}
                icon={<PiRecordFill className="text-pink-800" />}
                onClick={async () => {
                  if (currentQuestion.hasAnswer) {
                    const isSuccessA = await (async () => {
                      try {
                        (await digitalRecorder.reset()) as unknown;
                        setAudioFileSrcFromAnswer("");
                      } catch (e) {
                        console.error(e);
                        return false;
                      }
                      return true;
                    });

                    if (!isSuccessA) return;
                  }
                  const isSuccess = await digitalRecorder.start();
                  if (isSuccess) {
                    // setIsRecording(true);
                    setIsPlaying(true);
                  }
                }}
              />
              <RecorderButton
                label={isRecording && !isPlaying ? "Resumir Gravação" : "Play"}
                active={isPlaying}
                disabled={isPlaying || !(hasAnswerRecorded || currentQuestion.hasAnswer || isRecording)}
                icon={<PiPlayFill />}
                onClick={async () => {
                  if (isRecording && !hasAnswerRecorded) {
                    const isSuccess = await digitalRecorder.resume();
                    if (isSuccess) {
                      setIsPlaying(true);
                    }
                  }

                  if (hasAnswerRecorded || currentQuestion.hasAnswer) {
                    setIsPlaying(true);
                  }
                }}
              />
              <RecorderButton
                label={isRecording ? "Pausar Gravação" : "Pause"}
                active={
                  !isPlaying &&
                  (hasAnswerRecorded ||
                    currentQuestion.hasAnswer ||
                    isRecording)
                }
                disabled={!isPlaying}
                icon={<PiPauseFill />}
                onClick={async () => {
                  if (isRecording && !hasAnswerRecorded) {
                    const isSuccess = await digitalRecorder.pause();
                    if (isSuccess) {
                      setIsPlaying(false);
                    }
                  }

                  if (hasAnswerRecorded || currentQuestion.hasAnswer) {
                    setIsPlaying(false);
                  }
                }}
              />
              <RecorderButton
                label="Encerrar"
                disabled={!isRecording}
                icon={
                  <PiStopFill
                    className={twMerge(isRecording && "text-blue-800")}
                  />
                }
                onClick={async () => {
                  const isSuccess = await digitalRecorder.stop();
                  if (isSuccess) {
                    setIsPlaying(false);
                    // setIsRecording(false);
                    // setHasAnswerRecorded(true);
                  }
                }}
              />
              <RecorderButton
                label="Salvar & Enviar"
                disabled={!hasAnswerRecorded || !currentQuestion.id}
                icon={
                  withThisAllQuestionsAreAnswered ? (
                    <PiPaperPlaneTiltFill className="text-indigo-800" />
                  ) : (
                    <PiFloppyDiskBackFill className="text-green-800" />
                  )
                }
                onClick={() => {
                  if (hasAnswerRecorded && currentQuestion.id) {
                    setQuestionAnswerFile(
                      currentQuestion.id,
                      digitalRecorder.recordingDataChunks
                    );

                    if (withThisAllQuestionsAreAnswered) {
                      navigate(`/interview-after/${interviewId}`);
                    } else {
                      navigate(`/interview/${interviewId}`);
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
