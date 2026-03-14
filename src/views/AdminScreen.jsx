import { useParams, useNavigate } from "react-router-dom";
import CanchasAdmin from "../components/admin/CanchasAdmin";
import ReservaAdmin from "../components/admin/ReservaAdmin";
import ProductoAdmin from "../components/admin/ProductoAdmin";
import CategoriaAdmin from "../components/admin/CategoriaAdmin";
import UserAdmin from "../components/admin/UserAdmin";
import "../assets/css/admin.css";

const DashboardAdmin = () => {
  const { seccion } = useParams();
  const navigate = useNavigate();

  // Diccionario de componentes
  const views = {
    cancha: <CanchasAdmin />,
    reserva: <ReservaAdmin />,
    producto: <ProductoAdmin />,
    categoria: <CategoriaAdmin />,
    usuario: <UserAdmin />,
  };

  return (
    <section className="background-adminScreen p-4">
      <div className="container containerTable-adminScreen p-4">
        {/* Selector de Modos (Botones) */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {Object.keys(views).map((key) => (
            <button
              key={key}
              onClick={() => navigate(`/admin/${key}`)}
              className={`btn btn-sm ${seccion === key ? "btn-neon" : "btn-outline-secondary"}`}
              style={{ textTransform: "capitalize" }}
            >
              Gestión {key}s
            </button>
          ))}
        </div>

        {/* Renderizado Dinámico */}
        <div className="fade-in">
          {views[seccion] || (
            <div className="text-center p-5">
              <h2 className="neon-text">
                Selecciona una sección administrativa
              </h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardAdmin;
