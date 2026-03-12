import { useForm } from "react-hook-form";

function CanchaAddModal({ showAddCanchaModal, closeAddCanchaModal, addCancha }) {

    const { register, handleSubmit, formState: { errors }, reset: resetForm } = useForm({
        defaultValues: {
            nombre: "",
            precio: "",
            descripcion: "",
            img: ""
        }
    });

    const handleClose = () => {
        resetForm();
        closeAddCanchaModal();
    };

    function resetInputs() {
        resetForm({
            nombre: "",
            precio: "",
            descripcion: "",
            img: ""
        });
        closeAddCanchaModal();
    };

    const cargarCancha = (values) => {
        addCancha(values);
        handleClose();
    }

    if (!showAddCanchaModal) { return null }
    return <section className="background-canchaAddModal">
        <div className="window-canchaAddModal w-75 rounded p-3">

            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center">
                        <p className="fs-2 text-light">Crear Cancha</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(cargarCancha)}
                id="newCancha"
                noValidate>
                <div className="row">
                    <div className="col-md-7 px-3">

                        <div className="mt-3">
                            <label className="form-label text-light">Nombre</label>
                            <input className="form-control"

                                {...register("nombre", { required: "Este campo es obligatorio" })}
                                type="text" />
                            {errors.nombre && (
                                <p className="fs-6 fw-bold text-danger mt-2">{errors.nombre.message}</p>
                            )}
                        </div>

                        <div className="mt-3">
                            <label className="form-label text-light">Descripción</label>
                            <textarea className="form-control"

                                {...register("descripcion")}>

                            </textarea>
                        </div>
                    </div>
                    <div className="col-md-5 px-3">

                        <div className="mt-3">
                            <label className="form-label text-light">Precio</label>
                            <input className="form-control"

                                {...register("precio", {
                                    pattern: {
                                        value: /^[0-9]*[.,]?[0-9]+$/,
                                        message: "Formato no válido, solo se aceptan números, puntos y comas"
                                    }
                                })}
                                type="text" />
                            {errors.precio && (
                                <p className="fs-6 fw-bold text-danger mt-2">{errors.precio.message}</p>
                            )}
                        </div>

                        <div className="mt-3">
                            <label className="form-label text-light">URL de imagen</label>
                            <input className="form-control" {...register("img")} type="text" />
                        </div>
                    </div>
                </div>
            </form>

            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-end gap-2 my-3">
                        <button className="accept-canchaAddModal"
                            form="newCancha"
                            type="submit">Guardar</button>
                        <button className="cancel-canchaAddModal"
                            onClick={resetInputs}
                            type="button">Cancelar</button>
                    </div>
                </div>
            </div>

        </div>
    </section >
};

export default CanchaAddModal