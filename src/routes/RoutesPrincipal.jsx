import { Route, Routes } from "react-router-dom";
import PagesLayout from "../layout/PagesLayout";
import HomeScreen from "../views/HomeScreen";
import ReservaScreen from "../views/ReservaScreen";
import TiendaScreen from "../views/TiendaScreen";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import CartScreen from "../views/CartScreen";
import AdminScreen from "../views/AdminScreen";
import AdminRoute from "./AdminRoute";

const RoutesPrincipal = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="reserva" element={<ReservaScreen />} />
        <Route path="tienda" element={<TiendaScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/cart" element={<CartScreen />} />

        <Route element={<AdminRoute />}>
          <Route path="admin/:seccion?" element={<AdminScreen />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesPrincipal;
