import { useState } from 'react';
import { addStorage,removeProduct,editPropProduct  } from '../../../../Firebase/FirebaseDB';
import Image from "next/image";
import loading from "../../../../public/loading_icon.webp"
import DashboardProductoInput from './DashboardProductoInput';
import DashboardProductoPrecio from './DashboardProductoPrecio';
import Swal from 'sweetalert2'
import DashboardProductoSelect from './DashboardProductoSelect';



export default function DashboardProductoItem ({optionType, producto,setReload, reload}) {
    const [cargando,setCargando] = useState(false);

    const changeImagen = (e)=>{
        if(e.target.files[0].type==="image/png"){
            setCargando(true);
            addStorage(producto.nombre,"productos",e.target.files[0]).then(res => {
                editPropProduct(producto.id,"img",res).then(res=>{
                    setReload(!reload);
                    setCargando(false);
                })
            })
        }
    }


    const handleRemoveProduct = () => {
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
                removeProduct(producto.id).then(res => {
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
        setCargando(true)
        
    }


    const handleCheck = () => {
        editPropProduct(producto.id,'hasAditional',!producto.hasAditional).then(res => {
            setReload(!reload);
        });
        

        Swal.fire({
            icon: 'success',
            title: 'MODIFICADO',
            text: 'Modificado Correctamente!',
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'
        })
    }

    return (
        <>  
            {producto === undefined ? <></> :
            <div className="dash-prod-item-container">
                <div className="dash-prod-item" style={{backgroundColor:producto.tipo === 'VEGANS' || producto.tipo === 'VEGGIES' ?  "#B6EA69" : "#eabe1f"}}>

                    <div className='img-dash-prod-item dash-prod-item-box'>
                        {
                            cargando?
                                  <Image src={loading} alt="loading" width={50} height={50}/>
                            :
                            <>
                                {producto.img && <Image src={producto.img} alt={"imagen-del-producto"} width={200} height={200}/>}
                                <p>(210x195)</p>
                                <input
                                    type="file"
                                    name="img"
                                    id="img"
                                    accept="image/png"
                                    onChangeCapture={(e) => {changeImagen(e)}}
                                />
                                
                            </>
                        }
                    </div>

                    <div className='dash-prod-item-box'>

                        <DashboardProductoInput  setReload={setReload} reload={reload} productId={producto.id} propType={"nombre"} title={"Nombre: "} placeholderValue={producto.nombre} />
                        <DashboardProductoInput  setReload={setReload} reload={reload} productId={producto.id} propType={"descripcion"} title={"Descripcion: "} placeholderValue={producto.descripcion} />
                        
                        {producto.tipo !== "OTROS" && producto.tipo !== "PROMOS" && producto.tipo !== "BURGER DEL MES" &&
                        <div className='dashboard-input'>
                            <h5>Adicionales</h5>

                            <div className="dash-has-adicionales">
                                <input type="checkbox" id="adicional" name="adicionales" defaultChecked={producto.hasAditional} onClick={handleCheck}/>
                            </div>
                        </div>}

                        <DashboardProductoPrecio producto={producto} setReload={setReload} reload={reload} productId={producto.id} propType={"precio"} title={"Precio:"} placeholderValue={producto.precio}/>
                        
                        <div className='dashboard-input'>
                            <DashboardProductoSelect setReload={setReload} reload={reload} productId={producto.id} propType={"tipo"} placeholderValue={producto.tipo}/>
                            {/* <DashboardProductoInput setReload={setReload} reload={reload} productId={producto.id} type={"precio"} title={"Tipo"}  /> */}
                        </div>

                        <div className='dashboard-input'>
                            <button onClick={handleRemoveProduct} id="delete-button">ELIMINAR PRODUCTO</button>
                        </div>
                    </div>
                    

                </div>
            </div>
            
            }

        </>
        
)
}