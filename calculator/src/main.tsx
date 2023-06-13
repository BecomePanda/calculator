import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import theme from "./Style/theme.tsx";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
