import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoot from "./AppRoot";
import "./index.css";

export default function main(App: () => JSX.Element) {
  const rootElmId = "digai-nibol";
  const rootElement = document.getElementById(rootElmId);

  if (!rootElement) {
    throw new ReferenceError(
      `Failed to find element "${rootElmId}" to render Digai-Nibol-App into.`
    );
  }

  const reactRoot = createRoot(rootElement);
  reactRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  return reactRoot;
}

main(AppRoot);
