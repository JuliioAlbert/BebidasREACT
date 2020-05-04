import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

//crear el context

export const ModalContext = createContext();

const ModalProvider = (props) => {

    //state del provider
    const [idreceta, guardarIdReceta] = useState(null);

    //Una vez teniendo una receta llamar api 
    const [info, guardarReceta] = useState({});

    useEffect(() => {


        const obtenerReceta = async () => {
            if (!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const respuesta = await axios.get(url);
            guardarReceta(respuesta.data.drinks[0]);
        }
        obtenerReceta();
    }, [idreceta]);

    return (
        <ModalContext.Provider
            value={{
                info,
                guardarIdReceta,
                guardarReceta
            
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;
