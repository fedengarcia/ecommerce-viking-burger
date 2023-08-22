import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UseCartContext } from '../../../Context/CartContext';
import tacho from "../../../public/eliminar.png"
import { preciosTipos } from '../../../helper/CONSTANTS';

import CartAdicionales from './CartAdicionales';

const CartContainer = () => {
    const {items,removeItem,setItems,productos,getTotalPriceForm} = useContext(UseCartContext)


    const [total,setTotal]=useState(0)
    const [cartAdicionales,setCartAdicionales]=useState(false)
    const [productoAd,setProductoAd]=useState("")


    useEffect(()=>{
        setTotal(getTotalPriceForm)
    },[items])// eslint-disable-line react-hooks/exhaustive-deps

    const handleRemove=(i,prod)=>{
        Swal.fire({
            title: `Eliminar ${prod} del carrito`,
            showCancelButton: true,
            confirmButtonText: 'ELIMINAR',
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'
          }).then((result) => {
            if (result.isConfirmed) {
                removeItem(i)
                Swal.fire({
                    title: `${prod} eliminado correctamente`,
                    color: '#FAC710',
                    confirmButtonColor: '#FAC710',
                    background: 'black'})
            }
        })
    }

    const handleClick=async(prod)=>{
        if(prod.adicionales.length===0){
            Swal.fire({
                title: `${prod.title} no tiene adicionales`,
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'})
        }else{
            if(prod.adicionales["adBurger"]!==undefined || prod.adicionales["cambioPapas"]!==undefined || prod.adicionales["adPapas"]!==undefined){
                let total=0
                if(prod.adicionales["adBurger"]!==undefined){
                    for(let i=0;i<prod.adicionales["adBurger"].length;i++){
                        if(prod.adicionales["adBurger"][i].cantidad!==0){
                            total=total+prod.adicionales["adBurger"][i].cantidad
                        }
                    }
                }
                if(total!==0 || prod.adicionales["cambioPapas"]!==undefined || prod.adicionales["adPapas"]!==undefined){
                    await setProductoAd(prod)
                    setCartAdicionales(true)
                }else{
                    Swal.fire({
                        title: `${prod.title} no tiene adicionales`,
                        color: '#FAC710',
                        confirmButtonColor: '#FAC710',
                        background: 'black'})
                }
            }
        }
    }

    return (
        <div className='cart-container2'>
            {items.map((prod,i)=>
                <div key={i}>
                    {prod.id!=="impuestosMP"&&
                        <>
                            <div className='cart-card' style={prod.category_id==="VEGANS"||prod.category_id==="VEGGIES"?{backgroundColor:"#B6EA69"}:prod.category_id==="BURGER DEL MES"?{background:"rgb(229 126 126 / 80%)"}:{}} key={i} id={i}>
                                
                                <h2>{prod.title} 
                                    <span className='tamaño'>{
                                        prod.category_id==="OTROS" || prod.category_id==="PROMOS" ? "" :
                                    `   (${`${
                                            (prod.category_id === 'VEGANS' || prod.category_id === 'VEGGIES') ? preciosTipos.planta[prod.type]
                                            : prod.type2 === 'NUGGETS' ? preciosTipos.pollos[prod.type] 
                                            : preciosTipos.burger[prod.type]
                                        }`})
                                    `}
                                    </span>
                                </h2>
                                <div className='info-card'>
                                    <p className='precio'>$ {prod.unit_price}</p>
                                    <h3>{prod.category_id}</h3>
                                    {prod.category_id !== "OTROS" && prod.category_id!=="PROMOS" ? <button className='adicionales' onClick={()=>{handleClick(prod)}}>ADICIONALES</button> : <p style={{display:"none"}}>ADICIONALES</p>}
                                    <Image src={tacho} width={60} height={60} alt="ELIMINAR" onClick={()=>handleRemove(i,prod.title)}/>
                                </div>
                            </div>
                        </>
                    }
                    {cartAdicionales && <CartAdicionales setCartAdicionales={setCartAdicionales} productoAd={productoAd}/>}
                </div>
            )}
            <p className='total'>TOTAL PRODUCTOS: ${total}</p>
        </div>
    );
}

export default CartContainer;
