import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { editPropProduct } from '../../../../Firebase/FirebaseDB';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { preciosTipos } from '../../../../helper/CONSTANTS';
import Swal from 'sweetalert2'

export default function DashboardProductoPrecio ({producto, setReload, reload,title,propType,placeholderValue,productId}){
    const [inputProp, setInputProp] = useState("");
    const [data,setData] = useState("");
    const [precios, setPrecios] = useState([])

    useEffect(() => {
        setPrecios(placeholderValue)
    }, [placeholderValue]);

    const handleChangeData = (e,i) => {
        if(propType === 'precio'){
            const preciosCopy = precios
            preciosCopy[i] = Number(e.target.value);
            setPrecios(preciosCopy)
            setData(preciosCopy)
        }else{
            setData(e.target.value)
        }
    }

    const handleConfirm = (id,prop,info) => {
        editPropProduct(id,prop,info).then(res => {
            setInputProp("");
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

    const handleAddRemove = (action) => {
        let preciosCopy = precios;
        if(action === 'add'){
            if(precios.length === 5){
                Swal.fire({
                    icon: 'warning',
                    title: 'Solo se pueden sumar hasta cino burgers, goloso.',
                    text: '',
                    color: '#FAC710',
                    confirmButtonColor: '#FAC710',
                    background: 'black'
                })
            }else{
                preciosCopy.push('');
                setPrecios(preciosCopy);
                handleConfirm(productId,'precio',preciosCopy)
            }


        }else{
            if(precios.length > 1){
                preciosCopy.pop();
                setPrecios(preciosCopy);
                handleConfirm(productId,'precio',preciosCopy)
            }else
            Swal.fire({
                icon: 'warning',
                title: 'Debe contener al menos un precio base',
                text: '',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
            })

        }
    }
    return(
        <>
            {producto!==undefined&&
                <div className='dashboard-input'>

                    <h5>{title}</h5>

                {precios && <> {inputProp === propType ?

                        <>{precios.map((value,i )=> 
                            <>
                                <TextField key={i} className="title-dash-prod-item" size="small" autoComplete="off" color="secondary"  id="nameId"  placeholder={`${
                                    producto.tipo2 === "NUGGETS" ? preciosTipos.pollos[i] : 
                                    (producto.tipo === 'VEGANS' || producto.tipo === 'VEGGIES') ? preciosTipos.planta[i] :
                                    preciosTipos.burger[i]
                                    }: $${value}`} type="number" onChangeCapture={(e) => handleChangeData(e,i)}/>
                            </>
                        )}</>
                    
                    : <div style={{display:'flex'}}>
                        {precios.map((value,i) => <p key={i}>{`${
                                    producto.tipo2 === "NUGGETS" ? preciosTipos.pollos[i] : 
                                    (producto.tipo === 'VEGANS' || producto.tipo === 'VEGGIES') ? preciosTipos.planta[i] :
                                    (producto.tipo==="OTROS" || producto.tipo==="PROMOS") ? "OPCION" :
                                    preciosTipos.burger[i]
                                    }: $${value}`}</p>)}
                        </div>
                    
                    }</>}
                                    
                    {
                        inputProp !== propType ? 
                    
                        <EditTwoToneIcon fontSize="large" onClick={() => {setInputProp(propType)}}/>
                        
                        : <div>
                            <CheckCircleOutlineOutlinedIcon onClick={() => handleConfirm(productId,propType,data)}/>
                            <CancelOutlinedIcon onClick={()=> {setInputProp(""), setData("")}}  />
                        </div>
                    }

                {producto.tipo === "BURGERS" && <div style={{textAlign:'center', display: 'flex', flexDirection:'column'}}>
                        <AddIcon  onClick={() => handleAddRemove('add')}/>
                        <RemoveIcon  onClick={() => handleAddRemove('remove')} />    
                    </div>}
                </div>
            }
        </>
    
    )
}