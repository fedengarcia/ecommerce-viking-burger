import React, { useState } from 'react';
import CartWidget from './CartWidget';
import menu from "../../../public/menu.png"
import Image from 'next/image';

const NavbarTienda = ({setMenutype,setCartPage}) => {

    const [nav,setNav]=useState(false)

    return (
        <div className='navbar'>

            {/* NAVBAR PARA DESKTOP */}
            <ul className='navbar-desktop'>
                <li onClick={()=>setMenutype("BURGERS")}>BURGERS</li>
                <li className='green' onClick={()=>setMenutype("VEGGIES")}>VEGGIES</li>
                <li className='green' onClick={()=>setMenutype("VEGANS")}>VEGANS</li>
                <li onClick={()=>setMenutype("OTROS")}>OTROS</li>
                <li onClick={()=>setCartPage(true)}>
                    <CartWidget/>
                </li>
            </ul>
            <ul>
                <li onClick={()=>setMenutype("PROMOS")} className='nav-promo'>PROMOS</li>
            </ul>
            
            
            {/* NAVBAR PARA MOBILE */}
            <ul className='navbar-mobile'>
                <li className='menuDespegable'>
                    <div onClick={()=>setNav(!nav)}>
                        <p>MENU</p>
                        <Image src={menu} width={40} height={40} alt="MENU"/>
                    </div>
                    {nav &&
                        <ul>
                            <li onClick={()=>{setMenutype("BURGERS"),setNav(!nav)}}>BURGERS</li>
                            <li className='green' onClick={()=>{setMenutype("VEGGIES"),setNav(!nav)}}>VEGGIES</li>
                            <li className='green' onClick={()=>{setMenutype("VEGANS"),setNav(!nav)}}>VEGANS</li>
                            <li onClick={()=>{setMenutype("PROMOS"),setNav(!nav)}}>PROMOS</li>
                            <li onClick={()=>{setMenutype("OTROS"),setNav(!nav)}}>OTROS</li>
                        </ul>
                    }
                </li>
                <li className='cartWidget' onClick={()=>setCartPage(true)}>
                    <CartWidget/>
                </li>
            </ul>
        </div>
    );
}

export default NavbarTienda;
