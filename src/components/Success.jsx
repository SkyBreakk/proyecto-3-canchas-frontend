import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { apiReserva } from "../helpers/reserva"; 

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("Procesando pago...");

  useEffect(() => {
    const confirmarPago = async () => {
      const status = searchParams.get("status");
      const reservaId = searchParams.get("external_reference");

      if (status === "approved" && reservaId) {
        try {
          const res = await apiReserva.updatePago(reservaId, {
            estadoPago: "Pagado",
            metodoPago: "MercadoPago",
          });

          if (res.ok) {
            setEstado("¡Pago acreditado con éxito! Redirigiendo a tus reservas...");
            setTimeout(() => {
              navigate("/perfil/reservas");
            }, 3000);
          }
        } catch (error) {
          setEstado("Error al actualizar la base de datos.");
        }
      } else {
        setEstado("El pago no fue aprobado.");
      }
    };

    confirmarPago();
  }, [searchParams, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="text-center p-5 border border-success rounded-4 bg-dark bg-opacity-50">
        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4rem" }}></i>
        <h2 className="mt-4 neon-text">¡Pago Exitoso!</h2>
        <p className="lead">{estado}</p>
        <Link to="/" className="btn btn-outline-success mt-3">Volver al Inicio</Link>
      </div>
    </div>
  );
};

export default Success;