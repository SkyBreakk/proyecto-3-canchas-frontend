import React, { useEffect, useRef, useState } from "react";
import "../assets/css/tienda.css";
import ProductoModal from "../components/modales/ProductoModal";
import { obtenerProductos } from "../helpers/producto";
import { traerCategoriasPaginado } from "../helpers/categoria";

const TiendaScreen = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    Promise.all([traerCategoriasPaginado(50, 0), obtenerProductos(100, 0)])
      .then(([categoriaData, productoData]) => {
        setCategorias(categoriaData.categorias);
        setProductos(productoData.productos);
      })
      .catch((err) => console.error("Error cargando datos:", err))
      .finally(() => setLoading(false));
  }, []);

  const scrollRefs = useRef({});
  const scroll = (categoriaId, direction) => {
    const container = scrollRefs.current[categoriaId];
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
      <>
        <div className="loading-placeholder"></div>
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner-container">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">Cargando productos...</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="menu-container container p-3">
      {categorias.map((categoria) => {
        const categoriaId = categoria._id;
        const categoriaNombre = categoria.nombre;

        const productosFiltrados = productos.filter((producto) => {
          const productoCategoriaId =
            producto.categoria?._id || producto.categoria;
          const productoCategoriaNombre = producto.categoria?.nombre;

          return (
            productoCategoriaId === categoriaId ||
            productoCategoriaNombre === categoriaNombre
          );
        });

        if (productosFiltrados.length === 0) return null;

        return (
          <div key={categoriaId} className="mb-4">
            <div className="ps-2 mb-3">
              <h2 className="text-white h5 fw-bold m-0 category-title-badge">
                {categoria.nombre || categoria}
              </h2>
            </div>
            <div className="category-shelf d-flex align-items-center position-relative">
              <button
                className="scroll-arrow me-2"
                onClick={() => scroll(categoriaId, "left")}
              >
                {" "}
                &lt;{" "}
              </button>
              <div
                className="d-flex gap-3 overflow-hidden w-100 py-3"
                ref={(el) => (scrollRefs.current[categoriaId] = el)}
                style={{ scrollBehavior: "smooth" }}
              >
                {productosFiltrados.map((producto) => (
                  <div
                    key={producto._id}
                    className="item-card text-center"
                    onClick={() => setProductoSeleccionado(producto)}
                    data-bs-toggle="modal"
                    data-bs-target="#modalProducto"
                  >
                    <div className="img-container mb-2">
                      <img
                        src={
                          producto.img ||
                          "https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-placeholder-line-icon-vector-png-image_6691835.png"
                        }
                        alt={producto.nombre}
                        className="product-img"
                      />
                    </div>
                    <div className="item-info text-white">
                      <p className="m-0 fw-bold item-name">{producto.nombre}</p>
                      <p className="m-0 item-price">
                        ${producto.precio.toLocaleString("es-AR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="scroll-arrow ms-2"
                onClick={() => scroll(categoriaId, "right")}
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
