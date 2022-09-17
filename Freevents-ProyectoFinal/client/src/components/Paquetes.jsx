import React from "react";
import NavBar from "./NavBar";
import './Paquetes.css'
import Card from './Card'



const Paquetes = () => {  
return (
    <div>
    <NavBar></NavBar>


        <h1 className="Titulo"> Paquetes de servicios </h1>
        <div>
        <div className="row">
        <p>Ordenamiento : </p>
      <select >
      
        <option value='ascendente'>A-Z</option>
        <option value='descendente'>Z-A</option>
        <option value='ascendenteW'>Min-Max precio</option>
        <option value='descendenteW'>Max-Min precio</option>
      </select>

      <p>Servicios : </p>
      <select>
        <option>Todos</option>
        <option>Arreglos florales</option>
        <option>Dj</option>
        <option>Streaper</option>
        <option>Multimedia</option>
        <option>Transporte</option>
        <option>Catering</option>
      </select>
      </div>
      <Card></Card>
    </div>
    </div>
)
}

export default Paquetes;
