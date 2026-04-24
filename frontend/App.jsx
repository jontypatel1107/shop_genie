import { Navigate, Route, Routes } from "react-router-dom";
import CreateAccountPage from "./pages/CreateAccountPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import {
  CREATE_ACCOUNT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  VERIFY_ACCOUNT_ROUTE,
} from "./routes";

export default function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path={HOME_ROUTE} />
      <Route element={<LoginPage />} path={LOGIN_ROUTE} />
      <Route element={<CreateAccountPage />} path={CREATE_ACCOUNT_ROUTE} />
      <Route element={<VerifyAccountPage />} path={VERIFY_ACCOUNT_ROUTE} />
      <Route element={<ResetPasswordPage />} path={RESET_PASSWORD_ROUTE} />
      <Route element={<Navigate replace to={HOME_ROUTE} />} path="*" />
    </Routes>
  );
}
