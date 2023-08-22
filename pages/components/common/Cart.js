import Image from 'next/image';
import React, { useContext } from 'react';
import { UseCartContext } from '../../../Context/CartContext';
import flecha from "../../../public/flecha-izq.png"
import CartContainer from './CartContainer';
import Form from './Form';

const Cart = ({setCartPage}) => {

  const {items} = useContext(UseCartContext)

    return (
        <div className='cart-container'>
            <div className='boton-atras' onClick={()=>setCartPage(false)}>
                <Image src={flecha} width={50} height={50} alt="FLECHA"/>
                <p>ATRAS</p>
            </div>
            
            <h3 className='cart-title'>TU PEDIDO</h3>
            
            {items.length===0?<p className='noHayProductos'>NO HAY PRODUCTOS</p>
            :
                <>
                    <div>
                        <CartContainer/>
                    </div>

                    <h3 className='cart-title'>FORMULARIO</h3>

                    <div>
                        <Form/>
                    </div>
                </>
            }
            {items.length===0&&<div style={{height:"50vh"}}></div>}
        </div>
    );
}

export default Cart;
