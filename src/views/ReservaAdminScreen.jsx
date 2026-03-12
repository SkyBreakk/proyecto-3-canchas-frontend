import { useState, useEffect } from "react";
import { getReservasDisponibles, deleteReserva } from "../helpers/reserva";
import "../assets/css/ReservasAdmin.css";
import ReservaEnLista from "../components/ReservaEnLista";

function ReservaAdminScreen() {

    const [reservas, setReservas] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(0);

    const cargarReservas = () => {
        getReservasDisponibles(5, pagina).then((data) => {
            setReservas(data.reservas);
            setTotal(data.total);
        })
            .catch(err => console.error("Error al cargar:", err))
    };

    useEffect(() => {
        cargarReservas();
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

    const borrarReserva = async (element) => {

        const resultado = await deleteReserva(element._id);
        if (resultado.ok) {
            setReservas(reservas.filter((aux) => {
                return aux._id !== element._id
            }));
            setTotal(prevTotal => prevTotal - 1);
        }
    };

    return <section className="background-reservaAdminScreen">

        <div className="w-75 rounded">

            <div className="row">
                <div className="col-12">

                    <div className="text-center mb-5">
                        <p className="display-3 text-light">Gestión Reservas</p>
                    </div>

                </div>
            </div>

            <div className="row rounded my-2 pt-2 px-2 reservaRow-reservaAdminScreen">

                <div className="col-2">
                    <div className="text-truncate">
                        <p className="fw-bold" >Ususario</p>
                    </div>
                </div>

                <div className="col-2">
                    <div className="text-truncate">
                        <p className="fw-bold" >Cancha</p>
                    </div>
                </div>

                <div className="col-2">
                    <div className="text-truncate">
                        <p className="fw-bold" >Seña</p>
                    </div >
                </div>

                <div className="col-2">
                    <div className="text-truncate">
                        <p className="fw-bold" >Fecha</p>
                    </div>
                </div>

                <div className="col-2">
                    <div className="text-truncate">
                        <p className="fw-bold" >Horas</p>
                    </div>
                </div>

                <div className="col-2">
                    <div className="text-truncate">
                        <p className="fw-bold" >Acciones</p>
                    </div>
                </div>

            </div>
            {
                reservas.map((reserva, index) => {
                    return <ReservaEnLista
                        key={index}
                        reserva={reserva}
                        borrarReserva={borrarReserva}
                    />
                })
            }
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

export default ReservaAdminScreen