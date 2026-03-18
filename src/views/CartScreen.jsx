import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PaymentBtnApp from "../components/PaymentBtnApp";
import { obtenerProductoPorId } from "../helpers/producto";
import "../assets/css/cart.css";

const CartScreen = () => {
  const { productoId } = useParams();
  const { cart, cartLoading, totalItems, clearCart, updateQuantity } =
    useCart();
  const [compraDirecta, setCompraDirecta] = useState(null);
  const [productLoading, setProductLoading] = useState(!!productoId);

  useEffect(() => {
    if (productoId) {
      setProductLoading(true);
      obtenerProductoPorId(productoId)
        .then((res) => {
          if (res.ok) setCompraDirecta(res.producto);
        })
        .finally(() => setProductLoading(false));
    }
  }, [productoId]);

  if (cartLoading || productLoading) {
    return (
      <main className="carrito-container py-5 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-white me-3"></div>
        <h2 className="text-white m-0">Cargando...</h2>
      </main>
    );
  }

  const costoEnvio = 20000;
  const esCompraDirecta = !!productoId && compraDirecta;
  const subtotal = esCompraDirecta
    ? compraDirecta.precio
    : Number(cart.total || 0);
  const totalFinal = subtotal > 0 ? subtotal + costoEnvio : 0;

  return (
    <main className="carrito-container py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="text-white fw-bold m-0 display-4">
            {esCompraDirecta ? "Finalizar Compra" : "Carrito de compras"}
          </h1>
          {!esCompraDirecta && totalItems > 0 && (
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
            {esCompraDirecta ? (
              <div className="d-flex align-items-center mb-3 gap-3">
                <div className="bg-white rounded-4 p-2 shadow-sm d-flex justify-content-center align-items-center">
                  <img
                    src={
                      compraDirecta.img ||
                      "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-placeholder-line-icon-vector-png-image_6691835.png"
                    }
                    alt={compraDirecta.nombre}
                    className="producto-img-container rounded-3"
                  />
                </div>
                <div className="bg-zona5-dark rounded-4 p-4 shadow-sm flex-grow-1 d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="m-0 fw-bold">{compraDirecta.nombre}</h4>
                    <small className="text-light opacity-75 fs-6">
                      Compra directa (1 unidad)
                    </small>
                  </div>
                  <h4 className="m-0 fw-bold text-success">
                    ${compraDirecta.precio.toLocaleString("es-AR")}
                  </h4>
                </div>
              </div>
            ) : cart.items.length === 0 ? (
              <div className="bg-zona5-dark rounded-4 p-5 text-center shadow">
                <h3 className="text-white">Tu carrito está vacío</h3>
                <Link to="/tienda" className="btn btn-outline-light mt-3">
                  Ir a la tienda
                </Link>
              </div>
            ) : (
              cart.items.map((item, index) => {
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
                          onClick={() =>
                            updateQuantity(itemId, item.cantidad - 1)
                          }
                          className="btn btn-danger rounded-3 p-0 d-flex justify-content-center align-items-center"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <i className="bi bi-trash"></i>
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
              <h2 className="fw-bold mb-4">Resumen</h2>
              <div className="d-flex justify-content-between mb-3 fs-5">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString("es-AR")}</span>
              </div>
              <div className="d-flex justify-content-between mb-4 fs-5">
                <span>Envío</span>
                <span>${costoEnvio.toLocaleString("es-AR")}</span>
              </div>
              <hr className="border-white opacity-25" />
              <div className="d-flex justify-content-between mt-4 mb-5 fw-bold fs-3 text-success">
                <span>Total</span>
                <span>${totalFinal.toLocaleString("es-AR")}</span>
              </div>

              {subtotal > 0 ? (
                <div className="w-100">
                  <PaymentBtnApp total={totalFinal} />
                  {esCompraDirecta && (
                    <Link
                      to="/tienda"
                      className="btn btn-link w-100 text-white mt-2 opacity-50"
                    >
                      O prefiere ver el carrito completo
                    </Link>
                  )}
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
