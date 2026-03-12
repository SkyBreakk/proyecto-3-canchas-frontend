import { useForm } from "react-hook-form";

function ProductoAddModal({ showAddProductoModal, closeAddProductoModal, addProducto }) {

    const { register, handleSubmit, formState: { errors }, reset: resetForm } = useForm({
        defaultValues: {
            nombre: "",
            precio: "",
            categoria: "",
            descripcion: "",
            stock: "",
            img: ""
        }
    });

    const handleClose = () => {
        resetForm();
        closeAddProductoModal();
    };

    function resetInputs() {
        resetForm({
            nombre: "",
            precio: "",
            categoria: "",
            descripcion: "",
            stock: "",
            img: ""
        });
        closeAddProductoModal();
    };

    const cargarProducto = (values) => {
        addProducto({ ...values });
        handleClose();
    }

    if (!showAddProductoModal) { return null }
    return <section className="background-ProductoAddModal">
        <div className="window-productoAddModal w-75 rounded p-3">

            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center">
                        <p className="fs-2 text-light">Crear Producto</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(cargarProducto)}
                id="newProducto"
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

                        <div className="mt-3">
                            <label className="form-label text-light">Categoria</label>
                            <input className="form-control" type="text"
                                {...register("categoria", { required: "Este campo es obligatorio" })} />
                            {errors.categoria && (
                                <p className="fs-6 fw-bold text-danger mt-2">{errors.categoria.message}</p>
                            )}
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
                            <label className="form-label text-light">Stock</label>
                            <input className="form-control"

                                {...register("stock")}
                                type="text" />
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
                        <button className="accept-productoAddModal"
                            form="newProducto"
                            type="submit">Guardar</button>
                        <button className="cancel-productoAddModal"
                            onClick={resetInputs}
                            type="button">Cancelar</button>
                    </div>
                </div>
            </div>

        </div>
    </section>
};
export default ProductoAddModal