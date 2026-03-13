const url = `${import.meta.env.VITE_API_URL}/api/cancha`;

const getCanchas = async (limite, inicio) => {
    try {
        const response = await fetch(`${url}?limite=${limite}&desde=${inicio}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
        });
        const resultado = await response.json();

        console.log("URL solicitada:", url + `?limite=${limite}&desde=${inicio}`);
        console.log("Respuesta del servidor:", resultado);

        if (!response.ok) {
            throw new Error(resultado.message || `Error: ${response.status}`);
        }
        return {
            canchas: resultado.canchas,
            total: resultado.total
        }
    } catch (error) {
        console.log("Error en solicitud de canchas: ", error);
        return { canchas: [], total: 0 };
    }
};

const registerCancha = async (cancha) => {
    try {
        const response = await fetch(`${url}/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(cancha)
        });
        const resultado = await response.json();
        if (!response.ok) {
            throw new Error(resultado.message || `Error: ${response.status}`);
        }
        return {
            ok: true,
            cancha: resultado.cancha
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error de conexión con el servidor"
        }
    }
};

const updateCancha = async (newCancha) => {
    try {
        const response = await fetch(`${url}/update/${newCancha._id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newCancha)
        });
        const resultado = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(resultado.message || `Error: ${response.status}`);
        }
        return {
            ok: true,
            cancha: resultado.cancha
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error en la conexión con el servidor"
        }
    }
};

const deleteCancha = async (idCancha) => {
    try {
        const response = await fetch(`${url}/${idCancha}`, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-type": "application/json" }
        });
        const resultado = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(resultado.message || `Error: ${response.status}`);
        }
        return {
            ok: true,
            cancha: resultado.canchaBD,
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: error.message || "Error en la conexión con el servidor"
        }
    }
};

export {
    getCanchas,
    registerCancha,
    updateCancha,
    deleteCancha
}