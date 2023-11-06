import { QueryClient, QueryClientProvider } from "react-query";
import { initializeAmplitude } from "./utils/amplitude";
import LanguageProvider from "./providers/LanguageProvider";
import App from "./App";
const Mikrofrontend = () => {
  initializeAmplitude();

  return (
    <LanguageProvider>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default Mikrofrontend;
