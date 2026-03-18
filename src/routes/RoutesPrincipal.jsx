import { Route, Routes } from "react-router-dom";
import PagesLayout from "../layout/PagesLayout";
import HomeScreen from "../views/HomeScreen";
import ReservaScreen from "../views/ReservaScreen";
import TiendaScreen from "../views/TiendaScreen";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";
import CartScreen from "../views/CartScreen";
import AdminScreen from "../views/AdminScreen";
import Perfil from "../components/perfil/Perfil";
import Success from "../components/success";
import Error404Screen from "../views/Error404Screen";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import GuestRoute from "./GuestRoute";

const RoutesPrincipal = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="reserva" element={<ReservaScreen />} />
        <Route path="tienda" element={<TiendaScreen />} />

        <Route element={<GuestRoute />}>
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
        </Route>

        <Route element={<UserRoute />}>
          <Route path="perfil/:seccion" element={<Perfil />} />
          <Route path="cart/:productoId?" element={<CartScreen />} />
          <Route path="success" element={<Success />} />
          <Route path="failure" element={<h2>Hubo un error con el pago.</h2>} />
          <Route
            path="pending"
            element={<h2>Tu pago está pendiente de aprobación.</h2>}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="admin/:seccion?" element={<AdminScreen />} />
        </Route>
      </Route>
      <Route path="*" element={<Error404Screen />} />
    </Routes>
  );
};

export default RoutesPrincipal;
