import { useEffect } from "react";
import { useForm } from "react-hook-form"

function CanchaEditModal({ showEditCanchaModal, closeEditCanchaModal, modificarCancha, cancha }) {

    const { register, handleSubmit, formState: { errors }, reset: resetInputs } = useForm({
        defaultValues: {
            nombre: cancha?.nombre || "",
            descripcion: cancha?.descripcion || "",
            precio: cancha?.precio || "",
            img: cancha?.img || "",
        }
    });

    const resetAndClose = () => {
        resetInputs();
        closeEditCanchaModal();
    };

    useEffect(() => {
        if (cancha) {
            resetInputs({
                nombre: cancha.nombre,
                descripcion: cancha.descripcion,
                precio: cancha.precio,
                img: cancha.img,
            });
        }
    }, [cancha, resetInputs]);

    const editarCancha = (valueForm) => {
        const canchaNewValue = {
            ...cancha,
            nombre: valueForm.nombre,
            descripcion: valueForm.descripcion,
            precio: valueForm.precio,
            img: valueForm.img
        };
        modificarCancha(canchaNewValue);
        closeEditCanchaModal();
    };

    if (!showEditCanchaModal) { return null }
    return <section className="background-canchaEditModal">
        <div className="window-canchaEditModal w-75 rounded p-3">
            <div className="row">
                <div className="col-12">
                    <div className="text-center">
                        <p className="display-5 text-light">Editar Cancha</p>
                    </div>
                </div>
            </div>
            <form id="editCancha" onSubmit={handleSubmit(editarCancha)} noValidate>

                <div className="row m-3">
                    <div className="col-md-6 col-12">
                        <div className="imagen-canchaEditModal d-flex justify-content-center p-2">
                            <img src={cancha.img} alt="imagen_cancha" />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="mt-2">
                            <label className="form-label text-light">Nombre:</label>
                            <input className="form-control"
                                {...register("nombre", { required: "Este campo no debe estar vacio" })}
                                type="text" />
                            {errors.nombre && (
                                <p className="fs-6 fw-bold text-danger mt-2">{errors.nombre.message}</p>
                            )}
                        </div>
                        <div className="mt-2">
                            <label className="form-label text-light">Descripción</label>
                            <textarea className="form-control"
                                {...register("descripcion")}
                                type="text">

                            </textarea>
                        </div>
                        <div className="mt-2">
                            <label className="form-label text-light">Precio:</label>
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
                        <div className="mt-2">
                            <label className="form-label text-light">Url de Imagen:</label>
                            <input className="form-control"
                                {...register("img")}
                                type="text" />
                        </div>
                    </div>
                </div>

            </form>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-end gap-2">
                        <button className="btnSaveEdit-canchaEditModal"
                            form="editCancha"
                            type="submit">
                            Guardar
                        </button>
                        <button className="btnCancelEdit-canchaEditModal"
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
export default CanchaEditModal