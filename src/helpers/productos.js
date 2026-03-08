const url = "http://localhost:4500/api/product/";

const getProductos = async (limite = 30, inicio = 0) => {
  try {
    const response = await fetch(url + `?limite=${limite}&desde=${inicio}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getProductos };
