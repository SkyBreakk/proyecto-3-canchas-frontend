function CanchaDeleteModal({ showDeleteCanchaModal, closeDeleteCanchaModal, borrarCancha, nameCancha }) {
    if (!showDeleteCanchaModal) { return null }
    return <section className="background-canchaDeleteModal">
        <div className="window-canchaDeleteModal rounded p-3">
            <div className="p-3">
                <p className="fw-6">¿Desea inhabilitar la cancha {nameCancha}?</p>
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button className="acceptBtn-deleteCanchaModal"
                    onClick={() => {
                        borrarCancha();
                        closeDeleteCanchaModal();
                    }}
                >Aceptar</button>
                <button className="cancelBtn-deleteCanchaModal"
                    onClick={closeDeleteCanchaModal}
                >Cancelar</button>
            </div>
        </div>
    </section>
};
export default CanchaDeleteModal