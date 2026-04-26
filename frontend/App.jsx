import { Navigate, Route, Routes } from "react-router-dom";
import CreateAccountPage from "./pages/CreateAccountPage";
import {
  AnalyticsPage,
  BuilderPage,
  CategoryPage,
  DashboardPage,
  HelpPage,
  NewProductPage,
  OrdersPage,
  ProductsPage,
  PublishPage,
  SettingsPage,
  StoreSetupPage,
  ThemeSelectionPage,
} from "./pages/DashboardPages";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import StoreView from "./pages/StoreView";
import {
  ANALYTICS_ROUTE,
  BUILDER_ROUTE,
  CATEGORY_ROUTE,
  CREATE_ACCOUNT_ROUTE,
  DASHBOARD_ROUTE,
  HELP_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NEW_PRODUCT_ROUTE,
  ORDERS_ROUTE,
  PRODUCTS_ROUTE,
  PUBLISH_ROUTE,
  RESET_PASSWORD_ROUTE,
  SETTINGS_ROUTE,
  STORE_SETUP_ROUTE,
  THEME_ROUTE,
  VERIFY_ACCOUNT_ROUTE,
  STORE_VIEW_ROUTE,
} from "./routes";

export default function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path={HOME_ROUTE} />
      <Route element={<LoginPage />} path={LOGIN_ROUTE} />
      <Route element={<CreateAccountPage />} path={CREATE_ACCOUNT_ROUTE} />
      <Route element={<VerifyAccountPage />} path={VERIFY_ACCOUNT_ROUTE} />
      <Route element={<ResetPasswordPage />} path={RESET_PASSWORD_ROUTE} />
      <Route element={<CategoryPage />} path={CATEGORY_ROUTE} />
      <Route element={<StoreSetupPage />} path={STORE_SETUP_ROUTE} />
      <Route element={<ThemeSelectionPage />} path={THEME_ROUTE} />
      <Route element={<DashboardPage />} path={DASHBOARD_ROUTE} />
      <Route element={<ProductsPage />} path={PRODUCTS_ROUTE} />
      <Route element={<NewProductPage />} path={NEW_PRODUCT_ROUTE} />
      <Route element={<BuilderPage />} path={BUILDER_ROUTE} />
      <Route element={<OrdersPage />} path={ORDERS_ROUTE} />
      <Route element={<AnalyticsPage />} path={ANALYTICS_ROUTE} />
      <Route element={<SettingsPage />} path={SETTINGS_ROUTE} />
      <Route element={<PublishPage />} path={PUBLISH_ROUTE} />
      <Route element={<HelpPage />} path={HELP_ROUTE} />
      <Route element={<StoreView />} path={STORE_VIEW_ROUTE} />
      <Route element={<Navigate replace to={HOME_ROUTE} />} path="*" />
    </Routes>
  );
}
