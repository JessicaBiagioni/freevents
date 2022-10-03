import React from "react";
import NavBarPaquetes from './NavBarPaquetes'
import './Paquetes.css'
import CardPaquetes from './CardPaquetes'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPacks, getServices, orderByNamePack, filterPacksByService, orderByPrice, getEvents, filterPacksByEvents } from "../actions";
import PaginadoPacks from "./PaginadoPacks"
//import Container from '@mui/material/Container'
// import NavbarNuevo from "./NavbarNuevo";
import { Link } from "react-router-dom";



const Paquetes = () => {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.events)
  const allPacks = useSelector((state) => state.packs)
  const allServicesP = useSelector((state) => state.services)
  const [/*order,*/ setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1) //pagina uno
  const [packsPerPage] = useState(4)// cantidad de cards x pagina
  const indexOfLastPack = currentPage * packsPerPage //8
  const indexOfFirstPack = indexOfLastPack - packsPerPage //0
  const currentPacks = allPacks.slice(indexOfFirstPack, indexOfLastPack)
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getEvents())
    dispatch(getPacks())
    dispatch(getServices())
  }, [dispatch]) //probar  sacar el dispatch

  // useEffect(() => {
  //   dispatch(filterPacksByEvents(allEvents))
  // }, [allEvents])


  const handleFilterService = (e) => {
    dispatch(filterPacksByService(e.target.value))
    setCurrentPage(1)

  }

  const handlefilterPacksByEvents = (e) => {
    // navigate("/paquetes")
    dispatch(filterPacksByEvents(e.target.value))
    setCurrentPage(1)
  }

  function handleSort(e) {
    e.preventDefault()
    console.log(e.target.value, "Soy el target")
    dispatch(orderByNamePack(e.target.value))
    setCurrentPage(1)
    console.log(e.target.value, "TARGET VALUE")
    setOrder(`Ordenado.${e.target.value}`)// HACER PAGINADO
    //ESTADO
  }
  function handleSortPrice(e) {
    e.preventDefault()
    console.log(e.target.value, "Soy el target")
    dispatch(orderByPrice(e.target.value))
    setCurrentPage(1)
    console.log(e.target.value, "TARGET VALUE")
    setOrder(`Ordenado.${e.target.value}`)// HACER PAGINADO
    //ESTADO
  }

  return (
    <div>
      {
        console.log(window.location.href.slice(window.location.href.indexOf("=") + 1), "AAAAAA PIMBA PIMBA")}
      <NavBarPaquetes />
      {/* <Container m={5} maxWidth="xs"> */}
      <img className="png" src={'https://res.cloudinary.com/freevents/image/upload/v1664336909/Imagens/foterfoto_ngklm8.png'} alt="" />
      <div className="barra">
        <h1 className="Titulo-proveedores"> PAQUETES DE SERVICIO </h1>
      </div>

      <div>
        <div className="row">
          <select onChange={e => { handleSort(e) }}>
            <option selected disabled>Ordenamiento </option>
            <option value='ascendente'>A-Z</option>
            <option value='descendente'>Z-A</option>
            {/* <option value='ascendenteW'>Min-Max precio</option>
            <option value='descendenteW'>Max-Min precio</option> */}
          </select>
          <select onChange={e => { handleSortPrice(e) }}>
            <option selected disabled>Precios</option>
            <option value='ascendente'>Menor a mayor precio</option>
            <option value='descendente'>Mayor a menor precio</option>
          </select>

          {/* <input  type="range" id="points" name="points" min="0" max="25000"></input> */}

          <select onChange={e => { handleFilterService(e) }}>
            <option selected disabled value='All'>Servicio</option>
            {allServicesP?.map(el => <option key={el.id} value={el.name}> {el.name} </option>)}
          </select>

          <select onChange={e => { handlefilterPacksByEvents(e) }}>
            <option selected disabled value='All'>Eventos</option>
            {allEvents?.map(el => <option key={el.id} value={el.name}> {el.name} </option>)}
          </select>


          {/* <select onChange={e => { handlePrice(e) }}>
            <option selected disabled>Rango precio</option>
            {allServicesP.map((t) =>
              <option> {t.price} </option>)}
          </select> */}

        </div>
      </div>
      <div className="grid">
        {currentPacks?.map((packs) => {
          console.log(packs.services)
          return (
            <div className='item'>
              <Link style={{ textDecoration: "none" }} to={`/detailPaquete/${packs.id}`}>
                <CardPaquetes
                  name={packs.name}
                  price={packs.price}
                  galery_image={packs.galery_image ? packs.galery_image : "https://www.dondeir.com/wp-content/uploads/2018/09/fiesta-1.jpg"}
                  events={packs.events.map(e => e.name + " ")}
                  services={packs.services?.map(s => s.name + " ")}
                  id={packs.id}
                />
              </Link>
            </div>
          )
        })}
      </div>
      <PaginadoPacks
        packsPerPage={packsPerPage}
        allPacks={allPacks.length}
        paginado={paginado}
      />
    </div>
  )
}

export default Paquetes;

