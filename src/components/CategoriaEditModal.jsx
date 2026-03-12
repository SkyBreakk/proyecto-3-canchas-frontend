import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function CategoriaEditModal({ showEditCategoriaModal, closeEditCategoriaModal, modificarCategoria, categoria }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset: resetInputs } = useForm({ defaultValues: { nombre: categoria?.nombre } });

    const resetAndClose = () => {
        resetInputs();
        closeEditCategoriaModal();
    };

    useEffect(() => {

        if (categoria) { resetInputs({ nombre: categoria.nombre }); }
    }, [categoria, resetInputs]);

    const editarCategoria = (valueForm) => {
        const categoriaChanged = { ...categoria, nombre: valueForm.nombre };
        modificarCategoria(categoriaChanged);
        closeEditCategoriaModal();
    };
    if (!showEditCategoriaModal) { return null }
    return <section className="background-categoriaEditModal">
        <div className="window-categoriaEditModal w-75 rounded p-3">
            <div className="row">
                <div className="col-12">
                    <div className="text-center">
                        <p className="display-5 text-light">Editar Categoria</p>
                    </div>
                </div>
            </div>
            <div className="row m-2">
                <div className="col-12">
                    <form id="editCategoria" onSubmit={handleSubmit(editarCategoria)} noValidate>
                        <div className="mt-2">
                            <label className="form-label text-light">Nombre:</label>
                            <input className="form-control"
                                {...register("nombre", { required: "El nombre no debe estar vacio" })}
                                type="text" />
                            {errors.nombre && (
                                <p className="fs-6 fw-bold text-danger mt-2">{errors.nombre.message}</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center gap-2">
                        <button className="btnSaveEdit-categoriaEditModal"
                            form="editCategoria"
                            type="submit">
                            Guardar
                        </button>
                        <button className="btnCancelEdit-categoriaEditModal"
                            onClick={() => resetAndClose()}
                            type="button">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
};
export default CategoriaEditModal