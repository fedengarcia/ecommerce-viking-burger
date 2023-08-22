import React, { useState,useEffect } from 'react';
import DashboardAdicionalItem from './DashboardAdicionalItem';
import {getAdicionalesGenerales, getAdicionalesBurger } from "../../../../Firebase/FirebaseDB"
import LoaderInicio from '../../common/LoaderInicio';

const DashboardAdicionales = ({optionType, reloadAdicionales, setReloadAdicionales, adicionalesFiltrados, busquedaAdicionales}) => {
    const [adicionalType, setAdicionalType] = useState('generales')
    const [listaAdicionalesBurger,setListaAdicionalesBurger]=useState([])
    const [listaAdicionalesGenerales,setListaAdicionalesGenerales]=useState([])
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        getAdicionalesGenerales("todo",9999).then(res=>{
            setListaAdicionalesGenerales(res)
            setLoading(false)
        })
        getAdicionalesBurger("todo",9999).then(res=>{
            setListaAdicionalesBurger(res)
            setLoading(false)
        })

    },[reloadAdicionales])// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            <div id="navFiltroExtra" style={{display:'flex'}}>
                <button onClick={() => setAdicionalType('generales')}>GENERALES</button>
                <button onClick={() => setAdicionalType('burgers')}>BURGERS</button>
            </div>

            <div className="dashboard-productos-container">
                {optionType!==undefined&&<h1 style={{color: '#FAC710'}}>{optionType.toUpperCase()+ ' ' + adicionalType.toUpperCase()}</h1>}


                {loading ? <LoaderInicio/> : <>

                    {adicionalType === 'generales' 
                    ? (listaAdicionalesGenerales.length > 0 ? 
                        <>
                            {listaAdicionalesGenerales.map(adicional => <DashboardAdicionalItem  key={adicional.id} adicional={adicional} setReloadAdicionales={setReloadAdicionales} reloadAdicionales={reloadAdicionales} adicionalType={adicionalType}/>)}
                        </>
                        :
                        <p style={{marginTop: "2em", textAlign:'center'}}>No hay adicionales generales cargados.<br></br> Para cargar haga click en el boton de abajo a la derecha.</p>)
                    : (listaAdicionalesBurger.length > 0 ? 
                    <>
                        {listaAdicionalesBurger.map(adicional => <DashboardAdicionalItem  key={adicional.id} adicional={adicional} setReloadAdicionales={setReloadAdicionales} reloadAdicionales={reloadAdicionales} adicionalType={adicionalType}/>)}                    </>
                    :
                    <p style={{marginTop: "2em", textAlign:'center'}}>No hay adicionales burger cargados.<br></br> Para cargar haga click en el boton de abajo a la derecha.</p>)
                    
                    }
                </>}
                    
                
                
            </div>
        </>

    );
}

export default DashboardAdicionales;
