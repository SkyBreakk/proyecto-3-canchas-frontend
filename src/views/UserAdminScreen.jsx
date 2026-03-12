import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../helpers/user";
import "../assets/css/UsersAdminScreen.css";
import UserEnLista from "../components/UserEnLista";

function UserAdminScreen() {

    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagina, setPagina] = useState(0);

    const cargarUsuarios = () => {
        getUsers(5, pagina).then((data) => {
            setUsers(data.users);
            setTotal(data.total);
        })
            .catch(err => console.error("Error al cargar:", err))
    };

    useEffect(() => {
        cargarUsuarios();
    }, [pagina]);

    const nextPage = () => {
        if (pagina + 5 < total) {
            setPagina(pagina + 5);
        }
    };

    const prevPage = () => {
        if (pagina - 5 >= 0) {
            setPagina(pagina - 5);
        }
    };

    const borrarUser = async (userElement) => {

        const respuesta = await deleteUser(userElement._id);
        if (respuesta.ok) {
            setUsers(users.filter((aux) => {
                return aux._id !== userElement._id
            }));
            setTotal(prevTotal => prevTotal - 1);
        }
    };

    return <section className="background-userAdminScreen">

        <div className="w-75 rounded">

            <div className="row">
                <div className="col-12">

                    <div className="text-center mb-5">
                        <p className="display-3 text-light">Gestión de usuarios</p>
                    </div>

                </div>
            </div>

            <div className="row rounded my-2 pt-2 px-2 userRow-userAdminScreen">

                <div className="col-3">
                    <div className="text-truncate">
                        <p className="fw-bold" >Nombre</p>
                    </div>
                </div>

                <div className="col-3">
                    <div className="text-truncate">
                        <p className="fw-bold" >E-mail</p>
                    </div >
                </div>

                <div className="col-3">
                    <div className="text-truncate">
                        <p className="fw-bold" >Rol</p>
                    </div>
                </div>

                <div className="col-3">
                    <div className="text-truncate">
                        <p className="fw-bold" >Acciones</p>
                    </div>
                </div>

            </div>
            {users.map((user, index) => {
                return <UserEnLista
                    key={index}
                    user={user}
                    borrarUser={borrarUser}
                />
            })}
            <div className="row my-3">
                <div className="col-12">

                    <div className="d-flex justify-content-center gap-2">
                        <button
                            className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                            onClick={prevPage}
                            disabled={pagina - 5 < 0}
                            style={{ opacity: pagina - 5 < 0 ? 0.5 : 1 }}
                        >
                            <i class="bi bi-arrow-left-short"></i>
                        </button>
                        <button
                            className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                            onClick={nextPage}
                            disabled={pagina + 5 >= total}
                            style={{ opacity: pagina + 5 >= total ? 0.5 : 1 }}
                        >
                            <i class="bi bi-arrow-right-short"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </section >
};
export default UserAdminScreen