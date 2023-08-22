import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { UseCartContext } from '../../../Context/CartContext';

const CardAdicional = ({tipoProd,checked,setAdicionales}) => {

    const {items,addItem,restAdicionales} = useContext(UseCartContext)

    const handleAdicional=async()=>{
        if((tipoProd === "VEGANS" || tipoProd === 'VEGGIES') && checked===""){
            Swal.fire({
            title: 'Debes seleccionar el tipo que deseas',
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'})
            return
        }else if(checked==="" && tipoProd === "BURGERS"){
            Swal.fire({
            title: 'Debes seleccionar un tamaño de burger',
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'})
        }else{
            setAdicionales(true)
        }
    }
    
    return (
        <button onClick={()=>handleAdicional()}>ADICIONALES</button>
    );
}

export default CardAdicional;
