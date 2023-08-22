import React,{Fragment, useEffect, useState} from 'react';
import { preciosTipos } from '../../../helper/CONSTANTS';

const CardPrecio = ({producto,checked,setChecked}) => {

    const [arrayProd,setArrayProd]=useState([])


    useEffect(()=>{
        setArrayProd(producto.precio)
    },[producto])



    return (
    <div className='card-producto-checks'>

        {/* BURGERS, VEGANS, VEGGIES Y NUGGETS */}
        {arrayProd.map((prod,i)=>{

            return(
                <Fragment  key={producto.nombre+producto.precio[i]}>
                    {producto.precio[i]!==""&&
                        <>
                            <input type="radio" id={`${producto.tipo}${producto.nombre}${i}`} name={`${producto.tipo}${producto.nombre}`} onChange={() => setChecked(producto.precio[i])}/>
                            <label htmlFor={`${producto.tipo}${producto.nombre}${i}`}>
                                {`${(producto.tipo === 'VEGANS' || producto.tipo === 'VEGGIES') ? preciosTipos.planta[i]
                                    : producto.tipo2 === 'NUGGETS' ? preciosTipos.pollos[i] 
                                    : producto.tipo === "BURGERS" ? preciosTipos.burger[i]
                                    : producto.tipo === "BURGER DEL MES" ? preciosTipos.burgerdelmes[i]
                                    : "OPCIÓN"
                                }`} ${producto.precio[i]}
                            </label>
                        </>
                    }
                </Fragment>
            )
        })}
        

    </div>
    );
}

export default CardPrecio;
