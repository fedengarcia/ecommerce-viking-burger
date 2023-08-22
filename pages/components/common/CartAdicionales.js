import React, { useContext, useEffect, useState } from 'react';

const CartAdicionales = ({setCartAdicionales,productoAd}) => {
    
    const [adBurger,setAdBurger]=useState("")
    const [adPapas,setAdPapas]=useState("")
    const [adCambio,setAdCambio]=useState("")

    useEffect(()=>{
        if(productoAd.adicionales.adBurger!==undefined){
            setAdBurger(productoAd.adicionales.adBurger)
        }else{
            setAdBurger("")
        }
        if(productoAd.adicionales.adPapas!==undefined){
            setAdPapas(productoAd.adicionales.adPapas)
        }else{
            setAdPapas("")
        }
        if(productoAd.adicionales.cambioPapas!==undefined){
            setAdCambio(productoAd.adicionales.cambioPapas)
        }else{
            setAdCambio("")
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div className='cart-adicionales'>
            <div className='container'>
                <p onClick={()=>setCartAdicionales(false)} className="atras">ATRAS</p>
                <div className='adicionales'>
                    {adBurger!==""&&
                        <div style={{borderBottom:"5px double black"}}>
                            {adBurger.map((prod,i)=>
                            <div key={i}>
                                {prod.cantidad!==0&&
                                    <p>{prod.cantidad} {prod.nombre}</p>  
                                }
                            </div>
                            )}
                        </div>
                    }
                    {adPapas!==""&&
                        <div style={{borderBottom:"5px double black"}}>
                            {adPapas.map((prod,i)=>
                                <div key={i}>
                                    <p>{prod.nombre}</p>
                                </div>
                            )}
                        </div>
                    }
                    {adCambio!==""&&
                        <div key={`adCambio ${adCambio.nombre}`}>
                            <p>{adCambio.nombre}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default CartAdicionales;
