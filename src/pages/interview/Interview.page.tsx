import { Link, useParams } from "react-router-dom";
import {
  PiTrashFill,
  PiRecordFill,
  PiPlayFill,
  PiPauseFill,
  PiStopFill,
  PiFloppyDiskBackFill,
  PiPaperPlaneTiltFill,
} from "react-icons/pi";

export default function InterviewPage() {
  const { interviewId } = useParams();

  return (
    <>
      <section className="flex items-center flex-col">
        <h1 className="title-font text-3xl mb-8 font-medium text-gray-900">
          Entrevista
        </h1>

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

          <div className="border border-gray-700 p-6 rounded-lg"></div>

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
              <div className="w-1/6">
                <p className="-mt-10 mb-2 h-8 flex justify-center text-center items-end leading-none text-xs text-gray-500 tracking-widest font-medium title-font uppercase">
                  Excluir
                </p>
                <button className="py-6 w-full cursor-pointer focus:outline-none flex justify-center items-center rounded-b-lg border-b-2 border-x-2 border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-700">
                  <span className="text-xl md:text-3xl">
                    <PiTrashFill />
                  </span>
                </button>
              </div>
              <div className="w-1/6">
                <p className="-mt-10 mb-2 h-8 flex justify-center text-center items-end leading-none text-xs text-gray-500 tracking-widest font-medium title-font uppercase">
                  Gravar
                </p>
                <button className="py-6 w-full cursor-pointer focus:outline-none flex justify-center items-center rounded-b-lg border-b-2 border-x-2 border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-700">
                  <span className="text-xl md:text-3xl">
                    <PiRecordFill />
                  </span>
                </button>
              </div>
              <div className="w-1/6">
                <p className="-mt-10 mb-2 h-8 flex justify-center text-center items-end leading-none text-xs text-gray-500 tracking-widest font-medium title-font uppercase">
                  Play
                </p>
                <button className="py-6 w-full cursor-pointer focus:outline-none flex justify-center items-center rounded-b-lg border-b-2 border-x-2 border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-700">
                  <span className="text-xl md:text-3xl">
                    <PiPlayFill />
                  </span>
                </button>
              </div>
              <div className="w-1/6">
                <p className="-mt-10 mb-2 h-8 flex justify-center text-center items-end leading-none text-xs text-gray-500 tracking-widest font-medium title-font uppercase">
                  Pause
                </p>
                <button className="py-6 w-full cursor-pointer focus:outline-none flex justify-center items-center rounded-b-lg border-b-2 border-x-2 border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-700">
                  <span className="text-xl md:text-3xl">
                    <PiPauseFill />
                  </span>
                </button>
              </div>
              <div className="w-1/6">
                <p className="-mt-10 mb-2 h-8 flex justify-center text-center items-end leading-none text-xs text-gray-500 tracking-widest font-medium title-font uppercase">
                  Encerrar
                </p>
                <button className="py-6 w-full cursor-pointer focus:outline-none flex justify-center items-center rounded-b-lg border-b-2 border-x-2 border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-700">
                  <span className="text-xl md:text-3xl">
                    <PiStopFill />
                  </span>
                </button>
              </div>
              <div className="w-1/6">
                <p className="-mt-10 mb-2 h-8 flex justify-center text-center items-end leading-none text-xs text-gray-500 tracking-widest font-medium title-font uppercase">
                  Salvar & Enviar
                </p>
                <button className="py-6 w-full cursor-pointer focus:outline-none flex justify-center items-center rounded-b-lg border-b-2 border-x-2 border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-700">
                  <span className="text-xl md:text-3xl">
                    <PiFloppyDiskBackFill />
                  </span>
                </button>
              </div>
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
