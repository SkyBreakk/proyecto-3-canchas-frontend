import { Route, Routes } from "react-router-dom";
import PagesLayout from "../layout/PagesLayout";
import HomeScreen from "../views/HomeScreen";
import ReservaScreen from "../views/ReservaScreen";
import TiendaScreen from "../views/TiendaScreen";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";

import CanchasAdminScreen from "../views/CanchasAdminScreen";
import ProductoAdminScreen from "../views/ProductoAdminScreen";
import ReservaAdminScreen from "../views/ReservaAdminScreen";
import UserAdminScreen from "../views/UserAdminScreen";
import CategoriaAdminScreen from "../views/CategoriaAdminScreen";

const RoutesPrincipal = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="reserva" element={<ReservaScreen />} />
        <Route path="tienda" element={<TiendaScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
          
        <Route path="/admin/cancha" element={<CanchasAdminScreen />} />
        <Route path="/admin/producto" element={<ProductoAdminScreen />} />
        <Route path="/admin/reserva" element={<ReservaAdminScreen />} />
        <Route path="/admin/user" element={<UserAdminScreen />} />
        <Route path="/admin/categoria" element={<CategoriaAdminScreen />} />
      </Route>
    </Routes>
  );
};

export default RoutesPrincipal;
