import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

function App() {
  return (
    <div className="max-w-[1800px] mx-auto relative">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
