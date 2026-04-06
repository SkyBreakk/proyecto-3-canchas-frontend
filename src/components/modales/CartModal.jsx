import React from "react";
import { useCart } from "../../context/CartContext";
import "../../assets/css/tienda.css";
import { useNavigate } from "react-router-dom";

const CartModal = () => {
  const { cart, cartLoading, updateQuantity, removeItem, clearCart } =
    useCart();
  const navigate = useNavigate();

  return (
    <div
      className="modal fade"
      id="modalCarrito"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content modal-cancha-custom text-white">
          <div className="modal-header border-0 p-4 pb-0">
            <h3 className="fw-bold mb-0">
              <i className="bi bi-cart3 me-2 text-success"></i>Tu Carrito
            </h3>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body p-4">
            {cartLoading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-success"
                  role="status"
                ></div>
              </div>
            ) : cart.items.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-cart-x display-1 opacity-25"></i>
                <p className="mt-3 text-secondary-custom">
                  Tu carrito está vacío
                </p>
                <button
                  className="btn btn-outline-light mt-2"
                  data-bs-dismiss="modal"
                  onClick={() => navigate("/tienda")}
                >
                  Volver a la tienda
                </button>
              </div>
            ) : (
              <>
                <div
                  className="cart-items-container mb-4"
                  style={{ maxHeight: "70vh", overflowY: "auto" }}
                >
                  {cart.items.map((item) => (
                    <div
                      key={item.producto._id}
                      className="row align-items-center mb-3 p-2 p-md-3 rounded-4 mx-0 gx-2"
                      style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="col-3 col-md-2 px-0 text-center">
                        <img
                          src={item.producto.img}
                          alt={item.producto.nombre}
                          className="img-fluid rounded-3 img-cart-item"
                        />
                      </div>

                      <div className="col-9 col-md-4 ps-2 ps-md-3">
                        <h6
                          className="mb-0 fw-bold text-truncate"
                          style={{ maxWidth: "100%" }}
                        >
                          {item.producto.nombre}
                        </h6>
                        <span className="small text-success fw-semibold">
                          ${item.precioUnitario.toLocaleString()} c/u
                        </span>
                      </div>

                      <div className="col-12 col-md-6 mt-2 mt-md-0">
                        <div className="row align-items-center">
                          <div className="col-6 col-md-6">
                            <div className="d-flex align-items-center gap-1 gap-md-2 justify-content-start justify-content-md-center">
                              <button
                                className="btn btn-sm btn-outline-light border-0 px-2"
                                onClick={() =>
                                  updateQuantity(
                                    item.producto._id,
                                    item.cantidad - 1,
                                  )
                                }
                                disabled={item.cantidad <= 1}
                              >
                                <i className="bi bi-dash-lg"></i>
                              </button>

                              <span className="fw-bold px-1">
                                {item.cantidad}
                              </span>

                              <button
                                className="btn btn-sm btn-outline-light border-0 px-2"
                                onClick={() =>
                                  updateQuantity(
                                    item.producto._id,
                                    item.cantidad + 1,
                                  )
                                }
                                disabled={item.cantidad >= item.producto.stock}
                              >
                                <i className="bi bi-plus-lg"></i>
                              </button>
                            </div>
                          </div>

                          <div className="col-6 col-md-6 text-end">
                            <div className="d-flex flex-column align-items-end">
                              <span className="fw-bold text-nowrap">
                                $
                                {(
                                  item.precioUnitario * item.cantidad
                                ).toLocaleString()}
                              </span>
                              <button
                                className="btn btn-sm text-danger border-0 p-0 mt-0"
                                onClick={() => removeItem(item.producto._id)}
                              >
                                <i className="bi bi-trash3 small"></i>{" "}
                                <span className="d-none d-md-inline">
                                  Quitar
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-top border-secondary border-opacity-25 pt-4">
                  <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                    <div>
                      <span className="text-secondary-custom d-block small text-uppercase fw-bold">
                        Total a pagar
                      </span>
                      <h2 className="fw-bold text-success mb-0">
                        ${cart.total.toLocaleString()}
                      </h2>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger border-0"
                      onClick={clearCart}
                    >
                      <i className="bi bi-trash me-1"></i> Vaciar Carrito
                    </button>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-alquilar text-white"
                      data-bs-dismiss="modal"
                      onClick={() => navigate("/cart")}
                    >
                      Finalizar Compra
                    </button>
                    <button
                      className="btn btn-link text-white text-decoration-none small opacity-75"
                      data-bs-dismiss="modal"
                    >
                      Continuar Comprando
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
