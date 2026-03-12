function CategoriasLista({ indice, categoria }) {
    return <option value={indice + 1}>{categoria?.nombre}</option>
};
export default CategoriasLista