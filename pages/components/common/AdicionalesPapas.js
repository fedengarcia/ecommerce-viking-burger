import React, { useContext, useEffect, useState } from 'react';
import { UseCartContext } from '../../../Context/CartContext';
import Swal from 'sweetalert2';

const AdicionalesPapas = ({setCambioGeneral,calculoTotal,producto,setAdPapas,arrayPapas,setArrayPapas,setArrayAdMoment,arrayAdMoment}) => {

    const {adicionalesGenerales}=useContext(UseCartContext)

    const [huboCambios,setHuboCambios]=useState(false)


    useEffect(()=>{
       localStorage.setItem("AdicionalesPapasVikings",JSON.stringify(arrayPapas))
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const chequeo=(name)=>{
        for(let i=0;i<arrayPapas.length;i++){
            if(arrayPapas[i].nombre === name){
                return true
            }
        }
    }
    
    const handleAccept=()=>{
        setArrayAdMoment({...arrayAdMoment,adPapas:arrayPapas})
        Swal.fire({
            title: `Cambios guardados`,
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'})
        setAdPapas(false)
        let total=0
        for(let i=0;i<adicionalesGenerales.length;i++){
            for(let ii=0;ii<arrayPapas.length;ii++){
                if(arrayPapas[ii].nombre === adicionalesGenerales[i].nombre && adicionalesGenerales[i].tipo==="CHECK"){
                    total=total+Number(adicionalesGenerales[i].precio)
                }
            }
        }
        calculoTotal(total)
    }
        
    const handleCheck=async(e)=>{
        setHuboCambios(true)
        setCambioGeneral(true)
        if(document.getElementById(e.nombre).checked){
            let array = arrayPapas
            array.push({
                nombre: e.nombre,
                precio: e.precio
            })
            setArrayPapas(array)
        }else{
            let newArray=[]
            for(let i = 0;i<arrayPapas.length;i++){
                if(arrayPapas[i].nombre !== e.nombre){
                    newArray.push(arrayPapas[i])
                }
            }
            setArrayPapas(newArray)
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
                    let arrayViejo=await localStorage.getItem("AdicionalesPapasVikings")
                    setArrayPapas(JSON.parse(arrayViejo))
                    setAdPapas(false)
                }
            })
        }else{
            setAdPapas(false)
        }
    }

    return (
        <>
            {producto!==undefined&&
                <div className='adicionalesEs'>
                    <p onClick={()=>handleAtras()} className="atras">ATRAS</p>
                    <p className="title-1">¿Más acompañamientos?</p>
                    {producto.tipo==="BURGERS"&&
                        <div className='contador-container'>
                            {adicionalesGenerales.map(adicional=>
                                <div key={producto.nombre+adicional.nombre}>
                                    {adicional.tipo==="CHECK" && adicional.tipo2 === "toBurger" &&
                                        <div className='contador'>
                                            <input type="checkbox" id={adicional.nombre} name={`${producto.nombre}check`} defaultChecked={chequeo(adicional.nombre)} onClick={()=>handleCheck(adicional)}/>
                                            <label className='title' htmlFor={adicional.nombre} style={{cursor:"pointer"}}>{adicional.nombre} ${adicional.precio}</label>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    }
                    {producto.tipo==="VEGGIES"&&
                        <div className='contador-container'>
                            {adicionalesGenerales.map(adicional=>
                                <div key={producto.nombre+adicional.nombre}>
                                    {adicional.tipo==="CHECK" && adicional.tipo2 === "toVeggie" &&
                                        <div className='contador'>
                                            <input type="checkbox" id={adicional.nombre} name={`${producto.nombre}check`} defaultChecked={chequeo(adicional.nombre)} onClick={()=>handleCheck(adicional)}/>
                                            <label className='title' htmlFor={adicional.nombre} style={{cursor:"pointer"}}>{adicional.nombre} ${adicional.precio}</label>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    }
                    {producto.tipo==="VEGANS"&&
                        <div className='contador-container'>
                            {adicionalesGenerales.map(adicional=>
                                <div key={producto.nombre+adicional.nombre}>
                                    {adicional.tipo==="CHECK" && adicional.tipo2 === "toVegan" &&
                                        <div className='contador'>
                                            <input type="checkbox" id={adicional.nombre} name={`${producto.nombre}check`} defaultChecked={chequeo(adicional.nombre)} onClick={()=>handleCheck(adicional)}/>
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

export default AdicionalesPapas;
