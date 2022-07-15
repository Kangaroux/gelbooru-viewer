import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { Store } from "./store";

export const store = new Store();

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
