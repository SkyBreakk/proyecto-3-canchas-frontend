function UserDeleteModal({ showDeleteUserModal, closeDeleteUserModal, borrarUser, nameUser }) {

    if (!showDeleteUserModal) { return null }
    return <section className="background-userDeleteModal">
        <div className="window-userDeleteModal rounded p-3">
            <div className="p-3">
                <p className="fw-6">¿Desea borrar el usuario {nameUser}?</p>
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button className="acceptBtn-deleteUserModal"
                    onClick={() => {
                        borrarUser();
                        closeDeleteUserModal();
                    }}
                >Aceptar</button>
                <button className="cancelBtn-deleteUserModal"
                    onClick={closeDeleteUserModal}
                >Cancelar</button>
            </div>
        </div>
    </section>
};
export default UserDeleteModal