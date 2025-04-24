import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ChakraProvider, createSystem, defineConfig } from "@chakra-ui/react";
import "./index.css";
import App from "./App";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./translation";
import "antd/dist/antd.min.css";
import { register } from "./serviceWorkerRegistration";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(config);

const AppWrapper = () => {
  const navigate = useNavigate();
  const [appInstance, setAppInstance] = useState<App | null>(null);

  useEffect(() => {
    setAppInstance(new App(navigate));
  }, [navigate]);

  return <>{appInstance && appInstance.View()}</>;
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider value={system}>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}></I18nextProvider>

      <AppWrapper />
    </BrowserRouter>
  </ChakraProvider>,
);

register({
  onUpdate: (registration: {
    waiting: { postMessage: (arg0: { type: string }) => void };
  }) => {
    if (registration && registration.waiting) {
      console.log("New version available!");

      registration.waiting.postMessage({ type: "SKIP_WAITING" });

      window.location.reload();
    }
  },
  onSuccess: (registration: any) => {
    console.log("Service worker registered successfully:", registration);
  },
});
