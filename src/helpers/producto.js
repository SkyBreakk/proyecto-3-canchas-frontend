const url = "http://localhost:4500/api/product";

const obtenerProductos = async (limite, inicio) => {
    try {
        const response = await fetch(`${url}?limite=${limite}&desde=${inicio}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Cache-Control': 'no-cache'
            }
        });
        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(resultado.message || `Error:${response.status}`);
        }
        return {
            ok: true,
            total: resultado.total,
            productos: resultado.productos
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error en solicitar los productos al servidor",
            productos: [],
            total: 0
        }
    }
};

const crearProducto = async (newProducto) => {
    try {
        const response = fetch(`${url}/`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newProducto)
        });

        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(resultado.message || `Error: ${response.status}`);
        }
        return {
            ok: true,
            producto: resultado.producto
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: error.message || "Error en la creación de producto"
        }
    }
};

const actualizarProducto = async (productValue) => {
    try {
        const response = await fetch(`${url}/${productValue._id}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(productValue)
        });

        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(resultado.message || `Error:${response.status}`);
        }
        return {
            ok: true,
            producto: resultado.producto
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: error.message || "Error en actualizar producto"
        }
    }
};

const borrarProducto = async (productoId) => {
    try {
        const response = await fetch(`${url}/${productoId}`, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-type": "application/json" }
        });

        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(resultado.message || `Error: ${response.status}`);
        }
        return {
            ok: true,
            producto: resultado.producto
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: error.message || "Error en borrado de producto"
        }
    }
};

export {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto,
}