import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";
import { PublicRoutes } from "./routes/public-routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PublicRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
