function ProductoDeleteModal({ showDeleteProductoModal, closeDeleteProductoModal, borrarProducto, nameProducto }) {
    if (!showDeleteProductoModal) { return null }
    return <section className="background-productoDeleteModal">
        <div className="window-productoDeleteModal rounded p-3">
            <div className="p-3">
                <p className="fw-6">¿Desea inhabilitar el producto {nameProducto}?</p>
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button className="acceptBtn-productoDeleteModal"
                    onClick={() => {
                        borrarProducto();
                        closeDeleteProductoModal();
                    }}
                >Aceptar</button>
                <button className="cancelBtn-productoDeleteModal"
                    onClick={closeDeleteProductoModal}
                >Cancelar</button>
            </div>
        </div>
    </section>
}
export default ProductoDeleteModal