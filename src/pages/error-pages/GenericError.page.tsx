import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import digaiLogo from "../../assets/digai-logo.svg";

export default function GenericErrorPage() {
  let error = useRouteError() as Record<
    string,
    string | number | null | undefined
  >;
  console.error(error);

  if (!error) {
    error = {
      message: "Unknown Error",
    };
  }

  return (
    <div
      className="container mx-auto flex flex-wrap p-5 flex-col items-center"
      id="error-page"
    >
      <div className="mb-4 pb-4 px-2 w-full flex justify-center border-b border-gray-300">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 leading-none"
        >
          <img src={digaiLogo} className="logo h-8 mr-6" alt="Digai logo" />
          <span className="mr-4 text-xl leading-none">:</span>
          <span className="text-xl leading-none">Annibal Challenge</span>
        </Link>
      </div>
      <h1 className="font-bold">Opa</h1>
      <p>Ocorreu um erro inesperado.</p>
      <div className="mt-4 pb-2 pt-1 px-2 border border-gray-300 bg-white rounded-lg w-full max-w-md inline-block">
        <p className="text-sm mb-2">Mensagem de erro:</p>
        <div className="py-2 px-2 bg-pink-50 rounded-md font-mono text-gray-700">
          {error?.statusText || error?.message}
        </div>
      </div>
    </div>
  );
}
