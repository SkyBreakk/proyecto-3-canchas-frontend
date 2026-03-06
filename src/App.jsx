import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoutesPrincipal from "./routes/RoutesPrincipal";
import LoginScreen from "./views/LoginScreen";
import "./assets/css/root.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
      <RoutesPrincipal />
    </BrowserRouter>
  );
}

export default App;
