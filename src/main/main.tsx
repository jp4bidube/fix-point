import { ThemeProvider } from "@/components/theme-provider";
import { PublicRoutes } from "@/presentation/routes/public-routes.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { ProviderSystem } from "@/presentation/Provider/ProviderSystem";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderSystem>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <PublicRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </ProviderSystem>
  </StrictMode>
);
