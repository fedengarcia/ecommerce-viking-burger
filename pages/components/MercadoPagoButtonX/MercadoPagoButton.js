import {useState} from 'react';
// import {UseCartContext} from '../../../Context/CartContext';
import { useRouter } from 'next/router';
import Loader from '../../components/common/LoaderInicio';
import { addNewOrderFalse } from '../../../Firebase/FirebaseDB';
import loadingGIF from "../../../public/loading_icon.webp"
import Image from 'next/image';


export default function MercadoPagoButton ({payerInfoEspecial,items,clear,hora,horaEnvio,total}) {
    // const router = useRouter();

    const [mensaje,setMensaje]=useState(false)
    const router = useRouter();

    const payMP = (orderMP) => fetch(`https://vikingspage.vercel.app/api/create_preference`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(orderMP) // body data type must match "Content-Type" header
    }).then(function(response) {
      return response.json();
    }).catch(err => {
      console.log("TU ERROR",err);
    });  

    const handleAccept = async (payerInfoEspecial) => {
      setMensaje(!mensaje)

      let currentTime=new Date()
      let minutes=currentTime.getMinutes()

      const order = {
        items:items,
        payerInfoEspecial:payerInfoEspecial,
        envio: hora === "" ?  "Proxima Entrega" : horaEnvio,
        horaDePedido: `${currentTime.getHours()}:${minutes<10?0:""}${minutes}`,
        metodo_pago: "mercadopago",
        precioTotal: total+(total*10)/100,
        primerCarga:true
      }

      addNewOrderFalse(order).then(res => {
        var order = {
          id:res,
          items:items,
          payer: {
            ...payerInfoEspecial,
            address: {
              street_name: "Lopez y planes",
              street_number: 677,
              zip_code: "2800",
            }
          }
        }
        return order
      }).then(res => {
        payMP(res).then(preference => {
            //REDIRECCION A CHECKOUTPRO
            router.replace(preference.redirect);
        }).catch(err =>{
          console.log("Failed to get preference", err)
        });  
      }).catch(err =>{
        console.log("Failed to put fake order", err)
      });
    }
    


    return(
        <>
          {!mensaje && 
            <button onClick={() => {handleAccept(payerInfoEspecial), setMensaje(true)}} className="boton-validar">REALIZAR PEDIDO</button>
          }
          {mensaje && 
            < div style={{textAlign:"center"}}>
                <Image src={loadingGIF} width={100} height={100} alt="LOADER"></Image>
            </div>
          }
        </>
    )
}