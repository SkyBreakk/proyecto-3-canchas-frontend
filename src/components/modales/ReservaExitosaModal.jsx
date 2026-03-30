import React from "react";

const ReservaExitosaModal = ({ datos, cerrarModal }) => {
  const { canchaNombre, fecha, hora, horas, total, senia } = datos;
  return (
    <div className="modal-body text-center p-5">
      <i
        className="bi bi-check-circle-fill text-success"
        style={{ fontSize: "5rem" }}
      ></i>
      <h2 className="fw-bold text-success mt-3">¡Reserva Confirmada!</h2>
      <p className="fs-5 text-light mt-3">
        Tu turno para la <strong>{canchaNombre}</strong> el día{" "}
        <strong>{fecha}</strong> a las <strong>{hora}</strong> fue guardado con
        éxito.
      </p>
      <div className="bg-dark p-3 rounded-3 mt-4 border border-secondary">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary-custom">Duración:</span>
          <span className="text-white">{horas} hora(s)</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary-custom">Total:</span>
          <span className="text-white">${total.toLocaleString("es-AR")}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-secondary-custom">Seña:</span>
          <span className="text-success">${senia.toLocaleString("es-AR")}</span>
        </div>
      </div>
      <div className="bg-dark p-3 rounded-3 mt-4 border border-secondary text-secondary-custom">
        <i className="bi bi-info-circle me-2"></i>
        Recordá que podés abonar en el local o pagar por adelantado desde tu
        perfil.
      </div>
      <button
        type="button"
        className="btn btn-outline-success btn-lg w-100 mt-4 rounded-pill"
        data-bs-dismiss="modal"
        onClick={cerrarModal}
      >
        Entendido, cerrar
      </button>
    </div>
  );
};

export default ReservaExitosaModal;
