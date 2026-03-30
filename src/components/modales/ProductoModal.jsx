import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProductoModal = ({ producto }) => {
  const { user } = useContext(UserContext);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { cantidad: 1 },
  });

  useEffect(() => {
    if (producto) {
      reset({ cantidad: 1 });
    }
  }, [producto, reset]);

  const cantidadSeleccionada = watch("cantidad");

  const forceCloseModal = () => {
    const modalElement = document.getElementById("modalProducto");
    const modalInstance = window.bootstrap?.Modal.getInstance(modalElement);
    modalInstance?.hide();

    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());

    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  };

  const onSubmit = (data, accion) => {
    if (!producto) return;
    const cantidad = parseInt(data.cantidad);

    if (accion === "carrito") {
      addItem(producto._id, cantidad);
    } else if (accion === "comprar") {
      forceCloseModal();
      navigate(`/cart/${producto._id}?qty=${cantidad}`);
    }
  };

  return (
    <div
      className="modal fade"
      id="modalProducto"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div
          className="modal-content modal-cancha-custom text-white"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
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
                      src={
                        producto?.img ||
                        "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-placeholder-line-icon-vector-png-image_6691835.png"
                      }
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
                          ${(producto?.precio).toLocaleString("es-AR")}
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

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      name="producto-form"
                    >
                      <div
                        className="p-3 rounded-4 mb-4"
                        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                      >
                        <div className="row align-items-end">
                          <div className="col-6">
                            <span className="small mb-1 d-block opacity-75 text-uppercase fw-bold">
                              Cantidad
                            </span>
                            <div className="d-flex align-items-center gap-2">
                              <button
                                type="button"
                                className="btn btn-outline-light btn-sm px-3"
                                style={{ borderRadius: "8px" }}
                                onClick={() => {
                                  const current = watch("cantidad") || 1;
                                  if (current > 1) {
                                    setValue("cantidad", current - 1, {
                                      shouldValidate: true,
                                    });
                                  }
                                }}
                                disabled={(cantidadSeleccionada || 1) <= 1}
                              >
                                <i className="bi bi-dash"></i>
                              </button>

                              <input
                                type="number"
                                {...register("cantidad", {
                                  required: "Campo obligatorio",
                                  min: { value: 1, message: "Mínimo 1" },
                                  max: {
                                    value: producto?.stock,
                                    message: `Máximo ${producto?.stock}`,
                                  },
                                })}
                                min={1}
                                max={producto?.stock}
                                className={`form-control form-control-dark text-center ${errors.cantidad ? "is-invalid" : ""}`}
                                style={{ width: "60px" }}
                                inputMode="numeric"
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => {
                                  let val = e.target.value || 1;
                                  val = Math.max(
                                    1,
                                    Math.min(val, producto?.stock || 1),
                                  );
                                  setValue("cantidad", val, {
                                    shouldValidate: true,
                                  });
                                }}
                              />

                              <button
                                type="button"
                                className="btn btn-outline-light btn-sm px-3"
                                style={{ borderRadius: "8px" }}
                                onClick={() => {
                                  const current =
                                    parseInt(watch("cantidad")) || 1;
                                  if (current < (producto?.stock || 1)) {
                                    setValue("cantidad", current + 1, {
                                      shouldValidate: true,
                                    });
                                  }
                                }}
                                disabled={
                                  (cantidadSeleccionada || 1) >=
                                  (producto?.stock || 1)
                                }
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                            {errors.cantidad && (
                              <span className="error-message">
                                <i className="bi bi-exclamation-triangle me-1"></i>
                                {errors.cantidad.message}
                              </span>
                            )}
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

                      <div className="d-grid gap-2">
                        {user ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-alquilar text-white"
                              disabled={
                                producto?.stock <= 0 ||
                                cantidadSeleccionada > producto?.stock ||
                                cantidadSeleccionada <= 0
                              }
                              onClick={handleSubmit((data) =>
                                onSubmit(data, "comprar"),
                              )}
                            >
                              Comprar Ahora
                            </button>

                            <button
                              type="button"
                              className="btn btn-outline-light border-2 py-2 fw-bold"
                              data-bs-dismiss="modal"
                              style={{ borderRadius: "12px" }}
                              disabled={
                                !producto ||
                                producto.stock <= 0 ||
                                (cantidadSeleccionada || 1) > producto.stock ||
                                (cantidadSeleccionada || 1) < 1
                              }
                              onClick={handleSubmit((data) =>
                                onSubmit(data, "carrito"),
                              )}
                            >
                              <i className="bi bi-cart-plus me-2"></i> Añadir al
                              Carrito
                            </button>
                          </>
                        ) : (
                          <div className="text-center p-3 rounded-3 border border-warning bg-warning bg-opacity-10">
                            <p className="text-warning small mb-2">
                              <i className="bi bi-exclamation-circle me-2"></i>
                              Debes iniciar sesión para realizar compras.
                            </p>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-warning w-100"
                              data-bs-dismiss="modal"
                              onClick={() => navigate("/login")}
                            >
                              Ir al Login
                            </button>
                          </div>
                        )}
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
