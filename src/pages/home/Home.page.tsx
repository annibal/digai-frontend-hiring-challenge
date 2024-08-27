import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

// export interface IHomePage {
//   prop?: string | null;
// }

// function HomePage({ prop }: IHomePage) {
function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
        <Link to={`contacts/2`}>Your Friend</Link>
        <Link to={`contacts/2`}>Your Friend</Link>
        </p>
        <p>
          Edit <code>src/components/AppRoot/AppRoot.tsx</code> and save to test
          HMR
        </p>
        <p>
          <a href={`interview-setup/${uuidv4()}`}>
            Interview Preparation and Setup.
          </a><br />
          <a href={`interview/${uuidv4()}`}>
            Answering the Questions.
          </a><br />
          <a href={`interview-after/${uuidv4()}`}>
            Overview of what you did.
          </a><br />
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default HomePage;
