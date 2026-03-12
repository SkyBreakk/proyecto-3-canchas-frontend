import { useState } from "react";
import CanchaDeleteModal from "./CanchaDeleteModal";
import CanchaEditModal from "./CanchaEditModal";

function CanchaEnLista({ cancha, actualizarCancha, borrarCancha }) {
    const [showDeleteCanchaModal, setShowDeleteCanchaModal] = useState(false);
    const [showEditCanchaModal, setShowEditCanchaModal] = useState(false);

    const modificarCancha = (canchaValue) => {
        actualizarCancha(canchaValue);
    };

    return <div className="row my-2 py-2 px-2 rounded canchasRow-canchasAdminScreen">
        <div className="col-2">
            <div className="imagen-canchasAdminScreen">
                <img src={cancha.img} alt="Imagen_Cancha" />
            </div>
        </div>
        <div className="col-2">
            <div className="text-truncate">
                {cancha.nombre}
            </div>
        </div>
        <div className="col-4">
            <div className="text-truncate">
                {cancha.descripcion}
            </div>
        </div>
        <div className="col-2">
            <div className="text-truncate">
                {cancha.precio}
            </div>
        </div>
        <div className="col-2">
            <div className="container d-flex justify-content-center align-items-center gap-2">

                <button className="btn btn-sm btnEditCancha"
                    onClick={() => { setShowEditCanchaModal(true) }}
                    type="button">
                    <i className="bi bi-pencil-square"></i>
                </button>

                <button className="btn btn-sm btnDeleteCancha"
                    onClick={() => { setShowDeleteCanchaModal(true) }}
                    type="button">
                    <i className="bi bi-x-lg"></i>
                </button>
                <CanchaEditModal showEditCanchaModal={showEditCanchaModal}
                    closeEditCanchaModal={() => setShowEditCanchaModal(false)}
                    modificarCancha={modificarCancha}
                    cancha={cancha} />
                <CanchaDeleteModal showDeleteCanchaModal={showDeleteCanchaModal}
                    closeDeleteCanchaModal={() => setShowDeleteCanchaModal(false)}
                    borrarCancha={() => {
                        borrarCancha(cancha);
                        setShowDeleteCanchaModal(false);
                    }}
                    nameCancha={cancha.nombre} />
            </div>
        </div>
    </div>
};

export default CanchaEnLista