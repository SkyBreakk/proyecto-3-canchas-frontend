import { useForm } from "react-hook-form";

function CategoriaAddModal({ showAddCategoriaModal, closeAddCategoriaModal, addCategoria }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset: resetForm
    } = useForm({ defaultValues: { nombre: "" } });

    const handleClose = () => {
        resetForm();
        closeAddCategoriaModal();
    };

    function resetInputs() {
        resetForm({ nombre: "" });
        closeAddCategoriaModal();
    };

    const subirCategoria = (value) => {
        addCategoria(value);
        handleClose();
    }

    if (!showAddCategoriaModal) { return null }
    return <section className="background-categoriaAddModal">
        <div className="window-categoriaAddModal w-75 rounded p-3">

            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center">
                        <p className="fs-2 text-light">Crear Categoria</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 px-3">
                    <form onSubmit={handleSubmit(subirCategoria)}
                        id="newCategoria" noValidate>
                            
                        <label className="form-label text-light">Nombre</label>
                        <input className="form-control" type="text" 
                            {...register("nombre", { required: "Este campo es obligatorio" })}/>

                        {errors.nombre && (
                            <p className="fs-6 fw-bold text-danger mt-2">{errors.nombre.message}</p>
                        )}

                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center gap-2 my-3">
                        <button className="accept-categoriaAddModal"
                            form="newCategoria"
                            type="submit">Guardar</button>
                        <button className="cancel-categoriaAddModal"
                            onClick={resetInputs}
                            type="button">Cancelar</button>
                    </div>
                </div>
            </div>

        </div>
    </section >
};
export default CategoriaAddModal