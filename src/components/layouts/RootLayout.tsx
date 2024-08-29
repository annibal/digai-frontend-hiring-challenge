import { v4 as uuidv4 } from "uuid";
import { Link, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <header className="text-gray-700 body-font border-b border-gray-200 bg-white">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">DIGAI:ANNIBAL</span>
          </Link>

          <nav className="md:ml-auto gap-8 flex flex-wrap items-center text-base justify-center">
            <Link
              to={`/interview-setup/${uuidv4()}`}
              className="hover:text-gray-900"
            >
              Preparação
            </Link>
            <Link
              to={`/interview/${uuidv4()}`}
              className="hover:text-gray-900"
            >
              Entrevista
            </Link>
            <Link
              to={`/interview-after/${uuidv4()}`}
              className="hover:text-gray-900"
            >
              Respostas
            </Link>
          </nav>
        </div>
      </header>
      <main className="text-gray-700 body-font container mx-auto px-2 sm:px-5 py-24">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
