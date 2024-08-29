import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="pb-24 flex md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Faça sua entrevista gravando áudio!
          </h1>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex justify-center">
            <Link
              to={`/interview-setup/${uuidv4()}`}
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Página: Preparação
            </Link>
            <Link
              to={`/interview/${uuidv4()}`}
              className="ml-4 inline-flex bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
            >
              Página: Entrevista
            </Link>
            <Link
              to={`/interview-after/${uuidv4()}`}
              className="ml-4 inline-flex bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
            >
              Página: Resultado
            </Link>
          </div>
        </div>

        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600/edf2f7/a5afbd"
          />
        </div>
      </section>

      <section className="pb-24 flex md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <div className="flex items-center gap-4">
            <a href="https://vitejs.dev" target="vite">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="react">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <h1 className="text-3xl font-bold leading-none">Vite + React</h1>
          </div>
          <div className="card">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="my-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
            >
              Count is&nbsp;<b>{count}</b>
            </button>
            <p>
              Edit <code>src/components/AppRoot/AppRoot.tsx</code> and save to
              test HMR
            </p>
            <p></p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </section>
    </>
  );
}
