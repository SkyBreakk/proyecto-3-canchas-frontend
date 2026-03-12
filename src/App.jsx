import { BrowserRouter } from "react-router-dom";
import RoutesPrincipal from "./routes/RoutesPrincipal";
import "./assets/css/root.css";

function App() {
  return (
    <BrowserRouter>
      <RoutesPrincipal />
    </BrowserRouter>
  );
}

export default App;
