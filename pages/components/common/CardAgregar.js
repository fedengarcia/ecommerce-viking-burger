import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UseCartContext } from '../../../Context/CartContext';

const CardAgregar = ({producto,checked,setChecked,arrayAdMoment}) => {

    const {items,productos,addItem,adicionalesGenerales} = useContext(UseCartContext)

    const handleAddItem=()=>{
        if(producto.tipo2 === "NUGGETS" && checked===""){
            Swal.fire({
            title: 'Debes seleccionar un acompañante de NUGGETS',
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'})
            return
        }else if((producto.tipo === "VEGANS" || producto.tipo === 'VEGGIES') && checked===""){
            Swal.fire({
            title: 'Debes seleccionar el tipo que deseas',
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'})
            return
        }else if(checked==="" && producto.tipo === "BURGERS"){
            Swal.fire({
            title: 'Debes seleccionar un tamaño de burger',
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'})
        }else{
            Swal.fire({
                title: `Agregar ${producto.nombre} al carrito`,
                showCancelButton: true,
                confirmButtonText: 'AGREGAR',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                    const local = localStorage.getItem("AdicionalesFinVikings")
                    let Array=[]
                    if(local!==null){
                        let localJSON=JSON.parse(local)
                        if(producto.nombre===localJSON[1].nombre && producto.tipo===localJSON[1].tipo&&checked===localJSON[1].precio){
                            Array=localJSON[0]
                        }
                    }
                    let UnitPrice=0
                    UnitPrice=Number(checked!==""?checked:producto.precio[0])
                    
                    
                    let total=0
                    if(Array["adBurger"]!==undefined){
                        for(let i=0;i<Array["adBurger"].length;i++){
                            if(Array["adBurger"][i].cantidad!==0){
                                total=total+Array["adBurger"][i].cantidad*Array["adBurger"][i].precio
                            }
                        }
                    }
                    if(Array["cambioPapas"]!==undefined){
                        for(let i=0;i<adicionalesGenerales.length;i++){
                            if(Array["cambioPapas"].nombre===adicionalesGenerales[i].nombre && adicionalesGenerales[i].tipo==="RADIO"){
                                total=total+Number(adicionalesGenerales[i].precio)
                            }
                        }
                    }
                    if(Array["adPapas"]!==undefined){
                        for(let i=0;i<adicionalesGenerales.length;i++){
                            for(let ii=0;ii<Array["adPapas"].length;ii++){
                                if(Array["adPapas"][ii].nombre===adicionalesGenerales[i].nombre && adicionalesGenerales[i].tipo==="CHECK"){
                                    total=total+Number(adicionalesGenerales[i].precio)
                                }
                            }
                        }
                    }
                    UnitPrice=UnitPrice+total

                    let tipo=""
                    let prd=""
                    for(let i=0;i<productos.length;i++){
                        if(productos[i].nombre===producto.nombre){
                            prd=(productos[i].precio).indexOf(checked,0)
                            tipo=prd
                        }
                    }

                    let Adicionales = false
                    let newArrayAdBurger = []
                    if(Array.length!==0){
                        for(let i =0;i<Array.adBurger.length;i++){
                            if(Array.adBurger[i].cantidad!==0){
                                Adicionales=true
                                newArrayAdBurger.push(Array.adBurger[i])
                            }
                        }
                        if(Adicionales){
                            Array["adBurger"]=newArrayAdBurger
                        }else{
                            delete Array["adBurger"]
                        }

                        if(!Adicionales){
                            if(Array.cambioPapas){
                                Adicionales=true
                            }
                            if(Array.adPapas){
                                Adicionales=true
                            }
                        }
                    }

                    addItem({
                        id: producto.id,
                        title: producto.nombre,
                        description: producto.descripcion,
                        picture_url: producto.img,
                        category_id: producto.tipo,
                        currency_id: "ARS", 
                        quantity: 1,
                        unit_price: UnitPrice,
                        adicionales:Adicionales ? Array : [],
                        type:tipo,
                        type2:producto.tipo2 ? producto.tipo2 : ""
                    })
        
                    if(document.getElementById(`${producto.tipo}${producto.nombre}0`)!==null){
                    document.getElementById(`${producto.tipo}${producto.nombre}0`).checked=false
                    }
                    if(document.getElementById(`${producto.tipo}${producto.nombre}1`)!==null){
                    document.getElementById(`${producto.tipo}${producto.nombre}1`).checked=false
                    }
                    if(document.getElementById(`${producto.tipo}${producto.nombre}2`)!==null){
                    document.getElementById(`${producto.tipo}${producto.nombre}2`).checked=false
                    }
                    if(document.getElementById(`${producto.tipo}${producto.nombre}3`)!==null){
                    document.getElementById(`${producto.tipo}${producto.nombre}3`).checked=false
                    }
        
                    setChecked('')
                    localStorage.removeItem("AdicionalesFinVikings")

                    Swal.fire({
                    title: `${producto.nombre} agregado correctamente`,
                    color: '#FAC710',
                    confirmButtonColor: '#FAC710',
                    background: 'black'})
                }
            })
        }
    }

    
    return (
        <button onClick={()=>handleAddItem()}>AGREGAR AL CARRITO</button>
    );
}

export default CardAgregar;
