import React from "react";
import { createRoot } from "react-dom/client";
import { fetchMostPopularTags } from "./api";
import { App } from "./components/App";
import { Store } from "./store";

export const store = new Store();
fetchMostPopularTags().then((resp) =>
    store.setMostPopularTags(resp.suggestions)
);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
