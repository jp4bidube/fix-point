import App from "@/App";
import { Route, Routes } from "react-router";

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
}
