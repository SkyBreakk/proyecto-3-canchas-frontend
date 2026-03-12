import React from "react";
import { useForm } from "react-hook-form";

const ProductoModal = ({ producto }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { cantidad: 1 },
  });

  const cantidadSeleccionada = watch("cantidad");

  const onSubmit = (data) => {
    const pedido = { producto: producto, cantidad: parseInt(data.cantidad) };
    console.log("Procesando:", pedido);
  };

  return (
    <div
      className="modal fade"
      id="modalProducto"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content modal-cancha-custom text-white">
          {!producto ? (
            <div className="modal-body text-center p-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <>
              <div className="modal-header border-0 pb-0">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body p-4 pt-0">
                <div className="row">
                  <div className="col-lg-5 mb-4 mb-lg-0">
                    <img
                      src={producto?.img}
                      className="modal-img-cancha shadow-lg"
                      alt={producto?.nombre}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  </div>

                  <div className="col-lg-7">
                    <span className="badge bg-primary mb-2 text-uppercase">
                      {producto?.categoria?.nombre || "General"}
                    </span>

                    <h2 className="fw-bold mb-1">{producto.nombre}</h2>
                    <p className="text-secondary-custom small mb-3">
                      {producto?.descripcion ||
                        "Sin descripción disponible para este producto."}
                    </p>

                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div>
                        <span className="text-secondary-custom d-block small">
                          Precio Unitario
                        </span>
                        <h3 className="fw-bold text-success mb-0">
                          ${producto?.precio}
                        </h3>
                      </div>
                      <div className="vr opacity-25"></div>
                      <div>
                        <span className="text-secondary-custom d-block small">
                          Stock Disponible
                        </span>
                        <span
                          className={`fw-bold ${producto?.stock > 0 ? "text-white" : "text-danger"}`}
                        >
                          {producto?.stock > 0
                            ? `${producto?.stock} unidades`
                            : "Sin stock"}
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div
                        className="p-3 rounded-4 mb-4"
                        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                      >
                        <div className="row align-items-end">
                          <div className="col-6">
                            <label className="small mb-1 d-block opacity-75 text-uppercase fw-bold">
                              Cantidad
                            </label>
                            <input
                              type="number"
                              {...register("cantidad", {
                                required: true,
                                min: 1,
                                max: producto?.stock,
                              })}
                              className="form-control form-control-dark"
                            />
                          </div>
                          <div className="col-6 text-end">
                            <span className="text-secondary-custom d-block small">
                              Subtotal
                            </span>
                            <h4 className="fw-bold text-white mb-0">
                              $
                              {(
                                producto?.precio * (cantidadSeleccionada || 1)
                              ).toLocaleString()}
                            </h4>
                          </div>
                        </div>
                      </div>

                      {/* Botones de Acción */}
                      <div className="d-grid gap-2">
                        <button
                          type="submit"
                          className="btn btn-alquilar text-white"
                          disabled={producto?.stock <= 0}
                        >
                          Comprar Ahora
                        </button>
                        <button
                          type="submit"
                          className="btn btn-outline-light border-2 py-2 fw-bold"
                          style={{ borderRadius: "12px" }}
                          disabled={producto?.stock <= 0}
                        >
                          <i className="bi bi-cart-plus me-2"></i> Añadir al
                          Carrito
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductoModal;
