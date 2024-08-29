import { useRouteError } from "react-router-dom";
import RootLayout from "@/components/layouts/RootLayout";
import NavHeader from "@/components/nav-header/NavHeader";

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
    <RootLayout header={<NavHeader />}>
      <h1 className="font-bold">Opa</h1>
      <p>Ocorreu um erro inesperado.</p>
      <div className="mt-4 pb-2 pt-1 px-2 border border-gray-300 bg-white rounded-lg w-full max-w-md inline-block">
        <p className="text-sm mb-2">Mensagem de erro:</p>
        <div className="py-2 px-2 bg-pink-50 rounded-md font-mono text-gray-700">
          {error?.statusText || error?.message}
        </div>
      </div>
    </RootLayout>
  );
}
