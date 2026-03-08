import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoutesPrincipal from "./routes/RoutesPrincipal";
import LoginScreen from "./views/LoginScreen";
import "./assets/css/root.css";
import RegisterScreen from "./views/RegisterScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
      <RoutesPrincipal />
    </BrowserRouter>
  );
}

export default App;
