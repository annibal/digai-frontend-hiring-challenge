import { Link, useParams } from "react-router-dom";
import {
  PiMicrophoneFill,
  PiSpeakerHighFill,
  PiPlayFill,
  PiEarSlash,
} from "react-icons/pi";

export default function InterviewVestibulumPage() {
  const { interviewId } = useParams();

  return (
    <>
      <h1 className="mb-8 title-font text-3xl font-medium text-gray-900 max-w-2xl xl:max-w-none mx-auto">
        Preparação para a Entrevista
      </h1>
      <section className="pb-24 flex xl:flex-row flex-col justify-center">
        <div className="w-full max-w-2xl border-2 border-gray-300 px-2 sm:px-6 mb-8 py-4 rounded-lg bg-white mx-auto">
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
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 pl-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                  id="input-device"
                  name="input-device"
                >
                  <option
                    value=""
                    disabled
                    className="text-opacity-30 text-black"
                  >
                    - selecione -
                  </option>
                  <option value="M">Microfone</option>
                  <option value="R">Realtek Audio</option>
                  <option value="A">Audio Jack</option>
                  <option value="H">Headset</option>
                </select>

                {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <PiCaretDownFill />
                </div> */}
              </div>
              <div className="pl-9 py-3 flex items-center">
                <button className="mr-4 inline-flex text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg">
                  <PiPlayFill />
                </button>
                <p className="">Testar áudio</p>
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
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 pl-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                  id="input-device"
                  name="input-device"
                >
                  <option
                    value=""
                    disabled
                    className="text-opacity-30 text-black"
                  >
                    - selecione -
                  </option>
                  <option value="M">Speaker</option>
                  <option value="R">Realtek high definition Audio</option>
                  <option value="A">External Audio Jack</option>
                  <option value="H">Headset 1</option>
                  <option value="H">Headset 2</option>
                </select>

                {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <PiCaretDownFill />
                </div> */}
              </div>
              <div className="pl-9 py-3 flex items-center">
                <button className="mr-4 inline-flex text-indigo-700 bg-indigo-50 border border-indigo-700 py-2 px-6 focus:outline-none hover:bg-indigo-100 rounded text-lg">
                  <PiEarSlash />
                </button>
                <p className="">Escutar o dispositivo</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-600 font-medium">
              Instruções:
            </p>
            <p>
              - Ler a pergunta<br />
              - Gravar a resposta<br />
              - Encerrar a gravação<br />
              - Ouvir a própria gravação<br />
              - Excluir gravação para re-gravar<br />
              - Salvar a resposta<br />
              - Ir para a próxima pergunta<br />
              - Finalizar a entrevista<br />
            </p>
          </div>
          
          <div className="mt-8 text-right">
            <Link
              to={`/interview/${interviewId}`}
              className="mt-8 inline-flex items-center leading-none text-white bg-indigo-500 border-0 py-4 px-8 focus:outline-none hover:bg-indigo-600 rounded text-xl"
            >
              Começar Entrevista
              <PiPlayFill className="ml-4" />
            </Link>
          </div>
        </div>
        {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600/edf2f7/a5afbd"
          />
        </div> */}
      </section>
    </>
  );
}
