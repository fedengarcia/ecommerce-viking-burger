import React, {useEffect, useState } from 'react';
import Swal from 'sweetalert2';


const AdicionalesBurger = ({setCambioGeneral,calculoTotal,producto,setAdBurger,arrayBurger,setArrayBurger,arrayAdMoment,setArrayAdMoment}) => {

    const [huboCambios,setHuboCambios]=useState(false)

    useEffect(()=>{
        localStorage.setItem("AdicionalesBurgerVikings",JSON.stringify(arrayBurger))
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const handleAccept=()=>{
        setArrayAdMoment({...arrayAdMoment,adBurger:arrayBurger})
        Swal.fire({
            title: `Cambios guardados`,
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'})
        setAdBurger(false)
        let total=0
        for(let i=0;i<arrayBurger.length;i++){
            if(arrayBurger[i].cantidad!==0){
                total=total+arrayBurger[i].cantidad*arrayBurger[i].precio
            }
        }
        calculoTotal(total)
    }

    const handleResta=async(i)=>{
        setHuboCambios(true)
        setCambioGeneral(true)
        let newArray=arrayBurger

        if(newArray[i].cantidad!==0){
            newArray[i].cantidad=newArray[i].cantidad-1
        }

        await setArrayBurger([])
        setArrayBurger(newArray)
    }

    const handleSuma=async(i)=>{
        setCambioGeneral(true)
        setHuboCambios(true)
        let newArray=arrayBurger

        newArray[i].cantidad=newArray[i].cantidad+1
        await setArrayBurger([])
        setArrayBurger(newArray)
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
                    let arrayViejo=await localStorage.getItem("AdicionalesBurgerVikings")
                    setArrayBurger(JSON.parse(arrayViejo))
                    setAdBurger(false)
                }
            })
        }else{
            setAdBurger(false)
        }
    }

    return (
        <>
            {producto!==undefined&&

                <div className='adicionalesEs'>
                    <p onClick={()=>handleAtras()} className="atras">ATRAS</p>
                    <p className="title-1">¿Extras a tu burger?</p>
                    {producto.tipo==="BURGERS"&&
                        <div className='contador-container'>
                            {arrayBurger.map((adicional,i)=>
                                <div key={producto.nombre+adicional.nombre}>
                                    {adicional.tipo==="BURGERS"&&
                                        <div className='contador'>
                                            <div style={{display:'flex'}}>
                                                <p onClick={()=>handleResta(i)}>-</p>
                                                <p className='numero-contador'>{adicional.cantidad}</p>
                                                <p onClick={()=>handleSuma(i)}>+</p>
                                            </div>
                                            <p className='title' style={{marginLeft: '2.5em'}}>{adicional.nombre} ${adicional.precio}</p>
                                        </div>
                                    }
                                </div>
                                )
                            }
                        </div>
                    }
                    {producto.tipo==="VEGGIES"&&
                        <div className='contador-container'>
                            {arrayBurger.map((adicional,i)=>
                                <div key={producto.nombre+adicional.nombre}>
                                    {adicional.tipo==="VEGGIES"&&
                                        <div className='contador'>
                                            <div style={{display:'flex'}}>
                                                <p onClick={()=>handleResta(i)}>-</p>
                                                <p>{adicional.cantidad}</p>
                                                <p onClick={()=>handleSuma(i)}>+</p>
                                            </div>
                                            <p className='title' style={{marginLeft: '2.5em'}}>{adicional.nombre} ${adicional.precio}</p>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    }
                    {producto.tipo==="VEGANS"&&
                        <div className='contador-container'>
                            {arrayBurger.map((adicional,i)=>
                                <div key={producto.nombre+adicional.nombre}>
                                    {adicional.tipo==="VEGANS"&&
                                        <div className='contador'>
                                            <div style={{display:'flex'}}>
                                                <p onClick={()=>handleResta(i)}>-</p>
                                                <p>{adicional.cantidad}</p>
                                                <p onClick={()=>handleSuma(i)}>+</p>
                                            </div>
                                            <p className='title' style={{marginLeft: '2.5em'}}>{adicional.nombre} ${adicional.precio}</p>
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

export default AdicionalesBurger;
