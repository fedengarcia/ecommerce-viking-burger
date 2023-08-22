import React, { useContext, useEffect, useState } from 'react';
import { UseCartContext } from '../../../Context/CartContext';
import { getProductos } from '../../../Firebase/FirebaseDB';
import CardProducto from './CardProducto';
import NavbarTienda from './NavbarTienda';

const Tienda = ({menuType}) => {

    const {productos} = useContext(UseCartContext)
    const [totalProductos, setTotalProductos] = useState(0);
    const [cargando,setCargando]=useState(false)
    const [display,setDisplay]=useState(true)
    
    return (
        <>
            {productos!==undefined &&
                <div className='tienda-container' style={{borderTop:menuType === 'VEGANS' || menuType === 'VEGGIES' ? "2px solid #B6EA69" : "2px solid #FAC710" }}>
                    <h3 className='typeMenu' style={{backgroundColor:menuType === 'VEGANS' || menuType === 'VEGGIES' ?  "rgb(182, 234, 105,0.7)" : "rgba(255, 233, 160, 0.7)"}}>{menuType}</h3>
                    <p className='texto-tienda'>Todas nuestras burgers traen caja de papas</p>
                    {menuType!=="PROMOS" && menuType!=="OTROS" &&
                        <p className='texto-tienda'>¡No te olvides de agregar tus adicionales!</p>
                    }
                    <div className='cards-container'>
                        {productos.map(producto => producto.tipo === "BURGER DEL MES" && <CardProducto burgerdelmes={true} menuType={menuType} producto={producto} key={producto.id}></CardProducto>) }
                        {productos.map(producto => <CardProducto burgerdelmes={false} menuType={menuType} producto={producto} key={producto.id}></CardProducto>) }
                    </div>
                </div>
            }
        </>
    );
}

export default Tienda;
