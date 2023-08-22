import { useEffect, useState } from "react";
import DashboardProductos from "./DashboardProductos";
import DashboardOrdenes from "./DashboardOrdenes/DashboardOrdenes";
import DashboardVentas from './DashboardVentas';

export default function DashboardContainer () {
    const [nav,setNav] = useState('productos')

    useEffect(()=>{
        if(localStorage.getItem("OrdenImpresa")){
            setNav('ordenes')
            localStorage.removeItem("OrdenImpresa")
        }
    },[])

    return (
        <div className="dashboard-container">

            <div className="dashboard-title">
                <h1>VIKINGS BURGER</h1>
                <h2>DASHBOARD</h2>
            </div>

            <div id="navDash" style={{display:'flex'}}>
                <a style={{borderBottom: nav === 'productos' ? '1px solid #FAC710' : '1px solid transparent', color: nav === 'productos' ? '#FAC710' : 'black'}} onClick={() => setNav('productos')}>PRODUCTOS</a>
                <a style={{borderBottom: nav === 'ordenes' ? '1px solid #FAC710' : '1px solid transparent', color: nav === 'ordenes' ? '#FAC710' : 'black'}} onClick={() => setNav('ordenes')}>ORDENES</a>
                {/* <a style={{borderBottom: nav === 'ventas' ? '1px solid #FAC710' : '1px solid transparent', color: nav === 'ventas' ? '#FAC710' : 'black'}} onClick={() => setNav('ventas')}>VENTAS</a> */}
            </div>

            {/* <h3>{nav.toUpperCase()}</h3> */}

            {nav === 'productos' && <DashboardProductos/>}
            {nav === 'ordenes' && <DashboardOrdenes />}
            {/* {nav === 'ventas' && <DashboardVentas/>} */}

        </div>
            
    )
}