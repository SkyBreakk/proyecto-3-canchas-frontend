import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { apiUser } from "../../helpers/user";
import ConfirmModal from "../modales/ConfirmModal";
import { useToast } from "../../context/ToastContext";
import UserAdminModal from "../modales/UserAdminModal";

function UserAdmin() {
  const { user, authLoading } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ show: false, user: null });
  const [roleModal, setRoleModal] = useState({ show: false, user: null });
  const { showToast } = useToast();

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

  useEffect(() => {
    if (!authLoading && user) {
      cargarUsuarios();
    }
  }, [pagina, authLoading, user]);

  const handleRoleChange = async (formData) => {
    if (!roleModal.user?._id || !roleModal.user?.email) return;

    const nuevoRol = formData.role;
    const rolActual = roleModal.user.role;
    let res = { ok: false };

    if (nuevoRol === "admin" && rolActual === "user") {
      res = await apiUser.addAdmin(roleModal.user.email);
    } else if (nuevoRol === "user" && rolActual === "admin") {
      res = await apiUser.delAdmin(roleModal.user._id);
    }

    if (res.ok) {
      cargarUsuarios();
      setRoleModal({ show: false, user: null });
      showToast(`El rol se actualizó a ${nuevoRol.toUpperCase()}.`, "success");
    } else {
      showToast(
        res.message || "Se produjo un error al cambiar el rol.",
        "danger",
      );
    }
  };

  const handleBorrar = async () => {
    if (!deleteModal.user?._id) return;

    const res = await apiUser.delete(deleteModal.user._id);
    if (res.ok) {
      cargarUsuarios();
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

      {users.map((userItem) => (
        <div
          key={userItem?._id}
          className="row itemRow-adminScreen py-3 align-items-center mx-0 px-2"
        >
          <div className="col-3 fw-bold d-none d-md-block">
            {userItem.username}
          </div>
          <div className="col-7 col-md-3 opacity-75 text-truncate">
            {userItem.email}
          </div>
          <div className="col-3 d-none d-sm-block text-center">
            <span
              className={`badge ${
                userItem.role === "superadmin"
                  ? "bg-warning text-dark"
                  : userItem.role === "admin"
                    ? "bg-danger"
                    : "bg-success"
              } bg-opacity-25 border border-${
                userItem.role === "superadmin"
                  ? "warning"
                  : userItem.role === "admin"
                    ? "danger"
                    : "success"
              } text-${
                userItem.role === "superadmin"
                  ? "warning"
                  : userItem.role === "admin"
                    ? "danger"
                    : "success"
              }`}
            >
              {userItem.role.toUpperCase()}
            </span>
          </div>
          <div className="col-5 col-sm-2 text-center">
            <div className="d-flex justify-content-center gap-2">
              {user?.role === "superadmin" && (
                <button
                  className="btn btn-sm btn-outline-warning border-0"
                  onClick={() => setRoleModal({ show: true, user: userItem })}
                  title="Cambiar rol"
                  disabled={
                    userItem.username === user.username ||
                    userItem.role === user.role
                  }
                >
                  <i className="bi bi-person-gear fs-5"></i>
                </button>
              )}

              <button
                className="btn btn-sm btn-outline-danger border-0"
                onClick={() => setDeleteModal({ show: true, user: userItem })}
                disabled={
                  userItem.role === user.role ||
                  (userItem.role === "superadmin" && user.role === "admin") ||
                  userItem.username === user.username
                }
                title={
                  userItem.role === "superadmin"
                    ? "No se puede eliminar un Superadmin"
                    : "Eliminar usuario"
                }
              >
                <i className="bi bi-person-x fs-5"></i>
              </button>
            </div>
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

      <UserAdminModal
        show={roleModal.show}
        close={() => setRoleModal({ show: false, user: null })}
        onSubmit={handleRoleChange}
        user={roleModal.user}
      />

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
