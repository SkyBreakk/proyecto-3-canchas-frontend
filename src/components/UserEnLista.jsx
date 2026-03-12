import { useState } from "react";
import UserDeleteModal from "./UserDeleteModal";

function UserEnLista({ user, borrarUser }) {

    let validate;
    if (user.role === "admin") {
        validate = true;
    } else {
        validate = false;
    }

    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

    return <div className="row my-2 py-2 px-2 rounded userRow-userAdminScreen">

        <div className="col-3">
            <div className="text-truncate">
                {user.username}
            </div>
        </div>

        <div className="col-3">
            <div className="text-truncate">
                {user.email}
            </div>
        </div>

        <div className="col-3">
            <div className="text-truncate">
                {user.role}
            </div>
        </div>

        <div className="col-3">
            <div className="container d-flex justify-content-start gap-2">

                <button className="btn btn-sm btnDeleteUser"
                    onClick={() => { setShowDeleteUserModal(true) }}
                    disabled={validate}
                    type="button">
                    <i className="bi bi-x-lg"></i>
                </button>

                <UserDeleteModal showDeleteUserModal={showDeleteUserModal}
                    closeDeleteCanchaModal={() => setShowDeleteUserModal(false)}
                    borrarUser={() => {
                        borrarUser(user);
                        setShowDeleteUserModal(false);
                    }}
                    nameUser={user.username} />
            </div>
        </div>

    </div>
};
export default UserEnLista