function ProductoEnLista({ producto, onEdit, onDelete }) {
  return (
    <div className="row mx-0 py-3 align-items-center productoRow-productoAdminScreen">
      <div className="col-1 text-center">
        <img
          src={producto.img}
          alt="thumb"
          className="rounded border border-secondary"
          style={{ width: "45px", height: "45px", objectFit: "cover" }}
        />
      </div>
      <div className="col-3">
        <span className="fw-bold d-block">{producto.nombre}</span>
        <small className="text-muted">
          {producto.categoria?.nombre || "General"}
        </small>
      </div>
      <div className="col-2 text-center neon-text fw-bold">
        ${producto.precio}
      </div>
      <div className="col-3 small opacity-75 text-truncate">
        {producto.descripcion}
      </div>
      <div className="col-1 text-center">
        <span
          className={`badge ${producto.stock > 0 ? "bg-dark border border-success" : "bg-danger"}`}
        >
          {producto.stock}
        </span>
      </div>
      <div className="col-2 text-end pe-4">
        <div className="btn-group">
          <button
            className="btn btn-sm btn-outline-info"
            onClick={() => onEdit(producto)}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(producto)}
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductoEnLista;
