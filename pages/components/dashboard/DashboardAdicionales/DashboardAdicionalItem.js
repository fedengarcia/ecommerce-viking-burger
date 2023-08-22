import React,{useState} from 'react';
import Swal from 'sweetalert2'
import loading from "../../../../public/loading_icon.webp"
import DashboardAdicionalesSelect from './DashboardAdicionalesSelect';
import { removeAdicional, addStorage, editPropAdicionales } from '../../../../Firebase/FirebaseDB';
import Image from 'next/image';
import DashboardAdicionalInput from './DashboardAdicionalInput';

const DashboardAdicionalItem = ({adicional, setReloadAdicionales, reloadAdicionales, adicionalType}) => {
    const [cargando,setCargando] = useState(false)
    

    const handleRemoveAdicional = () => {
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

                removeAdicional(adicional.id,adicionalType).then(res => {
                    setReloadAdicionales(!reloadAdicionales);
                })
                Swal.fire({
                    icon: 'success',
                    title: `ELIMINADO`,
                    text: 'Eliminado correctamente',
                    color: '#FAC710',
                    confirmButtonColor: '#FAC710',
                    background: 'black'
                 })}
        })

    }
    return (<>
        {adicional === undefined ? <></> :
            <div className="dash-prod-item-container" >
                <div className="dash-prod-item" style={{backgroundColor:adicional.tipo === 'VEGANS' || adicional.tipo === 'VEGGIES' || adicional.tipo2==="toVegan" || adicional.tipo2==="toVeggie" ?  "#B6EA69" : "#eabe1f"}}>

                    <div className='dash-prod-item-box'>

                        <DashboardAdicionalInput  adicionalType={adicionalType}  setReloadAdicionales={setReloadAdicionales} reloadAdicionales={reloadAdicionales} adicionalId={adicional.id} propType={"nombre"} title={"Nombre: "} placeholderValue={adicional.nombre} type={"nombre"}/>
                        <DashboardAdicionalInput  adicionalType={adicionalType} setReloadAdicionales={setReloadAdicionales} reloadAdicionales={reloadAdicionales} adicionalId={adicional.id} propType={"precio"} title={"Precio: $"} placeholderValue={adicional.precio} type={"precio"}/>
                                                
                        <div className='dashboard-input' style={{display:'flex', flexDirection: 'column'}}>
                        {adicionalType === "generales" &&
                         <DashboardAdicionalesSelect adicionalType={'generales2'} setReloadAdicionales={setReloadAdicionales} reloadAdicionales={reloadAdicionales} adicionalId={adicional.id} propType={"tipo2"} placeholderValue={adicional.tipo2}/>}
                         <DashboardAdicionalesSelect adicionalType={adicionalType} setReloadAdicionales={setReloadAdicionales} reloadAdicionales={reloadAdicionales} adicionalId={adicional.id} propType={"tipo"} placeholderValue={adicional.tipo}/>
                        </div>

                        <div className='dashboard-input'>
                            <button onClick={handleRemoveAdicional}>ELIMINAR ADICIONAL</button>
                        </div>
                    </div>
                    

                </div>
            </div>
            
            }

        </>
    );
}

export default DashboardAdicionalItem;
