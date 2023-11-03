import React from "react";
import { createRoot } from "react-dom/client";
import Mikrofrontend from "./Mikrofrontend";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

if (process.env.NODE_ENV === "development") {
  const msw = await import("./mocks/browser");
  await msw.worker.start({ onUnhandledRequest: "bypass" });
  msw.worker.listHandlers().forEach((handler) => {
    console.log(handler.info.header);
  });
}

root.render(
  <React.StrictMode>
    <Mikrofrontend />
  </React.StrictMode>,
);
