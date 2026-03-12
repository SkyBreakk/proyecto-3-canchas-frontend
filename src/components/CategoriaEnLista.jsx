import { useState } from "react";
import CategoriaEditModal from "./CategoriaEditModal";
import CategoriaDeleteModal from "./CategoriaDeleteModal";

function CategoriaEnLista({ categoria, updateCategoria, deleteCategoria }) {

    const [showDeleteCategoriaModal, setShowDeleteCategoriaModal] = useState(false);
    const [showEditCategoriaModal, setShowEditCategoriaModal] = useState(false);

    const modificarCategoria = (elementValue) => {
        updateCategoria(elementValue);
    };

    return <div className="row my-2 py-2 px-2 rounded categoriaRow-categoriaAdminScreen">

        <div className="col-6">
            <div className="text-truncate">
                {categoria.nombre}
            </div>
        </div>

        <div className="col-6">
            <div className="d-flex justify-content-center align-items-center gap-2">

                <button className="btn btn-sm btnEditCategoria"
                    onClick={() => { setShowEditCategoriaModal(true) }}
                    type="button">
                    <i className="bi bi-pencil-square"></i>
                </button>

                <button className="btn btn-sm btnDeleteCategoria"
                    onClick={() => { setShowDeleteCategoriaModal(true) }}
                    type="button">
                    <i className="bi bi-x-lg"></i>
                </button>
                <CategoriaEditModal showEditCategoriaModal={showEditCategoriaModal}
                    closeEditCategoriaModal={() => setShowEditCategoriaModal(false)}
                    modificarCategoria={modificarCategoria}
                    categoria={categoria} />
                <CategoriaDeleteModal showDeleteCategoriaModal={showDeleteCategoriaModal}
                    closeDeleteCategoriaModal={() => setShowDeleteCategoriaModal(false)}
                    borrarCategoria={() => {
                        deleteCategoria(categoria);
                        setShowDeleteCategoriaModal(false);
                    }}
                    nombre={categoria.nombre} />
            </div>
        </div>
    </div>
};
export default CategoriaEnLista