import React,{useState,useEffect} from 'react';
import DashboardProductoItem from './DashboardProductoItem';
import { getProductos} from "../../../../Firebase/FirebaseDB";
import LoaderInicio from '../../common/LoaderInicio';
const DashboardMenu = ({optionType, reload, setReload, busquedaProd, prodsFiltrados}) => {
    const [listaProds, setListaProds] = useState([])
    const [menuType,setMenuType] = useState('BURGERS')
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        getProductos("todo",9999).then(res=>{
            setListaProds(res)
            setLoading(false)
        })
    },[reload])// eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <>
            <div id="navFiltroExtra" style={{display:'flex'}}>
                <button onClick={() => setMenuType('BURGERS')}>BURGERS</button>
                <button onClick={() => setMenuType('BURGER DEL MES')}>BURGERS DEL MES</button>
                <button onClick={() => setMenuType('PROMOS')}>PROMOS</button>
                <button onClick={() => setMenuType('VEGANS')}>VEGANS</button>
                <button onClick={() => setMenuType('VEGGIES')}>VEGGIES</button>
                <button onClick={() => setMenuType('OTROS')}>OTROS</button>
            </div>
        
        
            <div className="dashboard-productos-container">
                {optionType!==undefined&&<h1 style={{color: '#FAC710'}}>{optionType.toUpperCase()+ ' ' + menuType.toUpperCase()}</h1>}
                
                {loading ? <LoaderInicio/> : <>
                    {busquedaProd ? <p className="noSeEncontro">No se encontraron productos</p> 
                    :
                    prodsFiltrados!==undefined && prodsFiltrados.length === 0 ? listaProds.filter(element => element.tipo === menuType).map(prod => <DashboardProductoItem optionType={optionType} key={prod.id} producto={prod} setReload={setReload} reload={reload}/>)
                    :
                    prodsFiltrados!==undefined && prodsFiltrados.map(prod => <DashboardProductoItem optionType={optionType} key={prod.id} producto={prod} setReload={setReload} reload={reload}/>)
                    }
                </>}
            </div>
        </>
    );
}

export default DashboardMenu;
