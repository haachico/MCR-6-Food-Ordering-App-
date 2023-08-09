import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  RestaurantsContext,
  RestaurantsContextProvider
} from "./useContext/RestaurantsContext";

import App from "./App";

export { RestaurantsContext };

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <RestaurantsContextProvider>
        <App />
      </RestaurantsContextProvider>
    </BrowserRouter>
  </StrictMode>
);
