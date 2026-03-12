import { useState, useEffect } from "react";
import CanchaEnLista from "../components/CanchaEnLista";
import CanchaAddModal from "../components/CanchaAddModal";
import {
    getCanchas,
    registerCancha,
    updateCancha,
    deleteCancha
} from "../helpers/cancha";
import "../assets/css/CanchasAdmin.css";

function CanchaAdminScreen() {

    const [canchas, setCanchas] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(0);
    const [showAddCanchaModal, setShowAddCanchaModal] = useState(false);

    const cargarCanchas = () => {
        getCanchas(5, pagina).then((data) => {
            setCanchas(data.canchas);
            setTotal(data.total);
        })
            .catch(err => console.error("Error al cargar:", err));
    };

    useEffect(() => {
        cargarCanchas();
    }, [pagina]);

    const nextPage = () => {
        if (pagina + 5 < total) {
            setPagina(pagina + 5);
        }
    };

    const prevPage = () => {
        if (pagina - 5 >= 0) {
            setPagina(pagina - 5);
        }
    };

    const addCancha = async (newCancha) => {
        const respuesta = await registerCancha(newCancha);
        if (respuesta.ok) {
            cargarCanchas();
            setShowAddCanchaModal(false);
        }
    };

    const actualizarCancha = async (canchaValue) => {
        const respuesta = await updateCancha(canchaValue);
        if (respuesta.ok) {
            setCanchas(
                canchas.map((cancha) => {
                    return cancha._id === canchaValue._id ? canchaValue : cancha
                })
            );
        }
    };

    const borrarCancha = async (canchaValue) => {
        const respuesta = await deleteCancha(canchaValue._id);
        if (respuesta.ok) {
            setCanchas(canchas.filter((aux) => {
                return aux._id !== canchaValue._id
            }));
            setTotal(prevTotal => prevTotal - 1);
        }
    };

    return <section className="background-canchasAdminScreen">

        <div className="w-75 rounded">

            <div className="row">
                <div className="col-12">

                    <div className="text-center mb-5">
                        <p className="display-3 text-light">Gestión Canchas</p>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-12">

                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-sm
                                    addBtnCancha-canchasAdminScreen 
                                    rounded"
                            type="button"
                            onClick={() => setShowAddCanchaModal(true)} >
                            Agregar Cancha
                        </button>
                        <CanchaAddModal
                            showAddCanchaModal={showAddCanchaModal}
                            closeAddCanchaModal={() => setShowAddCanchaModal(false)}
                            addCancha={addCancha}
                        />
                    </div>

                </div>
            </div>
            <div className="row rounded my-2 pt-2 px-2 canchasRow-canchasAdminScreen">
                <div className="col-2">
                    <div className="text-truncate">
                        <p className="fw-bold" >Imagen</p>
                    </div>
                </div>
                <div className="col-2">
                    <div className="text-truncate">
                        <p className="fw-bold" >nombre</p>
                    </div >
                </div>
                <div className="col-4">
                    <div className="text-truncate">
                        <p className="fw-bold" >Descripción</p>
                    </div>
                </div>
                <div className="col-2">
                    <div className="text-truncate">
                        <p className="fw-bold" >Precio</p>
                    </div>
                </div>
                <div className="col-2">
                    <div className="text-truncate">
                        <p className="fw-bold" >Acciones</p>
                    </div>
                </div>
            </div>
            {canchas.map((cancha, index) => {
                return <CanchaEnLista
                    key={index}
                    cancha={cancha}
                    actualizarCancha={actualizarCancha}
                    borrarCancha={borrarCancha}
                />
            })}
            <div className="row my-3">
                <div className="col-12">

                    <div className="d-flex justify-content-center gap-2">
                        <button
                            className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                            onClick={prevPage}
                            disabled={pagina - 5 < 0}
                            style={{ opacity: pagina - 5 < 0 ? 0.5 : 1 }}
                        >
                            <i class="bi bi-arrow-left-short"></i>
                        </button>
                        <button
                            className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                            onClick={nextPage}
                            disabled={pagina + 5 >= total}
                            style={{ opacity: pagina + 5 >= total ? 0.5 : 1 }}
                        >
                            <i class="bi bi-arrow-right-short"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </section >
};

export default CanchaAdminScreen