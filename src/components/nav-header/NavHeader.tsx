import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import digaiLogo from "/digai-bola-azul.jpg";

export default function NavHeader() {
  return (
    <>
      <header className="text-gray-700 body-font border-b border-gray-200 bg-white">
        <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 leading-none"
          >
            <img
              src={digaiLogo}
              className="logo h-16 mr-6 rounded-full"
              alt="Digai logo"
            />
            <span className="text-xl leading-none">Annibal Challenge</span>
          </Link>

          <nav className="md:ml-auto gap-8 flex flex-wrap h-12 items-center text-base justify-center">
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
    </>
  );
}
