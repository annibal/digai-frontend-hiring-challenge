import { v4 as uuidv4 } from "uuid";
import { Link, Outlet } from "react-router-dom";
import digaiLogo from "../../assets/digai-logo.svg";

function RootLayout() {
  return (
    <>
      <header className="text-gray-700 body-font border-b border-gray-200 bg-white">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 leading-none"
          >
            <img src={digaiLogo} className="logo h-8 mr-6" alt="Digai logo" />
            <span className="mr-4 text-xl leading-none">:</span>
            <span className="text-xl leading-none">Annibal Challenge</span>
          </Link>

          <nav className="md:ml-auto gap-8 flex flex-wrap items-center text-base justify-center">
            <Link
              to={`/interview-setup/${uuidv4()}`}
              className="hover:text-gray-900"
            >
              Preparação
            </Link>
            <Link to={`/interview/${uuidv4()}`} className="hover:text-gray-900">
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
