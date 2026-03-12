const url = "http://localhost:4500/api/cancha/";

const getCanchas = async (limite = 20, inicio = 0) => {
  try {
    const response = await fetch(url + `?limite=${limite}&desde=${inicio}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getCanchas };
