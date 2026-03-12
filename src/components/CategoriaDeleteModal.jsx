function CategoriaDeleteModal({ showDeleteCategoriaModal, closeDeleteCategoriaModal, borrarCategoria, nombre }) {
    if (!showDeleteCategoriaModal) { return null }
    return <section className="background-categoriaDeleteModal">
        <div className="window-categoriaDeleteModal rounded p-3">
            <div className="p-3">
                <p className="fw-6">¿Desea borrar la categoria {nombre}?</p>
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button className="acceptBtn-deleteCategoriaModal"
                    onClick={() => {
                        borrarCategoria();
                        closeDeleteCategoriaModal();
                    }}
                >Aceptar</button>
                <button className="cancelBtn-deleteCategoriaModal"
                    onClick={closeDeleteCategoriaModal}
                >Cancelar</button>
            </div>
        </div>
    </section>
};
export default CategoriaDeleteModal