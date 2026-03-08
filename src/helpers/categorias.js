const url = "http://localhost:4500/api/category/";

const getCategorias = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getCategorias };
