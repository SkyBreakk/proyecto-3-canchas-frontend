import { useEffect } from "react";
import { useForm } from "react-hook-form"

function ProductoEditModal({ showEditProductoModal, closeEditProductoModal, modificarProducto, producto }) {
    const { register, handleSubmit, formState: { errors }, reset: resetInputs } = useForm({
        defaultValues: {
            nombre: producto?.nombre || "",
            precio: producto?.precio || "",
            categoria: producto?.categoria || "",
            descripcion: producto?.descripcion || "",
            stock: producto?.stock || "",
            img: producto?.img || "",
        }
    });

    const resetAndClose = () => {
        resetInputs();
        closeEditProductoModal();
    };

    useEffect(() => {
        if (producto) {
            resetInputs({
                nombre: producto.nombre,
                precio: producto.precio,
                categoria: producto.categoria.nombre,
                descripcion: producto.descripcion,
                stock: producto.stock,
                img: producto.img
            });
        }
    }, [producto, resetInputs]);

    const editarProducto = (data) => {
        const newProducto = {
            ...producto,
            nombre: data.nombre,
            precio: data.precio,
            descripcion: data.descripcion,
            stock: data.stock,
            img: data.img
        };
        modificarProducto(newProducto);
        closeEditProductoModal();
    };

    if (!showEditProductoModal) { return null }
    return <section className="background-productoEditModal">
        <div className="window-productoEditModal w-75 rounded p-3">
            <div className="row">
                <div className="col-12">
                    <div className="text-center">
                        <p className="display-5 text-light">Editar Producto</p>
                    </div>
                </div>
            </div>
            <form id="editProducto" onSubmit={handleSubmit(editarProducto)} noValidate>

                <div className="row m-3">
                    <div className="col-md-6 col-12">
                        <div className="imagen-productoEditModal d-flex justify-content-center p-2">
                            <img src={producto.img} alt="imagen_producto" />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">

                        <div className="mt-2">
                            <label className="form-label text-light">Nombre:</label>
                            <input className="form-control"
                                {...register("nombre", { required: "Este campo no debe estar vacio" })}
                                type="text" />
                            {
                                errors.nombre && (
                                    <p className="fs-6 fw-bold text-danger mt-2">{errors.nombre.message}</p>
                                )}
                        </div>

                        <div className="mt-2">
                            <label className="form-label text-light">Categoria</label>
                            <input className="form-control" {...register("categoria")}
                                type="text" />
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
                            {
                                errors.precio && (
                                    <p className="fs-6 fw-bold text-danger mt-2">{errors.precio.message}</p>
                                )}
                        </div>

                        <div className="mt-2">
                            <label className="form-label text-light">Stock:</label>
                            <input className="form-control"
                                {...register("stock")}
                                type="text" />
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
                        <button className="btnSaveEdit-productoEditModal"
                            form="editProducto"
                            type="submit">
                            Guardar
                        </button>
                        <button className="btnCancelEdit-productoEditModal"
                            onClick={() => resetAndClose()}
                            type="button">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
export default ProductoEditModal