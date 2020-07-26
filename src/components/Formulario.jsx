import React from 'react'
import { useState } from 'react';
import Error from  './Error';
import PropTypes from 'prop-types';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    //* inicializamos nuestro state
    const [error, guardarError] = useState(false)

    //* actualizamos el state
    const handleChange = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    const {ciudad, pais} = busqueda;

    //*para cuando el usuario da submit
    const handleSubmit = e => {
        e.preventDefault();

        //* validacion
        if(ciudad.trim() === '' || pais.trim() === ''){
            guardarError(true);
            return;
        }
        
        //* si se ingreso incorrectamente y despues si se hizo bien limpiamos el error
        guardarError(false);

        //*pasarlo al componente principal
        guardarConsultar(true);
    }

    return (  
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Ingresa los datos" /> : null}

            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad</label>
            </div>
            <div className="input-field col s12">
                <select 
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">--Selecciona un Pais--</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">Pais</label>
            </div>
            <div className="input-field col s12">
                <input 
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    value="Obener Clima"
                    type="submit"
                />
            </div>
        </form>
    );
}
 
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}

export default Formulario;