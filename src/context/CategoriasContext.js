import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//CREAR CONTEXT
export const CategoriasContext = createContext();

//Provider es donde se escuentra las funciones y state

const CategoriasProvider = (props) => {


    //Crear State 
    const [categorias, guardarCategorias] = useState([]);

    //Ejecutar llamado a la api
    useEffect(() => {

        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categorias = await axios.get(url);

            guardarCategorias(categorias.data.drinks);
        }
        obtenerCategorias();
    }, [])


    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;
