import Image from "next/image";
import loading from "../../../../public/loading_icon.webp"


export default function DashboardOrdenRemove({disp,entregado,cargando,handleBorrar,order,setDisp}) {

    return(
        <div className='fondo-block' style={{display:disp}}>
        <div className='confirm-cancel-info'>
          {entregado!="rechazada"?
            <>
              {!cargando?
                <p className='button-borrar-order' onClick={()=>{handleBorrar(order.id,"Orders")}}>Confirmar</p>
              :
                <div style={{backgroundColor:"#dee6e6",width:"100%",margin:"auto",marginRight:"1vw"}}>
                  <Image src={loading} alt="loading" width={50} height={50} style={{backgroundColor:"transparent"}}/>
                </div>
              }
            </>
          :
            <>
              {!cargando?
                <p className='button-borrar-order' onClick={()=>{handleBorrar(order.id,"OrdersFalses")}}>Confirmar</p>
              :
              <div style={{backgroundColor:"#dee6e6",width:"100%",margin:"auto",marginRight:"1vw"}}>
                <Image src={loading} alt="loading" width={50} height={50} style={{backgroundColor:"transparent"}}/>
              </div>
              }
            </>
          }
          <p className='button-borrar-order' onClick={()=>{setDisp("none")}}>Cancelar</p>
        </div>
      </div>
    )
  }