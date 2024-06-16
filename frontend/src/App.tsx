import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "./components/shared/Spinner";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import 'react-toastify/dist/ReactToastify.css';

export const queryClient = new QueryClient();

function App() {
  // change mode
  const themeConfig = useSelector((state: any) => state.themeConfig);
  useEffect(() => {
    if (themeConfig.mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [themeConfig.mode]);

  // components
  const Components = lazy(() => import("./Router"));

  return (
    <div className="max-w-[1800px] mx-auto relative">
      <BrowserRouter>
        <NextUIProvider>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Spinner />}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Components />
              </LocalizationProvider>
            </Suspense>
          </QueryClientProvider>
        </NextUIProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
