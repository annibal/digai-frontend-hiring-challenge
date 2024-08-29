import { Link, useParams } from "react-router-dom";
import {
  PiPlayPauseFill,
  PiArrowsClockwiseBold,
  PiRecordFill,
} from "react-icons/pi";

export default function InterviewAfterPage() {
  return (
    <>
      <section className="flex flex-col">
        <h1 className="mb-12 title-font text-3xl font-medium text-gray-900">
          Respostas Enviadas
        </h1>

        <ul className="flex flex-wrap gap-4 md:gap-8">
          {[
            "Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm?",
            "Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. Man bun next level coloring book skateboard?",
            "Kitsch keffiyeh master cleanse direct trade indigo juice before they sold out gentrify plaid gastropub normcore?",
          ].map((question, idx) => (
            <li className="block w-full max-w-lg border-2 border-gray-300 px-3 sm:px-6 py-4 rounded-lg bg-white" key={idx}>
              <div className="flex">
                <div className="flex-shrink-0 flex-grow-0 whitespace-nowrap font-bold text-indigo-500 font-mono w-16 text-right hidden md:block">
                  P 0{idx+1}:&nbsp;
                </div>
                <p className="flex-grow text-md text-gray-900 font-medium title-font mb-2 mr-3 leading-tight">
                  {question}
                </p>

                <div className="flex-shrink-0 flex-grow-0 whitespace-nowrap">
                  <div className="inline-block text-sm font-mono md:w-16 w-12 text-center border border-pink-800 bg-pink-200 text-pink-800 rounded-lg">
                    03:00
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0 flex-grow-0 whitespace-nowrap font-bold text-indigo-500 font-mono w-16 text-right hidden md:block">
                  R 0{idx+1}:&nbsp;
                </div>
                <div className="w-full flex-grow border border-gray-700 p-5 rounded-lg mr-3"></div>

                <div className="flex-shrink-0 flex-grow-0 whitespace-nowrap">
                  <div className="inline-block text-sm font-mono md:w-16 w-12 text-center border border-blue-800 bg-blue-200 text-blue-800 rounded-lg">
                    01:47
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0 flex-grow-0 w-16 hidden md:block"></div>
                
                <div className="flex-grow w-full mt-1 flex items-start justify-between mr-3">
                  <button className="inline-flex items-center justify-center text-indigo-700 bg-indigo-50 border border-indigo-700 py-2 w-20 focus:outline-none hover:bg-indigo-100 rounded text-lg">
                    <PiPlayPauseFill />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 text-white bg-pink-600 border border-pink-600 py-2 w-20 focus:outline-none hover:bg-pink-700 hover:border-pink-700 rounded text-lg">
                    <PiRecordFill />
                    <PiArrowsClockwiseBold />
                  </button>
                </div>

                <div className="flex-shrink-0 flex-grow-0 md:w-16 w-12"></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
