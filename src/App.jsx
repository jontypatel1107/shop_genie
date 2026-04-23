import { useEffect, useState } from "react";
import CreateAccountPage from "./pages/CreateAccountPage";
import LandingPage from "./pages/LandingPage";
import { CREATE_ACCOUNT_ROUTE, getRoute } from "./routes";

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute());

    window.addEventListener("hashchange", handleHashChange);

    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (route === CREATE_ACCOUNT_ROUTE) {
    return <CreateAccountPage />;
  }

  return <LandingPage />;
}
