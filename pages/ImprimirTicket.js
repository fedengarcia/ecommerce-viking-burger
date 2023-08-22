import React,{useContext, useEffect,useState} from 'react'
import { UseCartContext } from '../Context/CartContext';
import { getOrderbyId,setOrderEntregada } from '../Firebase/FirebaseDB'
import { preciosTipos } from '../helper/CONSTANTS';
import { useRouter } from 'next/router';

export default function ImprimirTicket() {
    const router = useRouter();

    const {productos}=useContext(UseCartContext)

    const [order, setOrder] = useState(null);
    const [horaExacta,setHoraExacta]=useState("")
    const [arrayCountItems,setArrayCountItems] = useState([]);


    const getIndex = (id, array) =>{
        return array.findIndex(item => item.id === id);
    }

    useEffect(() => {
        let query = new URLSearchParams(window.location.search)
        getOrderbyId(query.get("id")).then(res => {
            setOrder(res)
            return res
        }).then(res => {
            let items = []
            res.items.forEach(item => {
                if(item.adicionales.length === 0) {
                    var result = getIndex(item.id,items)
                    
                    if(result === -1){
                        items.push({
                            ...item,
                        })
                    }else if(item.type === items[result].type){
                        if(items[result].adicionales.length!==0){
                            let cambioQuantiy=false
                            for(let i=0;i<items.length;i++){
                                if(items[i].id===item.id && items[i].type===item.type && items[i].adicionales.length===0){
                                    items[i].quantity=items[i].quantity + 1
                                    cambioQuantiy=true
                                }
                            }
                            if(!cambioQuantiy){
                                items.push({
                                    ...item,
                                })
                            }
                        }else{
                            items[result].quantity = items[result].quantity + 1
                        }
                    }else{
                        let cambioQuantiy=false
                            for(let i=0;i<items.length;i++){
                                if(items[i].id===item.id && items[i].type===item.type && items[i].adicionales.length===0){
                                    items[i].quantity=items[i].quantity + 1
                                    cambioQuantiy=true
                                }
                            }
                            if(!cambioQuantiy){
                                items.push({
                                    ...item,
                                })
                            }
                    }
                }else{
                    items.push({
                        ...item,
                    })
                }
            });
            setArrayCountItems(items)
        })
        let currentTime=new Date()
        let minutes=currentTime.getMinutes()
        setHoraExacta(`${currentTime.getHours()}:${minutes<10?0:""}${minutes}`)
    }, []);




    useEffect(() => {
        let query = new URLSearchParams(window.location.search)
        if(order)
            setTimeout(async () => {
                window.print()
                localStorage.setItem("OrdenImpresa",true)
                await setOrderEntregada(query.get("id"),true)
                router.replace(`/Dashboard`)
            }, 2000);
    }, [order]);// eslint-disable-line react-hooks/exhaustive-deps


  return (<>
    {order && <div className='window-print-container'>
        <h1 style={{fontWeight:"600",letterSpacing:"0.5px",fontSize:"35px"}}>VIKINGS BURGER</h1>
        <br></br>
        <h2 style={{fontWeight:"300",marginTop:"-10px"}}>@vikingsburgerss</h2>
        <div style={{width: '100%', height: '1px', backgroundColor:'black'}}></div>
        <br></br>
        <div className='window-print-info' style={{marginTop:"-10px"}}>
            <h3>{order.payer.address}</h3>
            <div style={{display:"flex",justifyContent:"center"}}>
                {order.payer.piso&&<h3>Piso: {order.payer.piso} -</h3>}{order.payer.departamento&&<h3>- Depto: {order.payer.departamento}</h3>}
            </div>
            <h4>{order.envio}</h4>
            <h4>{order.payer.name} {order.payer.surname}</h4>
            <h4>{order.payer.phone.area_code}-{order.payer.phone.number}</h4>
        </div>
        <div className='window-print-items-grid'>
            {arrayCountItems && arrayCountItems.map((item, index) => {
                let precioBurger = 0
                for(let i=0;i<productos.length;i++){
                    if(productos[i].id===item.id){
                        precioBurger=productos[i].precio[item.type]
                    }
                }
                return(
                    <>
                        <h5 style={{fontSize:"16px",paddingLeft:"8px",borderTop:"1.5px solid black"}}>
                            {`* ${(item.adicionales.length === 0)
                             ? `x${item.quantity} ${item.title}` 
                             : item.title} 
                             `}
                        <span style={{fontSize:"10px"}}>{
                            item.category_id==="OTROS" || item.category_id==="PROMOS" ? "" :
                        `(${`${
                            (item.category_id === 'VEGANS' || item.category_id === 'VEGGIES') ? preciosTipos.planta[item.type]
                            : item.type2 === 'NUGGETS' ? preciosTipos.pollos[item.type] 
                            : preciosTipos.burger[item.type]
                        }`})`}</span>
                        </h5>

                        <h5  style={{fontSize:"14px",textAlign:"center",fontWeight:"100",borderTop:"1.5px solid black"}}>{`$ 
                        ${item.adicionales.length === 0 ? precioBurger*arrayCountItems[index].quantity : precioBurger}`}</h5>
                    
                        {item.adicionales.adBurger?.map(adBurger =>{
                            return(
                            adBurger.cantidad > 0 && <>
                            <p style={{paddingLeft:"10px",fontSize:"11px"}}>{`--  x${adBurger.cantidad} ${adBurger.nombre}`}</p>
                            <p style={{fontSize:"11px",display:"flex",justifyContent:"center",alignItems:"end",fontWeight:"100"}}>{`$ ${adBurger.precio * adBurger.cantidad}`}</p>
                            </>
                            )
                        })}
                        {item.adicionales.adPapas?.map(adPapas =>{
                            return(
                                <>
                                <p style={{paddingLeft:"10px",fontSize:"11px"}}>{`--  ${adPapas.nombre}`}</p>
                                <p style={{fontSize:"11px",display:"flex",justifyContent:"center",alignItems:"end",fontWeight:"100"}}>{`$ ${adPapas.precio}`}</p>
                                </>
                            )
                        })}
                        {item.adicionales?.cambioPapas && <>
                            <p style={{paddingLeft:"10px",fontSize:"13px"}}>{`**  ${item.adicionales.cambioPapas.nombre}`}</p>
                            <p style={{fontSize:"11px",display:"flex",justifyContent:"center",alignItems:"end",fontWeight:"100"}}>{`$ ${item.adicionales.cambioPapas.precio}`}</p>
                        </>
                        }
                        <h5></h5>
                        {item.adicionales.length!==0?
                            <h5 style={{fontSize:"15px",display:"flex",justifyContent:"center",alignItems:"end",fontWeight:"900"}}>$ {item.unit_price}</h5>
                            :
                            <h5></h5>
                        }

                        
                    </>
                )  
            })}
            <h4 style={{width:"100%",fontSize:"17px",textAlign:"right"}}>Total: </h4>
            <h4 style={{fontSize:"14px",marginTop:"5px",textAlign:"center"}}>${order.precioTotal}</h4>
            <h4 style={{width:"100%",fontSize:"17px",marginTop:"5px",textAlign:"right"}}>Envio</h4>
            <h4 style={{fontSize:"14px",marginTop:"5px",textAlign:"center"}}></h4>
        </div>
    </div>}

    <p style={{backgroundColor:"white",textAlign:"center"}}>{horaExacta}</p>
    <p style={{backgroundColor:"white",textAlign:"center"}}>Desarrollado por FT</p>
    </>
  )
}
