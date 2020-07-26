import React from 'react';
import { Fragment } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {

  //* nuestros state de formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  
  //*
  const [consultar, guardarConsultar] = useState(false);
  //* nuestro state de el resultado de nuestra api
  const [resultado, guardarResultado] = useState({});
  //* state de nuestro erro
  const [error, guardarError] = useState(false);  
  //* extraemos el valor del state
  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarApi = async () => {
      
    if(consultar){
      const appId = '898bf4037a91d17df4a06295e90444e3';
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado);
      guardarConsultar(false);

      //* detecta si no se encontro la ciudad
      if(resultado.cod === "404"){
        guardarError(true);
      } else{
        guardarError(false);
      }
    }

    }
    consultarApi();
    // eslint-disable-next-line
  }, [consultar]);

  let componente;

  if(error){
    componente = <Error mensaje="No hay Resultados" />
  }else{
    componente = <Clima 
    resultado={resultado}
  />
  }

  return (
    <Fragment>
      <Header 
      titulo = 'Clima React'/>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
