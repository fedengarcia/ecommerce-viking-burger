import { useState } from 'react';
import { TextField } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { editPropAdicionales } from '../../../../Firebase/FirebaseDB';
import Swal from 'sweetalert2'

export default function DashboardAdicionalInput ({adicionalType,type, setReloadAdicionales, reloadAdicionales,title,propType,placeholderValue,adicionalId}){
    const [inputProp, setInputProp] = useState("");
    const [data,setData] = useState("");

    const handleChangeData = (e) => {
        setData(e.target.value)
    }

    const handleConfirm = () => {
        editPropAdicionales(adicionalId,propType,data,adicionalType).then(res => {
            setInputProp("");
            setReloadAdicionales(!reloadAdicionales);
        });
        

        Swal.fire({
            icon: 'success',
            title: 'Modificado Correctamente!',
            text: '',
            color: '#FAC710',
            confirmButtonColor: '#FAC710',
            background: 'black'
        })
        
    }

    return(<div className='dashboard-input'>

            <h5>{title}</h5>


            {inputProp === propType ?
                <TextField className="title-dash-prod-item" size="small" autoComplete="off" color="secondary"  id="nameId"  placeholder={`${type === 'precio' ? placeholderValue : placeholderValue.toString()}`} type={`${type === 'precio' ? "number" : "text"}`} onChangeCapture={handleChangeData}/>
            : <p style={{color:placeholderValue === ''?  "red" : ''}}>{placeholderValue === '' ? 'Campo vacio' : placeholderValue}</p>}           
            {inputProp !== propType ? 
                <EditTwoToneIcon fontSize="large" onClick={() => {setInputProp(propType)}}/>
            : <div>
                <CheckCircleOutlineOutlinedIcon onClick={handleConfirm}/>
                <CancelOutlinedIcon onClick={()=> {setInputProp(""), setData("")}}/>
            </div>}

            

        </div>
    )
}