import { useEffect,useState } from "react"
import DashboardAddAdicional from "./DashboardAdicionales/DashboardAddAdicional"
import DashboardAddProducto from "./DashboardProductos/DashboardAddProducto"
import DashboardAdicionales from "./DashboardAdicionales/DashboardAdicionales"
import DashboardMenu from "./DashboardProductos/DashboardMenu"

export default function DashboardProductos () {
    const [prodsFiltrados, setProdsFiltrados]=useState([])
    const [adicionalesFiltrados, setAdicionalesFiltrados]=useState([])

    const [busquedaProd,setBusquedaProd]=useState(false);

    const [reload,setReload] = useState(false);
    const [reloadAdicionales,setReloadAdicionales] = useState(false)

    const [dispAddMenu,setDispAddMenu]=useState("none")
    const [dispAddAdicional,setDispAddAdicional]=useState("none")
    
    const [optionType,setOptionType] = useState('menu')


    const handleAddProduct = () => {
        setDispAddMenu("block")
    }
    
    const handleAddAdicional = () => {
        setDispAddAdicional("block")
    }
    


    return (
        <>
        <div className="dashboard-productos">
            
            {/* <DashboardBuscador adicionalesFiltrados={adicionalesFiltrados} setAdicionalesFiltrados={setAdicionalesFiltrados}  optionType={optionType} listaProds={listaProds} setProdsFiltrados={setProdsFiltrados} prodsFiltrados={prodsFiltrados} setBusquedaProd={setBusquedaProd}/> */}

            <div id="navProds" style={{display:'flex'}}>
                    <button onClick={() => setOptionType('menu')}>MENU</button>
                    <button onClick={() => setOptionType('adicionales')}>ADICIONALES</button>
            </div>

            {optionType === 'menu' 
            ?
                <DashboardMenu 
                    optionType={optionType}
                    busquedaProd={busquedaProd} 
                    reload={reload} 
                    setReload={setReload}
                    prodsFiltrados={prodsFiltrados}
                /> 
           
            : 
                <DashboardAdicionales 
                    optionType = {optionType}
                    reloadAdicionales={reloadAdicionales} 
                    setReloadAdicionales={setReloadAdicionales}
                    adicionalesFiltrados={adicionalesFiltrados}
                />
            }
            
        </div>

        <DashboardAddProducto style={{display:`${dispAddMenu}`}} setDispAddMenu={setDispAddMenu} dispAddMenu={dispAddMenu} reload={reload} setReload={setReload}/>
        <DashboardAddAdicional style={{display:`${dispAddAdicional}`}} setDispAddAdicional={setDispAddAdicional} dispAddAdicional={dispAddAdicional} reload={reloadAdicionales} setReload={setReloadAdicionales}/>
        
        
        <div className="container-add">
                {optionType === 'menu' ?
                <button style={{display:`${dispAddMenu === 'none' ? 'block': 'none'}`}} onClick={handleAddProduct}>AGREGAR PRODUCTO</button>
            :   
                <button style={{display:`${dispAddMenu === 'none' ? 'block': 'none'}`}} onClick={handleAddAdicional}>AGREGAR ADICIONAL</button>
                }
        </div>
        
        </>
        
    )
}