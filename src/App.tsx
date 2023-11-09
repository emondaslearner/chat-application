import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { NextUIProvider } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";


function App() {

  // change mode
  const themeConfig = useSelector((state: any) => state.themeConfig)
  useEffect(() => {
    if(themeConfig.mode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [themeConfig.mode])


  return (
    <div className="App">
      <BrowserRouter>
        <NextUIProvider>
          <Router />
        </NextUIProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
