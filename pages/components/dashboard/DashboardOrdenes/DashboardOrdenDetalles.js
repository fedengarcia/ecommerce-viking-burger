import { Typography } from "@mui/material"
import { preciosTipos } from '../../../../helper/CONSTANTS';


export default function DashboardOrdenDetalles({setShowOrder,order}) {

  return(
    <>
    
      {order!==undefined &&
          <div id='modal'>
            <div className='detalles-info'>
              <button onClick={()=>{setShowOrder(false)}}>ATRAS</button>
              <ul className='ul-info'>
              <Typography variant="h5" component="div">
                  {order && `Nombre: ${order.payer.name} ${order.payer.surname}`}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {order && `Fecha: ${order.fecha.dia}/${order.fecha.mes}/${order.fecha.ano}`}
                </Typography>
                <Typography variant="h6" color="text.secondary">
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
              </ul>
              <ul className="ul-items">
              <Typography variant="h5" component="div">
                Items solicitados:
              </Typography>
                  {(order.items).map(item=>
                    <li key={item.id}>              
                    <Typography variant="h6" color="text.secondary">
                      {`${item.title} 
                        ${item.category_id==="OTROS" || item.category_id==="PROMOS" ? "" :
                        `   (${`${
                                (item.category_id === 'VEGANS' || item.category_id === 'VEGGIES') ? preciosTipos.planta[item.type]
                                : item.type2 === 'NUGGETS' ? preciosTipos.pollos[item.type] 
                                : preciosTipos.burger[item.type]
                            }`})
                        `}
                      | | Total: $${item.quantity * item.unit_price}`}
                  </Typography>
                  </li>)}
              </ul>
            </div>
          </div>
      }
    </>
  )
}