// ConfirmModal.js
function ConfirmModal({ show, close, onConfirm, message }) {
  if (!show) return null;
  return (
    <div className="modal-overlay-custom">
      <div className="modal-window-custom rounded p-4 text-center text-light">
        <p className="fs-5">{message}</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn-zona5-accept" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="btn-zona5-cancel" onClick={close}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;
