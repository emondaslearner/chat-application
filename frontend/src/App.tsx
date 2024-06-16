import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "./components/shared/Spinner";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import { useSystemTheme } from "./hooks";
import { AppDispatch } from "./store/store";
import { changeMode } from "./store/actions/themeConfig";

export const queryClient = new QueryClient();

function App() {
  const systemTheme = useSystemTheme();
  const dispatch: AppDispatch = useDispatch();

  const localColor = localStorage.getItem("themeColor");

  const themeColor =
    localColor === "dark" || localColor === "light" ? localColor : systemTheme;

  // change mode
  const themeConfig = useSelector((state: any) => state.themeConfig);

  useEffect(() => {
    if (themeConfig.mode !== themeColor) {
      dispatch(changeMode(themeColor));
      localStorage.setItem("themeColor", themeColor);
    }

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
      <ToastContainer limit={2} />
    </div>
  );
}

export default App;
