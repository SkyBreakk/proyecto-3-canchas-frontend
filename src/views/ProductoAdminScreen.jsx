import { useState, useEffect } from "react";
import "../assets/css/ProductosAdmin.css";
import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
} from "../helpers/producto";
import ProductoAddModal from "../components/ProductoAddModal";
import ProductoEnLista from "../components/ProductoEnLista";

function ProductoAdminScreen() {

    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(0);
    const [showAddProductoModal, setShowAddProductoModal] = useState(false);

    const cargarProductos = () => {
        obtenerProductos(5, pagina).then((data) => {
            setProductos(data.productos);
            setTotal(data.total);
        })
            .catch(err => console.error("Error al cargar:", err))
    };

    useEffect(() => {
        cargarProductos();
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

    const addProducto = async (newProducto) => {
        const response = await crearProducto(newProducto);
        if (response.ok) {
            cargarProductos();
            setShowAddProductoModal(false);
        }
    };

    const updateProducto = async (productoValue) => {
        const response = await actualizarProducto(productoValue);
        if (response.ok) {
            setProductos(productos.map((aux) => {
                return aux._id === productoValue._id ? productoValue : aux
            }));
        }
    };

    const deleteProducto = async (productoValue) => {
        const response = await borrarProducto(productoValue._id);
        if (response.ok) {
            setProductos(productos.filter((aux) => {
                return aux._id !== productoValue._id
            }));
            setTotal(prevTotal => prevTotal - 1);
        }
    };

    return <section className="background-productoAdminScreen">

        <div className="w-100 px-5">

            <div className="row">
                <div className="col-12">

                    <div className="text-center mb-5">
                        <p className="display-3 text-light">Gestión Productos</p>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-12">

                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-sm
                                    addBtnProducto-productoAdminScreen 
                                    rounded"
                            type="button"
                            onClick={() => setShowAddProductoModal(true)} >
                            Agregar Producto
                        </button>
                        <ProductoAddModal
                            showAddProductoModal={showAddProductoModal}
                            closeAddProductoModal={() => setShowAddProductoModal(false)}
                            addProducto={addProducto}
                        />
                    </div>

                </div>
            </div>
            <div className="row my-2 pt-2 px-2 containerTable-productoAdminScreen">
                <div className="col-12">

                    <div className="row pt-3 rounded productoRow-productoAdminScreen">
                        <div className="col">
                            <div>
                                <p className="fw-bold" >Imagen</p>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <p className="fw-bold" >nombre</p>
                            </div >
                        </div>
                        <div className="col">
                            <div>
                                <p className="fw-bold" >Precio</p>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <p className="fw-bold" >Categoria</p>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <p className="fw-bold" >Descripción</p>
                            </div>
                        </div>

                        <div className="col text-center">
                            <div>
                                <p className="fw-bold" >Stock</p>
                            </div>
                        </div>

                        <div className="col">
                            <div>
                                <p className="fw-bold" >Acciones</p>
                            </div>
                        </div>
                    </div>
                    {productos.map((producto, index) => {
                        return <ProductoEnLista
                            key={index}
                            producto={producto}
                            updateProducto={updateProducto}
                            deleteProducto={deleteProducto}
                        />
                    })}

                </div>
            </div>

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

export default ProductoAdminScreen