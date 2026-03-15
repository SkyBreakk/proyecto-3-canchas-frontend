import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import PaymentBtnApp from "../components/PaymentBtnApp";
import "../assets/css/cart.css";
import { Link } from "react-router-dom";

const CartScreen = () => {
  const { cartItems, total, clearCart, restarCantidad } =
    useContext(CartContext);

  if (total === null || cartItems === undefined) {
    return (
      <main className="carrito-container py-5 d-flex justify-content-center align-items-center">
        <h2 className="text-white">Cargando tu carrito...</h2>
      </main>
    );
  }

  const costoEnvio = 20000;
  const totalFinal = cartItems.length > 0 ? Number(total) + costoEnvio : 0;

  return (
    <main className="carrito-container py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="text-white fw-bold m-0 display-4">
            Carrito de compras
          </h1>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="btn btn-danger fw-bold rounded-3"
            >
              Vaciar carrito
            </button>
          )}
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-7">
            {cartItems.length === 0 ? (
              <div className="bg-zona5-dark rounded-4 p-5 text-center shadow">
                <h3 className="text-white">Tu carrito está vacío</h3>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const itemId = item.producto._id || item.producto.id;

                return (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-3 gap-3"
                  >
                    <div className="bg-white rounded-4 p-2 shadow-sm d-flex justify-content-center align-items-center">
                      <img
                        src={
                          item.producto.img || "https://via.placeholder.com/100"
                        }
                        alt={item.producto.nombre}
                        className="producto-img-container rounded-3"
                      />
                    </div>

                    <div className="bg-zona5-dark rounded-4 p-4 shadow-sm flex-grow-1 d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="m-0 fw-bold">{item.producto.nombre}</h4>
                        <small className="text-light opacity-75 fs-6">
                          Cantidad: {item.cantidad}
                        </small>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        <h4 className="m-0 fw-bold">
                          $
                          {(
                            item.producto.precio * item.cantidad
                          ).toLocaleString("es-AR")}
                        </h4>

                        <button
                          onClick={() => restarCantidad(itemId)}
                          className="btn btn-danger rounded-3 d-flex justify-content-center align-items-center p-0"
                          style={{
                            width: "32px",
                            height: "32px",
                            fontSize: "1.2rem",
                            lineHeight: "1",
                          }}
                          title="Quitar uno"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                          >
                            <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="col-12 col-lg-5">
            <div
              className="bg-zona5-dark rounded-4 p-4 shadow sticky-top"
              style={{ top: "100px" }}
            >
              <h2 className="fw-bold mb-4">Resumen de cuenta</h2>

              <div className="d-flex justify-content-between mb-3 fs-5">
                <span>Subtotal</span>
                <span>${total.toLocaleString("es-AR")}</span>
              </div>

              <div className="d-flex justify-content-between mb-4 fs-5">
                <span>Envío</span>
                <span>${costoEnvio.toLocaleString("es-AR")}</span>
              </div>

              <hr className="border-white opacity-25" />

              <div className="d-flex justify-content-between mt-4 mb-5 fw-bold fs-3">
                <span>Total</span>
                <span>${totalFinal.toLocaleString("es-AR")}</span>
              </div>

              {cartItems.length > 0 ? (
                <div className="w-100">
                  <PaymentBtnApp total={totalFinal} />
                </div>
              ) : (
                <button className="btn btn-secondary btn-lg w-100 fw-bold fs-4 rounded-3 shadow">
                  <Link
                    to="/tienda"
                    className="text-white text-decoration-none"
                  >
                    Agrega productos
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartScreen;
