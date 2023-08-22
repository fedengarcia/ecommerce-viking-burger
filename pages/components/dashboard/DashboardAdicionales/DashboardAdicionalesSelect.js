import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { editPropAdicionales } from '../../../../Firebase/FirebaseDB';
import Swal from 'sweetalert2';

const DashboardAdicionalesSelect = ({adicionalType, reloadAdicionales, setReloadAdicionales, propType, adicionalId, placeholderValue}) => {
    const [type, setType] = useState(placeholderValue);

    
    const handleChange = (e) => {
        const input = e.target.value
        editPropAdicionales(adicionalId,propType,input,adicionalType).then(res => {
            setType(input);
            Swal.fire({
                icon: 'success',
                title: `MODIFICADO`,
                text: 'Modificado correctamente',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
            })
            setReloadAdicionales(!reloadAdicionales);
        });
    }


    return (

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            {adicionalType === 'generales' ? 
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Tipo"
                onChange={handleChange}
                placeholder={placeholderValue}
                size="small"
            >
                    <MenuItem value={"RADIO"}>TIPO CAMBIO</MenuItem>
                    <MenuItem value={"CHECK"}>TIPO AÑADIR</MenuItem>
            </Select>
            : adicionalType === 'generales2' ?
            
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Tipo"
                onChange={handleChange}
                placeholder={placeholderValue}
                size="small"
                style={{margin: '1em 0'}}
            >
                <MenuItem value={"toBurger"}>BURGERS</MenuItem>
                <MenuItem value={"toVegan"}>VEGANS</MenuItem>
                <MenuItem value={"toVeggie"}>VEGGIES</MenuItem>
            </Select>
            
            
            :
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
                <MenuItem value={"VEGANS"}>VEGANS</MenuItem>
                <MenuItem value={"VEGGIES"}>VEGGIES</MenuItem>
            </Select>
            }
            </FormControl>    

    );
}

export default DashboardAdicionalesSelect;
