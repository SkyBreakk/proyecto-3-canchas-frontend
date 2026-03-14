function ConfirmModal({ show, close, onConfirm, message }) {
  if (!show) return null;
  return (
    <div className="modal-custom-overlay">
      <div
        className="modal-content-zona5 rounded p-4 text-center shadow-lg"
        style={{ maxWidth: "400px" }}
      >
        <i className="bi bi-exclamation-triangle text-warning display-4 mb-3"></i>
        <p className="fs-5 fw-bold mb-4">{message}</p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-light px-4" onClick={close}>
            Cancelar
          </button>
          <button className="btn btn-danger px-4" onClick={onConfirm}>
            Confirmar Borrado
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;
