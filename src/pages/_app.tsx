// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/globals.css";
import "../styles/style.css";

import ClientOnly from "@/components/ClientOnly";



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientOnly>
      <Router>
        <Component {...pageProps} />
      </Router>
    </ClientOnly>
  );
}

export default MyApp;
