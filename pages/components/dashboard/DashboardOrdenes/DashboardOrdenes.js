import React,{useState, useEffect} from 'react';
import { getOrders,removeOrderFinal } from '../../../../Firebase/FirebaseDB';
import DashboardOrden from './DashboardOrden';
import LoaderInicio from '../../common/LoaderInicio';
import Swal from 'sweetalert2';

const DashboardOrdenes = () => {
    const [optionType,setOptionType] = useState('NO ENTREGADA')
    const [reload,setReload] = useState(false);
    const [orders, setOrders] = useState([]);
    const [ordersRechazada,setOrdersRechazadas]=useState([])
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getOrders("Orders").then(res => {
            setOrders(res)
            setLoading(false)
        })
        getOrders("OrdersFalses").then(res => {
            setOrdersRechazadas(res)
            setLoading(false)
        })
    }, [reload])// eslint-disable-line react-hooks/exhaustive-deps

    const deleteAllOrders=()=>{
        Swal.fire({
            title: 'ESTAS SEGURO?',
            showCancelButton: true,
            confirmButtonText: 'ELIMINAR',
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'
          }).then((result) => {
            if(result.isConfirmed){
                if(optionType === 'RECHAZADA')
                    ordersRechazada.forEach(order => {
                        removeOrderFinal(order.id, optionType).then(res => {
                            console.log(res)
                        })
                    });
                orders.forEach(order => {
                    removeOrderFinal(order.id, optionType).then(res => {
                        console.log(res)
                    })
                });
                setReload(!reload);

            }
           
          })
    }

    return (
        <>
            <div className='dashboard-ordenes'>
                <div id="navProds" style={{display:'flex'}}>
                    <button onClick={() => {setOptionType('ENTREGADA'), setReload(!reload)}}>ENTREGADAS</button>
                    <button onClick={() => {setOptionType('NO ENTREGADA'), setReload(!reload)}}>NO ENTREGADAS</button>
                    <button onClick={() => {setOptionType('RECHAZADA'), setReload(!reload)}}>RECHAZADAS</button>
                </div>
                {optionType!==undefined&&<h1 style={{color: '#FAC710'}}>{optionType.toUpperCase() + 'S'}</h1>}

                {loading ? <LoaderInicio/> : <>
                    <div className="ordenes-container">
                            {optionType === "NO ENTREGADA" ? 
                            <>
                                {orders.lenght!=0 && orders.filter(order=>order.entregado === false).map(order => <DashboardOrden order={order} setReload={setReload} reload={reload} key={order.id} entregado={optionType}/>)}
                            </>
                            : optionType === "ENTREGADA" ?
                            <>
                                {orders.lenght!=0 && orders.filter(order=>order.entregado === true).map(order => <DashboardOrden order={order} setReload={setReload} reload={reload} key={order.id} entregado={optionType}/>)}
                            </>
                            : optionType === "RECHAZADA" ?
                            <>
                                {ordersRechazada.lenght!=0 && ordersRechazada.map(order => <DashboardOrden order={order} setReload={setReload} reload={reload} key={order.id} entregado={optionType}/>)}
                            </>
                            : <></>
                            }
                    </div>
                </>}
            </div>
            <div className="container-add">
                <button onClick={()=>deleteAllOrders()}>ELIMINAR TODO</button>
            </div>
        </>
    );
}

export default DashboardOrdenes;
