import React, { useEffect, useRef, useState } from "react";
import { getCategorias } from "../helpers/categorias";
import { getProductos } from "../helpers/productos";
import "../assets/css/tienda.css";
import ProductoModal from "../components/modales/ProductoModal";

const TiendaScreen = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    Promise.all([getCategorias(), getProductos()])
      .then(([categoriaData, productoData]) => {
        setCategorias(categoriaData.categorias);
        setProductos(productoData.productos);
      })
      .catch((err) => console.error("Error cargando datos:", err))
      .finally(() => setLoading(false));
  }, []);

  const scrollRefs = useRef({});
  const scroll = (catId, direction) => {
    const container = scrollRefs.current[catId];
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="menu-container container p-3">
      {categorias.map((cat) => {
        const catId = cat._id || cat.nombre; // Usamos el ID o el nombre como clave
        const productosFiltrados = productos.filter(
          (p) => p.categoria.nombre === cat.nombre,
        );

        return (
          <div key={catId} className="mb-4">
            <h2 className="text-white h5 fw-bold mb-2 ps-2">
              {cat.nombre || cat}
            </h2>
            <div className="category-shelf d-flex align-items-center position-relative">
              <button
                className="scroll-arrow me-2"
                onClick={() => scroll(catId, "left")}
              >
                {" "}
                &lt;{" "}
              </button>
              <div
                className="d-flex gap-3 overflow-hidden w-100 py-3"
                ref={(el) => (scrollRefs.current[catId] = el)}
                style={{ scrollBehavior: "smooth" }}
              >
                {productosFiltrados.map((p) => (
                  <div
                    key={p._id}
                    className="item-card text-center"
                    onClick={() => setProductoSeleccionado(p)}
                    data-bs-toggle="modal"
                    data-bs-target="#modalProducto"
                  >
                    <div className="img-container mb-2">
                      <img src={p.img} alt={p.nombre} className="product-img" />
                    </div>
                    <div className="item-info text-white">
                      <p className="m-0 fw-bold item-name">{p.nombre}</p>
                      <p className="m-0 item-price">${p.precio}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="scroll-arrow ms-2"
                onClick={() => scroll(catId, "right")}
              >
                {" "}
                &gt;{" "}
              </button>
            </div>
          </div>
        );
      })}
      <ProductoModal producto={productoSeleccionado} />
    </div>
  );
};

export default TiendaScreen;
