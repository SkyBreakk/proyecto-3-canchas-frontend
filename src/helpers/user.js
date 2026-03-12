const url = "http://localhost:4500/api/auth";

const getUsers = async (limite, inicio) => {
    try {
        const response = await fetch(`${url}?${limite}&desde=${inicio}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Cache-Control': 'no-cache'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Error: ${response.status}`);
        }

        return {
            ok: true,
            users: data.users,
            total: data.total
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error en la solicitud de usuarios al servidor",
            users: [],
            total: 0
        }
    }
};

const deleteUser = async (userID) => {
    try {
        const response = await fetch(`${url}/${userID}`, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-type": "application/json" }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Error: ${response.status}`);
        }

        return {
            ok: true,
            user: data.usuario
        }
    } catch (error) {
        console.log("Error:", error);
        return {
            ok: false,
            message: error.message || "Error en borrado de usuario"
        }
    }
};

export {
    getUsers,
    deleteUser
}