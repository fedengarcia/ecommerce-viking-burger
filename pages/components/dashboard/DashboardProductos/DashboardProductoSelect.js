import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { editPropProduct } from '../../../../Firebase/FirebaseDB';
import Swal from 'sweetalert2';

const DashboardProductoSelect = ({reload, setReload, propType, productId, placeholderValue}) => {
    const [type, setType] = useState(placeholderValue);

    const handleChange = (e) => {
        const input = e.target.value
        editPropProduct(productId,propType,input).then(res => {
            setReload(!reload);
            setType(input);
            Swal.fire({
                icon: 'success',
                title: `MODIFICADO`,
                text: 'Modificado correctamente',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
            })
        });

    }

    
    return (

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Tipo"
                onChange={handleChange}
                placeholder={placeholderValue}
                size="small"
            >
                <MenuItem value={"BURGERS"}>BURGERS</MenuItem>
                <MenuItem value={"PROMOS"}>PROMOS</MenuItem>
                <MenuItem value={"VEGANS"}>VEGANS</MenuItem>
                <MenuItem value={"VEGGIES"}>VEGGIES</MenuItem>
                <MenuItem value={"OTROS"}>OTROS</MenuItem>
                <MenuItem value={"BURGER DEL MES"}>BURGER DEL MES</MenuItem>
                
            </Select>
            </FormControl>    

    );
}

export default DashboardProductoSelect;
