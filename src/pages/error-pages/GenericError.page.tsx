import { useRouteError } from "react-router-dom";

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
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}
