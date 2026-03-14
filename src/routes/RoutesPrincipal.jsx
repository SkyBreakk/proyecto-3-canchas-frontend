import { Route, Routes } from "react-router-dom";
import PagesLayout from "../layout/PagesLayout";
import HomeScreen from "../views/HomeScreen";
import ReservaScreen from "../views/ReservaScreen";
import TiendaScreen from "../views/TiendaScreen";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import AdminScreen from "../views/AdminScreen";

const RoutesPrincipal = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="reserva" element={<ReservaScreen />} />
        <Route path="tienda" element={<TiendaScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route path="/admin/:seccion?" element={<AdminScreen />} />
      </Route>
    </Routes>
  );
};

export default RoutesPrincipal;
