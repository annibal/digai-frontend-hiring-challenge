import { Link, useParams } from "react-router-dom";
import {
  PiMicrophoneFill,
  PiSpeakerHighFill,
  PiPlayFill,
  PiEarSlash,
} from "react-icons/pi";
import useNavigatorPermissions from "@/components/navigator-permissions/useNavigatorPermissions";
import useMediaDevices from "@/components/audio-media-services/useMediaDevices";
import useMediaStream from "@/components/audio-media-services/useMediaStreamSource";
import FormSelect, { IFormSelectOption } from "@/components/form/FormSelect";
import { useEffect, useState } from "react";
import VolumeVisualizer from "@/components/audio-visualizers/VolumeVisualizer";
import { twMerge } from "tailwind-merge";
import TestSpeakerTones from "./TestSpeakerTones";
import useAudioMediaServices from "@/components/audio-media-services/useAudioMediaServices";

export default function InterviewVestibulumPage() {
  const { interviewId } = useParams();

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
  } = useAudioMediaServices();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="mb-8 title-font text-3xl font-medium text-gray-900 max-w-2xl xl:max-w-none mx-auto">
        Preparação para a Entrevista
      </h1>
      <section className="pb-24 flex xl:flex-row flex-col">
        <div>
          <div className="md:flex md:justify-between gap-8">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <label
                className="block text-sm text-gray-600 font-medium mb-2 pl-9"
                htmlFor="input-device"
              >
                Dispositivo de Entrada
              </label>
              <div className="relative flex items-center">
                <div className="text-2xl appearance-none inline-block rounded leading-tight w-10 focus:outline-none focus:border-gray-500">
                  <PiMicrophoneFill />
                </div>
                <FormSelect
                  value={selectedMic}
                  onChange={(v) => setSelectedMic(v as string)}
                  options={availableMics}
                />

                {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <PiCaretDownFill />
                </div> */}
              </div>
              <div className="pl-9 py-3 flex items-center">
                <button
                  onClick={() => setisMicPlayback(!isMicPlayback)}
                  className={twMerge(
                    "mr-4 py-2 px-6",
                    "inline-flex text-lg",
                    isMicPlayback
                      ? "text-white bg-indigo-600 hover:bg-indigo-700"
                      : "text-indigo-700 bg-indigo-50 hover:bg-indigo-100",
                    "border border-indigo-700",
                    "focus:outline-none rounded"
                  )}
                >
                  <PiEarSlash />
                </button>
                <p className="">Escutar o dispositivo</p>
              </div>
              <div className="pl-9 mt-3 mb-1 flex items-center">
                <VolumeVisualizer
                  className="h-6 w-full"
                  analyserNode={mediaStreamData.analyserNode}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <label
                className="block text-sm text-gray-600 font-medium mb-2 pl-9"
                htmlFor="input-device"
              >
                Dispositivo de Saída
              </label>
              <div className="relative flex items-center">
                <div className="text-2xl appearance-none inline-block rounded leading-tight w-10 focus:outline-none focus:border-gray-500">
                  <PiSpeakerHighFill />
                </div>
                <FormSelect
                  value={selectedSpk}
                  onChange={(v) => setSelectedSpk(v as string)}
                  options={availableSpkrs}
                />
              </div>

              <div className="pl-9 py-3 flex items-center">
                <TestSpeakerTones
                  className=""
                  audioContext={mediaStreamData.audioCtx}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pl-9">
            {!permMicrophone.isPermitted && (
              <>
                {permMicrophone.canBePermitted ? (
                  <div className="py-4 px-6 border border-blue-500 bg-blue-100 rounded-lg my-2">
                    <p className="leading-tight">
                      Por razões de segurança, seu navegador não concedeu o
                      acesso ao microfone para esta página.
                    </p>
                    <button
                      className="mr-4 inline-flex text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded text-sm mt-6"
                      onClick={() => mediaStreamData.getMediaStreamSource()}
                    >
                      Conceder Acesso
                    </button>
                  </div>
                ) : (
                  <div className="py-4 px-6 border border-red-500 bg-red-50 rounded-lg my-2">
                    <p className="">Microfone Indisponível</p>
                    <p className="text-sm">
                      Parece que você não tem acesso ao microfone :C
                    </p>
                    <p className="text-sm">
                      Verifique as configurações do seu dispositivo e do seu
                      navegador - para prosseguir é necessário o acesso ao
                      microfone.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-8 pl-9">
            <p className="text-gray-600 font-medium">Instruções:</p>
            <p>
              - Ler a pergunta
              <br />
              - Gravar a resposta
              <br />
              - Encerrar a gravação
              <br />
              - Ouvir a própria gravação
              <br />
              - Excluir gravação para re-gravar
              <br />
              - Salvar a resposta
              <br />
              - Ir para a próxima pergunta
              <br />
              - Finalizar a entrevista
              <br />
            </p>
          </div>

          <div className="mt-8 text-left pl-9">
            <Link
              to={`/interview/${interviewId}`}
              className="mt-8 inline-flex items-center leading-none text-white bg-indigo-500 border-0 py-4 px-8 focus:outline-none hover:bg-indigo-600 rounded text-xl"
            >
              Começar Entrevista
              <PiPlayFill className="ml-4" />
            </Link>
          </div>
        </div>

        {/* <div className="w-full max-w-2xl border-2 border-gray-300 px-2 sm:px-6 mb-8 py-4 rounded-lg bg-white mx-auto">
          <div
            className="w-full h-full border border-black flex justify-center items-center"
            style={{ minHeight: 300 }}
          >
            <span className="text-opacity-30 text-xl text-black">
              &lt; Audio Visualizer &gt;
            </span>
          </div>
        </div>

        <div className="w-full flex-grow max-w-2xl xl:max-w-none mb-8 xl:pl-8 mx-auto">
          
        </div> */}
        {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600/edf2f7/a5afbd"
          />
        </div> */}
      </section>
    </div>
  );
}
