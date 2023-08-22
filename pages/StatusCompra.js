import { useEffect, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import router from 'next/router';
import { addNewOrder, getOrderFalsebyId, getOrderbyId, removeOrderTemporal, addNewOrderFalse, updateOrderTemporal } from "../Firebase/FirebaseDB";
import { UseCartContext } from "../Context/CartContext";
import Banner from "./components/common/Header";
import whap from "../public/WhatsApp.svg.png"

function StatusCompra() {

  const {clear} = useContext(UseCartContext);

  const router=useRouter();
  
  const [order,setOrder]=useState("")

  useEffect(() => {
    if(router.query.idCompra !== undefined){
      OrdenProceso()
    }
  }, [router.query.idCompra]);// eslint-disable-line react-hooks/exhaustive-deps
  
  const OrdenProceso = async()=>{

    const vaciarStorage=[]


    if(router.query.keyword==="failure"){
      getOrderFalsebyId(router.query.idCompra).then(async res=>{
        if(res.primerCarga){
          updateOrderTemporal(router.query.idCompra)
        }
      }).catch(err=>{
        console.log(err)
      })
    }else if(router.query.keyword==="success"){
      if(router.query.pago==="mp"){
        getOrderFalsebyId(router.query.idCompra).then(async res=>{
          if(res.primerCarga){
            setOrder(res)
            await addNewOrder(res,router.query.idCompra);
            await removeOrderTemporal(router.query.idCompra)
          }
        }).catch(err=>{
          getOrderbyId(router.query.idCompra).then(async res=>{
            await setOrder(res)
          })
        })
      }else if(router.query.pago==="transferencia" || router.query.pago==="efectivo"){
        let ord = {}
        ord = {
          items: JSON.parse(localStorage.getItem("CarritoVikings")),
          payerInfoEspecial: JSON.parse(localStorage.getItem("FormVikingsEspecial")),
        }
        if(ord.payerInfoEspecial.length===0){
          getOrderbyId(router.query.idCompra).then(async res=>{
          setOrder(res)
        }).catch(error=>console.log(error))
        }else{
          setOrder(ord)
        }
      }
      clear()
      localStorage.setItem("FormVikingsEspecial",JSON.stringify(vaciarStorage))
      localStorage.setItem("CarritoVikings",JSON.stringify(vaciarStorage))
    }
  }
  
  return (
    <>
      <Banner compra={true}/>
      {order !== ""  &&
        <>
          {order.payerInfoEspecial===undefined ?
            <>
              <div style={{height: '8vh'}}></div>

              <div className="status-compra-container">
                  <div className="status-compra">
                      {router.query.keyword === "failure" && <p className="title-status">Tu compra ha sido rechazada, por favor intenta nuevamente.</p>}
                      {router.query.pago === "efectivo" && router.query.keyword === "success" &&
                        <p style={{userSelect:"text"}}>
                          {`PEDIDO REALIZADO`}<br/>
                          {`Tu pedido será confirmado via Whatsapp, junto con el coste del envio.`}<br/>    
                          {`Pedido de: ${order.payer.name} ${order.payer.surname}`}<br/>               
                          {`Tu código de pedido es ${router.query.idCompra}`}
                        </p>
                      }
                      {router.query.pago === "mp" && router.query.keyword === "success" &&
                        <p style={{userSelect:"text"}}>
                          {`PEDIDO REALIZADO`}<br/>
                          {`Tu pedido será confirmado via Whatsapp, junto con el coste del envio.`}<br/>    
                          {`Pedido de: ${order.payer.name} ${order.payer.surname}`}<br/>               
                          {`Tu código de pedido es ${router.query.idCompra}`}
                        </p>
                      }
                      {router.query.pago === "transferencia" && router.query.keyword === "success" && 
                        <>
                          <p style={{userSelect:"text",width:"100%",textAlign:"center"}}>
                            {`Tu pedido será confirmado via Whatsapp, una vez que envies el comprobante de la transferencia.`}<br/>
                            {`Podes ir a nuestro whatsapp desde el icono que aparece abajo a la derecha para enviar el comprobante.`}
                          </p>
                          <p style={{paddingTop:"2vw",paddingBottom:"2vw",borderTop:"4px solid black",width:"100%",textAlign:"center",userSelect:"text"}}>
                            {`CBU: 0000003100049358526622 (CARUGATTI BRUNO MP)`} <br/>                 
                            {`ALIAS: vikings.bruno.mp`} <br/>
                          </p>
                          <p style={{paddingTop:"2vw",borderTop:"4px solid black",width:"100%",textAlign:"center",userSelect:"text"}}>               
                            {`Pedido de: ${order.payer.name} ${order.payer.surname}`}<br/>
                            {`Tu código de pedido es ${router.query.idCompra}`}
                          </p>
                        </>
                      }
                  </div>
              </div>

              <div className='whatsapp'>
                {router.query.pago === "efectivo" &&
                  <>
                    <p onClick={()=>window.open(`https://wa.me/543487700487?text=Hola Vikings! Hice un pedido. Mi nombre es: ${order.payer.name} ${order.payer.surname}. Mi código de pedido es ${router.query.idCompra}`)}>ENVIAR WHATSAPP</p>
                    <a href={`https://wa.me/543487700487?text=Hola Vikings! Hice un pedido. Mi nombre es: ${order.payer.name} ${order.payer.surname}. Mi código de pedido es ${router.query.idCompra}`} target="_blank" rel="noreferrer">
                      <Image src={whap} width={100} height={100} alt="WHAP"></Image>
                    </a>
                  </>
                }
                {router.query.pago === "transferencia" &&
                  <>
                    <p onClick={()=>window.open(`https://wa.me/543487700487?text=Hola Vikings! Te envio la captura de la transferencia para el pedido a nombre de ${order.payer.name} ${order.payer.surname}. Código de pedido: ${router.query.idCompra}`)}>ENVIAR WHATSAPP</p>
                    <a href={`https://wa.me/543487700487?text=Hola Vikings! Te envio la captura de la transferencia para el pedido a nombre de ${order.payer.name} ${order.payer.surname}. Código de pedido: ${router.query.idCompra}`} target="_blank" rel="noreferrer">
                      <Image src={whap} width={100} height={100} alt="WHAP"></Image>
                    </a>
                  </>
                }
                {router.query.pago === "mp" &&
                  <>
                    <p onClick={()=>window.open(`https://wa.me/543487700487?text=Hola Vikings! Hice un pedido por mercadopago. Mi nombre es: ${order.payer.name} ${order.payer.surname}. Mi código de pedido es ${router.query.idCompra}`)}>ENVIAR WHATSAPP</p>
                    <a href={`https://wa.me/543487700487?text=Hola Vikings! Hice un pedido por mercadopago. Mi nombre es: ${order.payer.name} ${order.payer.surname}. Mi código de pedido es ${router.query.idCompra}`} target="_blank" rel="noreferrer">
                      <Image src={whap} width={100} height={100} alt="WHAP"></Image>
                    </a>
                  </>
                }
              </div>

              <a href='mailto:ftpaginasweb@gmail.com' className='mail-contacto'>
                <h2>Desarrollado por FT</h2>
              </a>

              <div style={{height: '5vh'}}></div>
              <div style={{height: '5vh'}}></div>
            </>
            :
            <>      
                <div style={{height: '8vh'}}></div>

                <div className="status-compra-container">
                    <div className="status-compra">
                        {router.query.keyword === "failure" && <p className="title-status">Tu compra ha sido rechazada, por favor intenta nuevamente.</p>}
                        {router.query.pago === "efectivo" &&
                          <p style={{userSelect:"text"}}>
                            {`PEDIDO REALIZADO`}<br/>
                            {`Tu pedido será confirmado via Whatsapp, junto con el coste del envio.`}<br/>    
                            {`Pedido de: ${order.payerInfoEspecial.name} ${order.payerInfoEspecial.surname}`}<br/>               
                            {`Tu código de pedido es ${router.query.idCompra}`}
                          </p>
                        }
                        {router.query.pago === "transferencia" && 
                          <>
                            <p style={{userSelect:"text",width:"100%",textAlign:"center"}}>
                              {`Tu pedido será confirmado via Whatsapp, una vez que envies el comprobante de la transferencia.`}<br/>
                              {`Podes ir a nuestro whatsapp desde el icono que aparece abajo a la derecha para enviar el comprobante.`}
                            </p>
                            <p style={{paddingTop:"2vw",paddingBottom:"2vw",borderTop:"4px solid black",width:"100%",textAlign:"center",userSelect:"text"}}>
                              {`CBU: 0000003100049358526622 (CARUGATTI BRUNO MP)`} <br/>                 
                              {`ALIAS: vikings.bruno.mp`} <br/>
                            </p>
                            <p style={{paddingTop:"2vw",borderTop:"4px solid black",width:"100%",textAlign:"center",userSelect:"text"}}>               
                              {`Pedido de: ${order.payerInfoEspecial.name} ${order.payerInfoEspecial.surname}`}<br/>
                              {`Tu código de pedido es ${router.query.idCompra}`}
                            </p>
                          </>
                        }
                    </div>
                </div>

                <div className='whatsapp'>
                  {router.query.pago === "efectivo" &&
                    <>
                      <p onClick={()=>window.open(`https://wa.me/543487700487?text=Hola Vikings! Hice un pedido. Mi nombre es: ${order.payerInfoEspecial.name} ${order.payerInfoEspecial.surname}. Mi código de pedido es ${router.query.idCompra}`)}>ENVIAR WHATSAPP</p>
                      <a href={`https://wa.me/543487700487?text=Hola Vikings! Hice un pedido. Mi nombre es: ${order.payerInfoEspecial.name} ${order.payerInfoEspecial.surname}. Mi código de pedido es ${router.query.idCompra}`} target="_blank" rel="noreferrer">
                        <Image src={whap} width={100} height={100} alt="WHAP"></Image>
                      </a>
                    </>
                  }
                  {router.query.pago === "transferencia" &&
                    <>
                      <p onClick={()=>window.open(`https://wa.me/543487700487?text=Hola Vikings! Te envio la captura de la transferencia para el pedido a nombre de ${order.payerInfoEspecial.name} ${order.payerInfoEspecial.surname}. Código de pedido: ${router.query.idCompra}`)}>ENVIAR WHATSAPP</p>
                      <a href={`https://wa.me/543487700487?text=Hola Vikings! Te envio la captura de la transferencia para el pedido a nombre de ${order.payerInfoEspecial.name} ${order.payerInfoEspecial.surname}. Código de pedido: ${router.query.idCompra}`} target="_blank" rel="noreferrer">
                        <Image src={whap} width={100} height={100} alt="WHAP"></Image>
                      </a>
                    </>
                  }
                </div>

                <a href='mailto:ftpaginasweb@gmail.com' className='mail-contacto'>
                  <h2>Desarrollado por FT</h2>
                </a>

                <div style={{height: '5vh'}}></div>
                <div style={{height: '5vh'}}></div>
            </>
          }
        </>
      }
    </>
  );
}


export default StatusCompra;