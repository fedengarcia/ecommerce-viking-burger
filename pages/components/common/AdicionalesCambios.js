import React, { useContext, useEffect, useState } from 'react';
import { UseCartContext } from '../../../Context/CartContext';
import Swal from 'sweetalert2';

const AdicionalesCambios = ({setCambioGeneral,calculoTotal,producto,setCambioPapas,arrayCambio,setArrayCambio,setArrayAdMoment,arrayAdMoment}) => {

    const {adicionalesGenerales}=useContext(UseCartContext)

    const [huboCambios,setHuboCambios]=useState(false)

    useEffect(()=>{
        localStorage.setItem("AdicionalesCambioVikings",JSON.stringify(arrayCambio))
    },[])// eslint-disable-line react-hooks/exhaustive-deps



    const chequeo=(name)=>{
        if(arrayCambio.length===0 && name==="Por Defecto"){
            return true
        }
        if(arrayCambio?.nombre === name){
            return true
        }
    }

    const handleAccept=()=>{
        setArrayAdMoment({...arrayAdMoment,cambioPapas:arrayCambio})
        Swal.fire({
            title: `Cambios guardados`,
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'})
        let total=0
        for(let i=0;i<adicionalesGenerales.length;i++){
            if(arrayCambio?.nombre === adicionalesGenerales[i].nombre && adicionalesGenerales[i].tipo==="RADIO"){
                total=total+Number(adicionalesGenerales[i].precio)
            }
        }
        calculoTotal(total)
        setCambioPapas(false)
    }

    const handleChange=(e)=>{
        setHuboCambios(true)
        setCambioGeneral(true)
        if(e.nombre !== "Por defecto"){
            setArrayCambio({
                nombre: e.nombre,
                precio: e.precio
            })
        }else{
            setArrayCambio([])
        }
    }

    const handleAtras=()=>{
        if(huboCambios){
            Swal.fire({
                title: `Perderas los cambios`,
                showCancelButton: true,
                confirmButtonText: 'ACEPTAR',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
              }).then(async(result) => {
                if (result.isConfirmed) {
                    let arrayViejo=await localStorage.getItem("AdicionalesCambioVikings")
                    setArrayCambio(JSON.parse(arrayViejo))
                    setCambioPapas(false)
                }
            })
        }else{
            setCambioPapas(false)
        }
    }

    return (
        <>
            {producto!==undefined &&
                <div className='adicionalesEs'>
                    <p onClick={()=>handleAtras()} className="atras">ATRAS</p>
                    <p className="title-1">¿Cambios en papas?</p>
                    {producto.tipo==="BURGERS"&&
                        <div className='contador-container'>
                            <div className='contador'>
                                <input type="radio" id={"radioDefecto"} name={`${producto.nombre}radio`} onChangeCapture={()=>{setArrayCambio("Por Defecto"),setHuboCambios(true)}} defaultChecked={chequeo("Por Defecto")}/>
                                <label className='title' htmlFor={"radioDefecto"} style={{cursor:"pointer"}}>Por defecto</label>
                            </div>
                            {adicionalesGenerales.map(adicional=>
                                <div key={producto.nombre+adicional.nombre}>
                                    {adicional.tipo==="RADIO" && adicional.tipo2 === "toBurger" &&
                                        <div className='contador'>
                                            <input type="radio" id={adicional.nombre} name={`${producto.nombre}radio`} onChangeCapture={()=>handleChange(adicional)} defaultChecked={chequeo(adicional)}/>
                                            <label className='title' htmlFor={adicional.nombre} style={{cursor:"pointer"}}>{adicional.nombre} ${adicional.precio}</label>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    }
                    {producto.tipo==="VEGGIES"&&
                        <div className='contador-container'>
                            <div className='contador'>
                                <input type="radio" id={"radioDefecto"} name={`${producto.nombre}radio`} onChangeCapture={()=>{setArrayCambio("Por Defecto"),setHuboCambios(true)}} defaultChecked={chequeo("Por Defecto")}/>
                                <label className='title' htmlFor={"radioDefecto"} style={{cursor:"pointer"}}>Por defecto</label>
                            </div>
                            {adicionalesGenerales.map(adicional=>
                                <div key={producto.nombre+adicional.nombre}>
                                    {adicional.tipo==="RADIO" && adicional.tipo2 === "toVeggie" &&
                                        <div className='contador'>
                                            <input type="radio" id={adicional.nombre} name={`${producto.nombre}radio`}  onChangeCapture={()=>handleChange(adicional)} defaultChecked={chequeo(adicional.nombre)}/>
                                            <label className='title' htmlFor={adicional.nombre} style={{cursor:"pointer"}}>{adicional.nombre} ${adicional.precio}</label>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    }
                    {producto.tipo==="VEGANS"&&
                        <div className='contador-container'>
                            <div className='contador'>
                                <input type="radio" id={"radioDefecto"} name={`${producto.nombre}radio`} onChangeCapture={()=>{setArrayCambio("Por Defecto"),setHuboCambios(true)}} defaultChecked={chequeo("Por Defecto")}/>
                                <label className='title' htmlFor={"radioDefecto"} style={{cursor:"pointer"}}>Por defecto</label>
                            </div>
                            {adicionalesGenerales.map(adicional=>
                                <div key={producto.nombre+adicional.nombre}>
                                    {adicional.tipo==="RADIO" && adicional.tipo2 === "toVegan" &&
                                        <div className='contador'>
                                            <input type="radio" id={adicional.nombre} name={`${producto.nombre}radio`}  onChangeCapture={()=>handleChange(adicional)} defaultChecked={chequeo(adicional.nombre)}/>
                                            <label className='title' htmlFor={adicional.nombre} style={{cursor:"pointer"}}>{adicional.nombre} ${adicional.precio}</label>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    }
                    <div style={{display:"flex"}}>
                        <p className='boton-aceptar' onClick={()=>handleAccept()}>CONFIRMAR CAMBIOS</p>
                    </div>
                </div>
            }
        </>
    );
}

export default AdicionalesCambios;
