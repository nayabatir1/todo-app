import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TodosProvider } from "../hooks/TodosContext.provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TodosProvider>
      <div className="max-w-[500px] mx-auto h-[100dvh] flex flex-col text-white w-screen bg-black ">
        <Component {...pageProps} />
      </div>
    </TodosProvider>
  );
}
