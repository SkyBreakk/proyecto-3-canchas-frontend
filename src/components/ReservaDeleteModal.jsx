function ReservaDeleteModal({ showDeleteReservaModal, closeDeleteReservaModal, borrarReserva }) {
    if (!showDeleteReservaModal) { return null }
    return <section className="background-reservaDeleteModal">
        <div className="window-reservaDeleteModal rounded p-3">
            <div className="p-3">
                <p className="fw-6">¿Desea borrar la reserva?</p>
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button className="acceptBtn-deleteReservaModal"
                    onClick={() => {
                        borrarReserva();
                        closeDeleteReservaModal();
                    }}
                >Aceptar</button>
                <button className="cancelBtn-deleteReservaModal"
                    onClick={closeDeleteReservaModal}
                >Cancelar</button>
            </div>
        </div>
    </section>
};
export default ReservaDeleteModal