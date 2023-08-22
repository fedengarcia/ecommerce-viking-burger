import React, { useEffect, useState } from 'react';

const HorarioCerrado = () => {
    const fecha=new Date()
    
    const [hr,setHr]=useState(0)
    const [min,setMin]=useState(0)
    const [seg,setSeg]=useState(0)

    useEffect(()=>{
        setMin(formatoHora(fecha.getMinutes()))
        setHr(formatoHora(fecha.getHours()))
        setSeg(formatoHora(fecha.getSeconds()))
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const hora=()=>{
        const fecha2=new Date()

        if(formatoHora(fecha2.getHours())!==hr){
            setHr(formatoHora(fecha2.getHours()))
        }
        if(formatoHora(fecha2.getMinutes())!==min){
            setMin(formatoHora(fecha2.getMinutes()))
        }
        if(formatoHora(fecha2.getSeconds())!==seg){
            setSeg(formatoHora(fecha2.getSeconds()))
        }
    }

    const formatoHora=(hora)=>{
        if(hora<10)
        hora="0"+hora
        return hora
    }


    setInterval(hora,1000)

    return (
        <>
            <div id="reloj" className='desk'>
                <div className="reloj-contenedor" id="contenedor">
                    <p>LA COCINA ABRE 19:00hs</p>
                    <div id="hora">{hr}:{min}:{seg}</div>
                </div>
            </div>
            <div id="reloj" className='mobile'>
                <div className="reloj-contenedor" id="contenedor">
                    <p>LA COCINA ABRE 19:00hs</p>
                    <div id="hora">{hr}:{min}:{seg}</div>
                </div>
            </div>
        </>
    );
}

export default HorarioCerrado;
