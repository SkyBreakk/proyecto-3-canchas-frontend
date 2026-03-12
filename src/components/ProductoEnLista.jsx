import ProductoEditModal from "./ProductoEditModal";
import ProductoDeleteModal from "./ProductoDeleteModal";
import { useState } from "react";

function ProductoEnLista({ producto, updateProducto, deleteProducto }) {

    const [showDeleteProductoModal, setShowDeleteProductoModal] = useState(false);
    const [showEditProductoModal, setShowEditProductoModal] = useState(false);

    const modificarProducto = (productoValue) => {
        updateProducto(productoValue);
    };

    return <div className="row my-2 p-2 rounded productoRow-productoAdminScreen">
        <div className="col">
            <div className="imagen-productoAdminScreen">
                <img className="rounded" src={producto.img} alt="Imagen_Producto" />
            </div>
        </div>
        <div className="col">
            <div>
                <p className="text-wrap" >{producto.nombre}</p>
            </div>
        </div>
        <div className="col">
            <div>
                <p >{producto.precio}</p>
            </div>
        </div>
        <div className="col">
            <div className="text-truncate">
                <p >{producto.categoria.nombre}</p>
            </div>
        </div>
        <div className="col text-truncate">
            <div >
                <p>{producto.descripcion}</p>
            </div>
        </div>
        <div className="col text-center">
            <div>
                <p>{producto.stock}</p>
            </div>
        </div>

        <div className="col text-center">
            <div className="d-flex gap-2 justify-content-start">

                <button className="btn btn-sm btnEditProducto"
                    onClick={() => { setShowEditProductoModal(true) }}
                    type="button">
                    <i className="bi bi-pencil-square"></i>
                </button>

                <button className="btn btn-sm btnDeleteProducto"
                    onClick={() => { setShowDeleteProductoModal(true) }}
                    type="button">
                    <i className="bi bi-x-lg"></i>
                </button>
                <ProductoEditModal showEditProductoModal={showEditProductoModal}
                    closeEditProductoModal={() => setShowEditProductoModal(false)}
                    modificarProducto={modificarProducto}
                    producto={producto} />
                <ProductoDeleteModal showDeleteProductoModal={showDeleteProductoModal}
                    closeDeleteProductoModal={() => setShowDeleteProductoModal(false)}
                    borrarProducto={() => {
                        deleteProducto(producto);
                        setShowDeleteProductoModal(false);
                    }}
                    nameProducto={producto.nombre} />
            </div>
        </div>
    </div>
};
export default ProductoEnLista