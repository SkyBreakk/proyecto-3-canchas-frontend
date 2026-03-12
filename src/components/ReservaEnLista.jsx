import { useState } from "react";
import ReservaDeleteModal from "../components/ReservaDeleteModal"

function ReservaEnLista({ reserva, borrarReserva }) {

    const [showDeleteReservaModal, setShowDeleteReservaModal] = useState(false);

    return <div className="row my-2 py-2 px-2 rounded reservaRow-reservaAdminScreen">

        <div className="col-2">
            <div className="text-truncate">
                {reserva.usuario?.username}
            </div>
        </div>

        <div className="col-2">
            <div className="text-truncate">
                {reserva.cancha?.nombre}
            </div>
        </div>

        <div className="col-2">
            <div className="text-truncate">
                {reserva.senia}
            </div>
        </div>

        <div className="col-2">
            <div className="text-truncate">
                {reserva.fecha}
            </div>
        </div>

        <div className="col-2">
            <div className="text-truncate">
                {reserva.horas}
            </div>
        </div>

        <div className="col-2">
            <div className="container d-flex align-items-center gap-2">

                <button className="btn btn-sm btnDelete-reservaDeleteModal"
                    onClick={() => { setShowDeleteReservaModal(true) }}
                    type="button">
                    <i className="bi bi-x-lg"></i>
                </button>

                <ReservaDeleteModal showDeleteReservaModal={showDeleteReservaModal}
                    closeDeleteReservaModal={() => setShowDeleteReservaModal(false)}
                    borrarReserva={() => {
                        borrarReserva(reserva);
                        setShowDeleteReservaModal(false);
                    }} />
            </div>
        </div>
    </div>
};
export default ReservaEnLista