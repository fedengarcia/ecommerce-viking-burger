import React,{useContext, useEffect, useState} from 'react';
import Image from 'next/image';
import CardPrecio from './CardPrecios';
import burger1 from "../../../public/Diseño sin título (12).png"
import CardAgregar from './CardAgregar';
import CardAdicional from './CardAdicional';
import Adicionales from './Adicionales';
import { UseCartContext } from '../../../Context/CartContext';

const CardProducto = ({burgerdelmes, producto, menuType}) => {
  const {adMoment,setAdMoment,restAdicionales}=useContext(UseCartContext)

  const [checked, setChecked] = useState('');
  const [adicionales,setAdicionales]=useState(false)
  const [arrayAdMoment,setArrayAdMoment]=useState([])

  useEffect(()=>{
    setArrayAdMoment(adMoment)
  },[adMoment])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=>{
    restAdicionales()
  },[checked])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {producto!==undefined&& 
        <>
          {producto.tipo === "BURGER DEL MES" && menuType==="BURGERS" && burgerdelmes &&
            <div className='card-producto-container' style={{backgroundColor:menuType === 'VEGANS' || menuType === 'VEGGIES' ?  "rgb(182, 234, 105,0.8)" : "rgb(229 126 126 / 80%)"}}>
              
              <div className='card-producto'>
                
                <div className='card-producto-info'>
                    <div className='foto'>
                      {producto.img!=="" &&
                        <Image width={300} height={300} alt="Foto burger" src={producto.img}/>
                      }
                    </div>
                    {producto.tipo==="OTROS"&&
                      <div className='titulo-desc titulo-desc-otros'>
                        <h1>{producto.nombre}</h1>
                      </div>
                    }
                    {producto.tipo!=="OTROS"&&
                      <div className='titulo-desc'>
                        <h1>{producto.nombre}</h1>
                        <p className='descripcion'>{producto.descripcion}</p>
                      </div>
                    }
                </div>

                <div className='card-producto-actions'>
                  <CardPrecio producto={producto} checked={checked} setChecked={setChecked}/>
                  <div className='card-producto-buttons'>
                    {producto.tipo !== "OTROS" && producto.tipo !== "PROMOS" && producto.hasAditional && <CardAdicional tipoProd={producto.tipo} checked={checked} setAdicionales={setAdicionales}/>}
                    <CardAgregar producto={producto} checked={checked} setChecked={setChecked} arrayAdMoment={arrayAdMoment}/>
                  </div>
                </div>
              </div>
            </div>
          }
          {producto.tipo === menuType &&
            <div className='card-producto-container' style={{backgroundColor:menuType === 'VEGANS' || menuType === 'VEGGIES' ?  "rgb(182, 234, 105,0.8)" : "rgba(255, 224, 110, 0.8)"}}>
              
              <div className='card-producto'>
                
                <div className='card-producto-info'>
                    <div className='foto'>
                      {producto.img!=="" &&
                        <Image width={300} height={300} alt="Foto burger" src={producto.img}/>
                      }
                    </div>
                    {producto.tipo==="OTROS"&&
                      <div className='titulo-desc titulo-desc-otros'>
                        <h1>{producto.nombre}</h1>
                      </div>
                    }
                    {producto.tipo!=="OTROS"&&
                      <div className='titulo-desc'>
                        <h1>{producto.nombre}</h1>
                        <p className='descripcion'>{producto.descripcion}</p>
                      </div>
                    }
                </div>

                <div className='card-producto-actions'>
                  <CardPrecio producto={producto} checked={checked} setChecked={setChecked}/>
                  <div className='card-producto-buttons'>
                    {producto.tipo !== "OTROS" && producto.tipo !== "PROMOS" && producto.hasAditional && <CardAdicional tipoProd={producto.tipo} checked={checked} setAdicionales={setAdicionales}/>}
                    <CardAgregar producto={producto} checked={checked} setChecked={setChecked} arrayAdMoment={arrayAdMoment}/>
                  </div>
                </div>
              </div>
            </div>
          }
          {adicionales===true && <Adicionales checked={checked} setAdicionales={setAdicionales} menuType={menuType} producto={producto} setArrayAdMoment={setArrayAdMoment} arrayAdMoment={arrayAdMoment}></Adicionales>}
        </>
      }
    </>
  );
}

export default CardProducto;
