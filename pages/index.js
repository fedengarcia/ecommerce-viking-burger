import React,{useState,useEffect, useContext} from 'react';
import { UseCartContext } from '../Context/CartContext';
import Cart from './components/common/Cart';
import Banner from './components/common/Header';
import LoaderInicio from './components/common/LoaderInicio';
import Tienda from './components/common/Tienda';
import Image from 'next/image';
import whap from "../public/WhatsApp.svg.png"
import HorarioCerrado from './components/common/HorarioCerrado';

export default function Home() {

  const [menuType,setMenutype]=useState('BURGERS')
  const [cartPage, setCartPage]=useState(false)
  const {productos} = useContext(UseCartContext)

  let fecha=new Date()
  let hr = fecha.getHours()

  return (
    <div className="root">
      {19 > 20?<HorarioCerrado/>:
        <>
          {!cartPage ? 
            <>
              {productos.length === 0 ?
                <LoaderInicio/>
                :
                <>
                  <Banner setCartPage={setCartPage} setMenutype={setMenutype} nav={true}/>
                  <Tienda menuType={menuType}/>
                </>
              }
            </>
            :
            <>
              <Banner setCartPage={setCartPage} setMenutype={setMenutype} nav={false}/>
              <Cart setCartPage={setCartPage}/>
            </>
          }
          {productos.length!==0 && 
            <div className='whatsapp'>
              <p>CONSULTAS</p>
              <a href="https://wa.me/543487700487?text=Hola Vikings! Tengo una consulta" target="_blank" rel="noreferrer">
                <Image src={whap} width={100} height={100} alt="WHAP"></Image>
              </a>
            </div>
          }
          {productos.length!==0&&
            <a href='mailto:ftpaginasweb@gmail.com' className='mail-contacto'>
              <h2>Desarrollado por FT</h2>
            </a>
          }
        </>
      }
    </div>
  )
}
