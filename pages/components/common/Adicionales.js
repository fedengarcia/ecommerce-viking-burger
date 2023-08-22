import React, { useState,useEffect, useContext } from 'react';
import { UseCartContext } from '../../../Context/CartContext';
import AdicionalesBurger from './AdicionalesBurger';
import AdicionalesCambios from './AdicionalesCambios';
import AdicionalesPapas from './AdicionalesPapas';
import Swal from 'sweetalert2';

const Adicionales = ({checked,setAdicionales,menuType,producto,setArrayAdMoment,arrayAdMoment}) => {

    const {restAdicionales,adMoment,adicionalesGenerales}=useContext(UseCartContext)

    const [adBurger,setAdBurger]=useState(false)
    const [cambioPapas,setCambioPapas]=useState(false)
    const [adPapas,setAdPapas]=useState(false)

    const [arrayBurger,setArrayBurger]=useState([])
    const [arrayPapas,setArrayPapas]=useState([])
    const [arrayCambio,setArrayCambio]=useState([])

    const [total,setTotal]=useState(0)
    const [total2,setTotal2]=useState(0)
    const [total3,setTotal3]=useState(0)

    const [botonReset,setBotonReset]=useState(false)

    const [cambioGeneral,setCambioGeneral]=useState(false)

    useEffect(()=>{
        const local = localStorage.getItem("AdicionalesFinVikings")
        if(local!==null){
            let localJSON=JSON.parse(local)
            if(producto.nombre===localJSON[1].nombre && producto.tipo===localJSON[1].tipo&&checked===localJSON[1].precio){
                setArrayBurger(localJSON[0]["adBurger"])
                if(localJSON[0]["cambioPapas"]!==undefined){
                    setArrayCambio(localJSON[0]["cambioPapas"])
                }else{
                    setArrayCambio([])
                }
                if(localJSON[0]["adPapas"]!==undefined){
                    setArrayPapas(localJSON[0]["adPapas"])
                }else{
                    setArrayPapas([])
                }

                calculoInit(localJSON[0]["adBurger"],localJSON[0]["cambioPapas"],localJSON[0]["adPapas"])
            }else{
                setArrayBurger(arrayAdMoment["adBurger"])
            }
        }else{
            setArrayBurger(arrayAdMoment["adBurger"])
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(arrayBurger.length!==0){
            let total=0
            for(let i=0;i<arrayBurger.length;i++){
                if(arrayBurger[i].cantidad!==0){
                    total=total+arrayBurger[i].cantidad*arrayBurger[i].precio
                }
            }
            if(total!==0){
                setBotonReset(true)
            }
        }
        if(arrayCambio.length!==0){
            setBotonReset(true)
        }
        if(arrayPapas.length!==0){
            setBotonReset(true)
        }
    },[arrayBurger,arrayCambio,arrayPapas])

    const calculoTotal=(number)=>{
        setTotal(number)
    }
    const calculoTotal2=(number)=>{
        setTotal2(number)
    }
    const calculoTotal3=(number)=>{
        setTotal3(number)
    }

    const calculoInit=(a,b,c)=>{
        let total=0
        for(let i=0;i<a.length;i++){
            if(a[i].cantidad!==0){
                total=total+a[i].cantidad*a[i].precio
            }
        }
        calculoTotal(total)

        if(b!==undefined){
            for(let i=0;i<adicionalesGenerales.length;i++){
                if(b.nombre===adicionalesGenerales[i].nombre && adicionalesGenerales[i].tipo==="RADIO"){
                    total=total+Number(adicionalesGenerales[i].precio)
                }
            }
            calculoTotal(total)
        }

        if(c!==undefined){
            for(let i=0;i<adicionalesGenerales.length;i++){
                for(let ii=0;ii<c.length;ii++){
                    if(c[ii].nombre===adicionalesGenerales[i].nombre && adicionalesGenerales[i].tipo==="CHECK"){
                        total=total+Number(adicionalesGenerales[i].precio)
                    }
                }
            }
            calculoTotal(total)
        }
    }


    const reset=()=>{
        Swal.fire({
            title: `¿Desea resetear los adicionales?`,
            showCancelButton: true,
            confirmButtonText: 'ACEPTAR',
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'
        }).then(async(result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Adicionales reseteados`,
                    color: '#FAC710',
                    confirmButtonColor: '#FAC710',
                    background: 'black'})
                const x = await restAdicionales()
                setArrayBurger(x["adBurger"])
                setArrayPapas([])
                setArrayCambio([])
                if(localStorage.getItem("AdicionalesFinVikings")){
                    localStorage.removeItem("AdicionalesFinVikings")
                }
                setAdicionales(false)
            }
        })
    }

    const handleAtras=()=>{
        if(cambioGeneral){
            Swal.fire({
                title: `¿Salir sin guardar los cambios?`,
                showCancelButton: true,
                confirmButtonText: 'ACEPTAR',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
              }).then(async(result) => {
                if (result.isConfirmed) {
                    restAdicionales()
                    setAdicionales(false)
                }
            })
        }else{
            setAdicionales(false)
        }
    }

    const handleConfirm=async()=>{
        let newArray={}
        Swal.fire({
            title: `Adicionales guardados`,
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'})
        if(arrayCambio.length!==0){
            newArray={...newArray,cambioPapas:arrayCambio}
        }
        if(arrayPapas.length!==0){
            newArray={...newArray,adPapas:arrayPapas}
        }
        newArray={...newArray,adBurger:arrayBurger}

        let localArray=[newArray,{nombre:producto.nombre,precio:checked,tipo:producto.tipo}]
        localStorage.setItem("AdicionalesFinVikings",JSON.stringify(localArray))

        await restAdicionales()
        setAdicionales(false)
    }
    
    return (
        <>
            <div className='container-adicionales' style={{backgroundColor:menuType === 'VEGANS' || menuType === 'VEGGIES' ?  "rgb(182, 234, 105,0.9)" : "rgba(255, 224, 110, 0.9)"}}>
                <p onClick={()=>handleAtras()} className="atras">ATRAS</p>
                <div className='adicional-container'>
                    <div className='adicional'>
                        <p onClick={()=>setAdBurger(!adBurger)} className="title">¿Extras a tu burger?</p>
                    </div>
                    <div className='adicional'>
                        <p onClick={()=>setCambioPapas(!cambioPapas)} className="title">¿Cambios en papas?</p>
                    </div>
                    <div className='adicional'>
                        <p onClick={()=>setAdPapas(!adPapas)} className="title">¿Más acompañamientos?</p>
                    </div>
                </div>
                <div style={{display:"flex"}} className="contain-botons">
                    {botonReset &&
                        <p className='boton-aceptar' onClick={()=>reset()}>RESETEAR</p>
                    }
                    <p className='boton-aceptar' onClick={()=>handleConfirm()}>CONFIRMAR ADICIONALES</p>
                </div>
                <p className='total-adicionales'>TOTAL ADICIONALES: ${total+total2+total3}</p>
            </div>
            {adBurger&&
                <div className='adicional-block' style={{backgroundColor:menuType === 'VEGANS' || menuType === 'VEGGIES' ?  "rgb(182, 234, 105)" : "rgba(255, 224, 110)"}}>
                    {adBurger&&<AdicionalesBurger setCambioGeneral={setCambioGeneral} calculoTotal={calculoTotal} producto={producto} setAdBurger={setAdBurger} arrayBurger={arrayBurger} setArrayBurger={setArrayBurger} arrayAdMoment={arrayAdMoment} setArrayAdMoment={setArrayAdMoment} ></AdicionalesBurger>}
                </div>
            }
            {cambioPapas&&
                <div className='adicional-block' style={{backgroundColor:menuType === 'VEGANS' || menuType === 'VEGGIES' ?  "rgb(182, 234, 105)" : "rgba(255, 224, 110)"}}>
                    {cambioPapas&&<AdicionalesCambios setCambioGeneral={setCambioGeneral} calculoTotal={calculoTotal3} producto={producto} setCambioPapas={setCambioPapas} setArrayAdMoment={setArrayAdMoment} arrayAdMoment={arrayAdMoment} arrayCambio={arrayCambio} setArrayCambio={setArrayCambio}></AdicionalesCambios>}
                </div>
            }
            {adPapas&&
                <div className='adicional-block' style={{backgroundColor:menuType === 'VEGANS' || menuType === 'VEGGIES' ?  "rgb(182, 234, 105)" : "rgba(255, 224, 110)"}}>
                    {adPapas&&<AdicionalesPapas setCambioGeneral={setCambioGeneral} calculoTotal={calculoTotal2} producto={producto} setAdPapas={setAdPapas} setArrayAdMoment={setArrayAdMoment} arrayAdMoment={arrayAdMoment} arrayPapas={arrayPapas} setArrayPapas={setArrayPapas}></AdicionalesPapas>}
                </div>
            }
            <div className='fondo-adicionales'></div>
        </>
    );
}

export default Adicionales;
