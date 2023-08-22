import Image from 'next/image';
import React from 'react';
import NavbarTienda from './NavbarTienda';
import logo from "/public/logo.png"
import { useRouter } from 'next/router';

const Banner = ({setCartPage, setMenutype, nav, compra}) => {
    const router = useRouter();

    return (
        <>
            <header className='header-container'>
                <div className="headertitle" onClick={()=>{
                    if(!compra){
                        setCartPage(false)
                    }else{
                        router.push('/')
                    }
                }}>
                    <div className='logo'>
                        <Image src={logo} height={200} width={200} alt="LOGO"/>
                    </div>
                    <div className='titulo'>
                        <h1 style={{textAlign:"center"}}>VIKINGS BURGERS</h1>
                    </div>
                </div>
                
                {nav&&
                    <NavbarTienda setMenutype={setMenutype} setCartPage={setCartPage}/>
                }

            </header>
        </>
    );
}

export default Banner;
