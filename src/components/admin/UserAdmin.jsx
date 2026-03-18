import { useState, useEffect } from "react";
import { apiUser } from "../../helpers/user";
import ConfirmModal from "../modales/ConfirmModal";

function UserAdmin() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ show: false, user: null });

  const cargarUsuarios = () => {
    apiUser
      .get(5, pagina)
      .then((data) => {
        if (data && data.users) {
          setUsers(data.users);
          setTotal(data.total);
        } else {
          setUsers([]);
          setTotal(0);
        }
      })
      .catch((err) => {
        console.error("Error en la carga:", err);
        setUsers([]);
      });
  };

  useEffect(cargarUsuarios, [pagina]);

  const handleBorrar = async () => {
    if (!deleteModal.user?._id) return;

    const res = await apiUser.delete(deleteModal.user._id);
    if (res.ok) {
      setUsers(users.filter((u) => u._id !== deleteModal.user._id));
      setTotal((prev) => prev - 1);
      setDeleteModal({ show: false, user: null });
      showToast("El usuario fue borrado correctamente.", "success");
    } else {
      showToast("Se produjo un error al intentar borrar.", "danger");
    }
  };

  return (
    <>
      <h1 className="display-4 text-center neon-text mb-5 fw-bold">
        Gestión de Usuarios
      </h1>

      <div className="row fw-bold border-bottom pb-2 mb-2 neon-text px-3">
        <div className="col-3 d-none d-md-block">Usuario</div>
        <div className="col-7 col-md-3">Email</div>
        <div className="col-3 d-none d-sm-block text-center">Rol</div>
        <div className="col-5 col-sm-2 text-center">Acciones</div>
      </div>

      {users.map((user) => (
        <div
          key={user?._id}
          className="row itemRow-adminScreen py-3 align-items-center mx-0 px-2"
        >
          <div className="col-3 fw-bold d-none d-md-block">{user.username}</div>
          <div className="col-7 col-md-3 d opacity-75 text-truncate">
            {user.email}
          </div>
          <div className="col-3 d-none d-sm-block text-center">
            <span
              className={`badge ${user.role === "admin" ? "bg-danger" : "bg-success"} bg-opacity-25 border border-${user.role === "admin" ? "danger" : "success"} text-${user.role === "admin" ? "danger" : "success"}`}
            >
              {user.role.toUpperCase()}
            </span>
          </div>
          <div className="col-5 col-sm-2 text-center">
            <button
              className="btn btn-sm btn-outline-danger border-0"
              onClick={() => setDeleteModal({ show: true, user })}
              disabled={user.role === "admin"}
            >
              <i className="bi bi-person-x fs-5"></i>
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button
          className="btn btn-sm btn-neon"
          onClick={() => setPagina((p) => Math.max(0, p - 5))}
          disabled={pagina === 0}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <span className="text-secondary small">
          Mostrando {pagina + 1} - {pagina + users.length} de {total}
        </span>
        <button
          className="btn btn-sm btn-neon"
          onClick={() => setPagina((p) => p + 5)}
          disabled={pagina + 5 >= total}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <ConfirmModal
        show={deleteModal.show}
        close={() => setDeleteModal({ show: false, user: null })}
        onConfirm={handleBorrar}
        message={`¿Deseas dar de baja al usuario ${deleteModal.user?.username || ""}?`}
      />
    </>
  );
}

export default UserAdmin;
