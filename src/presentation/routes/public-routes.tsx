import Page from "@/app/dashboard/page";
import LoginPage from "@/app/login/page";
import { Route, Routes } from "react-router";

export function PublicRoutes() {
  return (
    <Routes>
      <Route index path="/login" element={<LoginPage />} />
      <Route path="/" element={<Page />} />
    </Routes>
  );
}
