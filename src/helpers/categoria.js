const url = "http://localhost:4500/api/category"

const traerCategoriasPaginado = async (limite, inicio) => {
    try {
        const response = await fetch(`${url}?limite=${limite}&desde=${inicio}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
        });

        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(resultado.message || `Error: ${response.status}`);
        }

        return {
            categorias: resultado.categorias,
            total: resultado.total
        }
    } catch (error) {
        console.log(error);
        return { categorias: [], total: 0 };
    }
};

const crearCategoria = async (newCategoria) => {
    try {
        const response = await fetch(`${url}/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategoria)
        });

        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(resultado.message || `Error: ${response.status}`);
        }

        return {
            ok: true,
            categoria: response.categoria
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error en crear categoria"
        }
    }
};

const actualizarCategoria = async (newCategoria) => {
    try {
        const response = await fetch(`${url}/update/${newCategoria._id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(newCategoria)
        });

        const resultado = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(resultado.message || `Error: ${response.status}`);
        }

        return {
            ok: true,
            categoria: resultado.categoria
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: error.message || "Error en actualizar categoria"
        }
    }
};

const eliminarCategoria = async (categoriaID) => {
    try {
        const response = await fetch(`${url}/update/${categoriaID}`, {
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
            categoria: resultado.categoria,
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: error.message || "Error en borrar categoria"
        }
    }
};

export {
    traerCategoriasPaginado,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}