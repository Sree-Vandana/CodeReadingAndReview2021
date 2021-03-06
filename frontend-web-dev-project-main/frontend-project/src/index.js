import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

/**
 * Entry point of the Movie App
 * @returns App UI component
 */
function Main() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
