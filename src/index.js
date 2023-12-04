// eslint-disable-next-line no-unused-vars
import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"

// eslint-disable-next-line no-unused-vars
import App from "./App"

const root = createRoot(document.getElementById("root"))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
