import { useState, useEffect } from "react";
import {
    traerCategoriasPaginado,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} from "../helpers/categoria";
import "../assets/css/CategoriasAdmin.css";
import CategoriaAddModal from "../components/CategoriaAddModal";
import CategoriaEnLista from "../components/CategoriaEnLista";

function CanchaAdminScreen() {

    const [categorias, setCategorias] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(0);
    const [showAddCategoriaModal, setShowAddCategoriaModal] = useState(false);

    const cargarCategoria = () => {
        traerCategoriasPaginado(5, pagina).then((data) => {
            setCategorias(data.categorias);
            setTotal(data.total);
        })
            .catch(err => console.error("Error al cargar:", err));
    };

    useEffect(() => {
        cargarCategoria();
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

    const addCategoria = async (newCategoria) => {
        const respuesta = await crearCategoria(newCategoria);
        if (respuesta.ok) {
            cargarCategoria();
            setShowAddCategoriaModal(false);
        }
    };

    const updateCategoria = async (categoriaValue) => {
        const respuesta = await actualizarCategoria(categoriaValue);
        if (respuesta.ok) {
            setCategorias(
                categorias.map((element) => {
                    return element._id === categoriaValue._id ? categoriaValue : element
                })
            );
        }
    };

    const deleteCategoria = async (categoriaElement) => {
        const respuesta = await eliminarCategoria(categoriaElement._id);
        if (respuesta.ok) {
            setCategorias(categorias.filter((element) => {
                return element._id !== categoriaElement._id
            }));
            setTotal(prevTotal => prevTotal - 1);
        }
    };

    return <section className="background-categoriaAdminScreen">

        <div className="w-75 rounded">

            <div className="row">
                <div className="col-12">

                    <div className="text-center mb-5">
                        <p className="display-3 text-light">Gestión Categorias</p>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-12">

                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-sm
                                    addBtnCategoria-categoriaAdminScreen
                                    rounded"
                            type="button"
                            onClick={() => setShowAddCategoriaModal(true)} >
                            Agregar Categoria
                        </button>
                        <CategoriaAddModal
                            showAddCategoriaModal={showAddCategoriaModal}
                            closeAddCategoriaModal={() => setShowAddCategoriaModal(false)}
                            addCategoria={addCategoria}
                        />
                    </div>

                </div>
            </div>
            <div className="row rounded my-2 pt-2 px-2 categoriaRow-categoriaAdminScreen">

                <div className="col-6">
                    <div className="text-truncate">
                        <p className="fw-bold" >nombre</p>
                    </div >
                </div>

                <div className="col-6">
                    <div className="text-truncate">
                        <p className="fw-bold" >Acciones</p>
                    </div>
                </div>

            </div>
            {categorias.map((categoria, index) => {
                return <CategoriaEnLista
                    key={index}
                    categoria={categoria}
                    updateCategoria={updateCategoria}
                    deleteCategoria={deleteCategoria}
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