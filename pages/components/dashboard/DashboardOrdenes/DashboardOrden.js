import {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { removeOrderFinal, setOrderEntregada } from '../../../../Firebase/FirebaseDB';
import loading from "../../../../public/loading_icon.webp"
import Image from "next/image";
import Swal from 'sweetalert2';
import DashboardOrdenDetalles from './DashboardOrdenDetalles'
import ImprimirTicket from '../../../ImprimirTicket';
import { useRouter } from 'next/router';

export default function DashboardOrden({order,entregado,reload,setReload}) {
    const router = useRouter();

    const [cargando,setCargando]=useState(false)
    const [horaExacta,setHoraExacta]=useState("")
    const [showOrder, setShowOrder] = useState(false);
    const [imprimirTicket,setImprimirTicket] = useState(false);

    const handleEntregadoState = (order,state) => {
      setCargando(true);
      setOrderEntregada(order.id,state).then(res=>{
        setReload(!reload);
        setCargando(false);
      })
    }
    
    const handleBorrar = (order,entregado) => {
      setCargando(true)
      Swal.fire({
        title: 'ESTAS SEGURO?',
        showCancelButton: true,
        confirmButtonText: 'ELIMINAR',
        color: '#FAC710',
        confirmButtonColor: '#FAC710',
        background: 'black'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          removeOrderFinal(order.id,entregado).then(res=>{
            setReload(!reload);
          })
            Swal.fire({
                icon: 'success',
                title: `ELIMINADO`,
                text: 'Eliminado correctamente',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
            })
        }
      })
      setCargando(false);
    }

    return (
    <>
    {order !== undefined &&
      <>
        {!order.eliminado && 
          <Card sx={{ maxWidth: 500 }} className="orden-container">
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {order && `Nombre: ${order.payer.name} ${order.payer.surname}`}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {order && `Fecha: ${order.fecha.dia}/${order.fecha.mes}/${order.fecha.ano}`}
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight={600}>
                {order && `Hora del pedido: ${order.horaDePedido}`}
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight={600}>
                {order && `Horario de envio: ${order.envio}`}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {order && `Telefono: ${order.payer.phone.area_code}-${order.payer.phone.number}`}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {order && `Direccion: ${order.payer.address} `}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {order.payer.street_piso && `Piso:${order.payer.street_piso} Numero: ${order.payer.street_apartamento}`}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {order && `Metodo de pago: ${order.metodo_pago}`}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {order && `Precio Total: $${order.precioTotal}`}
              </Typography>
            </CardContent>


            {cargando?
              <div style={{backgroundColor:"transparent",width:"100%", textAlign:'center'}}>
                <Image src={loading} alt="loading" width={50} height={50} style={{backgroundColor:"transparent"}}/>
              </div>
            :
            <CardActions>
                  <button onClick={()=> {router.replace(`/ImprimirTicket?id=${order.id}`)}}>IMPRIMIR</button>
                  <button onClick={() => setShowOrder(true)}>VER DETALLES</button>
                  <button> <a href={`https://wa.me/${order.payer.phone.area_code}${order.payer.phone.number}?text=Hola! Somos VIKINGS. Tu envio a ${order.payer.address} cuesta:`} target={"_blank"} rel="noreferrer">ENVIAR MENSAJE</a></button>
                  {/* {(order.entregado === false && entregado !== "RECHAZADA") && <button onClick={() => handleEntregadoState(order,true)}>MARCAR COMO ENTREGADA</button>} */}
                  {(order.entregado === true && entregado !== "RECHAZADA") && <button onClick={() => handleEntregadoState(order,false)}>MARCAR COMO NO ENTREGADA</button>}
                  <button onClick={()=> handleBorrar(order,entregado)} id="delete-button">ELIMINAR ORDEN</button>
                </CardActions>
            }

            

          </Card>
        }
        {imprimirTicket && <ImprimirTicket order={order} setImprimirTicket={setImprimirTicket}/>}
        {showOrder && <DashboardOrdenDetalles setShowOrder={setShowOrder} order={order}/>}
      </>
    }
    </>
    );
}