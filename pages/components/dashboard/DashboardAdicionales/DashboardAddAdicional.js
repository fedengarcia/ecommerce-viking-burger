import { useState, useEffect } from "react"
import { TextField } from '@mui/material';
import { addAdicional, addStorage } from "../../../../Firebase/FirebaseDB"
import { useForm } from "react-hook-form";
import Image from "next/image";
import loading from "../../../../public/loading_icon.webp"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'


export default function DashboardAddAdicional ({setDispAddAdicional,dispAddAdicional,reload,setReload}) {
    const [addType,setAddType] = useState("Seleccionar")
    const [adicionalBurgerType, setAdicionalBurgerType] = useState("BURGERS")
    const [adicionalGeneralType, setAdicionalGeneralType] = useState("CHECK")
    const [adicionalGeneralBurgerType, setAdicionalGeneralBurgerType] = useState("toBurger")
    const [adicional,setAdicional] = useState ({})
    const [cargando,setCargando]=useState()
    const [formValid,setFormValid] = useState()

    useEffect(() => {
        setAdicional({
            tipo: `${addType === "BURGERS" ? "BURGERS" : "CHECK"}`,
            tipo2: `${addType === "CHECK" ?? 'BURGERS'}`
        })
        setCargando(false)
        setFormValid(false)
    }, [addType]);// eslint-disable-line react-hooks/exhaustive-deps


    const {register, formState:{errors},handleSubmit} = useForm()

    const handleData = (e,dataType) => {

        if(dataType === "nombre"){
            setAdicional({...adicional,nombre: e.target.value})
        }
        if(dataType === "tipoBurger"){
            setAdicionalBurgerType(e.target.value)
            setAdicional({...adicional,tipo: e.target.value})
        }
        if(dataType === "tipoCheck"){
            setAdicionalGeneralType(e.target.value)
            setAdicional({...adicional,tipo: e.target.value.toUpperCase()})
        }
        if(dataType === "tipoAdGenerales"){
            setAdicionalGeneralBurgerType(e.target.value)
            setAdicional({...adicional,tipo2: e.target.value})
        }
        if(dataType === "precio"){
            setAdicional({...adicional,precio: Number(e.target.value)})
        }
    }
    
    const reset = ()=>{
        let form = document.getElementById("myForm")
        form.reset()
        setAdicional({})
    }

    const handleFormSubmit = async(e) => {

        if(adicional.nombre === undefined || adicional.precio === undefined || adicional.tipo === undefined){
            Swal.fire({
                icon: 'warning',
                title: `FORMULARIO INCOMPLETO`,
                text: 'Completa todos los campos para evitar que se muestren valores vacios en la aplicacion',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
            })
            setFormValid(false)
        }else{
            setCargando(true)
            if(adicional.tipo2==="false"){
                adicional.tipo2="toBurger"
            }
            addAdicional(addType,adicional).then(res => {
                reset()
                setReload(!reload)
                setDispAddAdicional("none");
                setAddType("Seleccionar")
                setAdicionalBurgerType("BURGERS")
                setAdicionalGeneralBurgerType("toBurger")
                setAdicionalGeneralType("CHECK")
                Swal.fire({
                    icon: 'success',
                    title: `Producto ${adicional.nombre} agregado correctamente!`,
                    text: '',
                    color: '#FAC710',
                    confirmButtonColor: '#FAC710',
                    background: 'black'
                })
                setAdicional({})
                setCargando(false)
            }).catch(err => console.log(err))
        }
    }  

    const handleAddType = (e) => {
        setAddType(e.target.value)
    }

    return (
        <div id='modal' style={{display:dispAddAdicional}}>
          <div className='add-producto-container'>

                {addType === 'Seleccionar' && 
                <div className="form-container form-add-product">
                    <h1>SELEECIONAR TIPO DE ADICIONAL</h1>
                    <FormControl style={{width: '60%'}}>
                        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addType}
                            label="Tipo Adicional"
                            onChange={e => handleAddType(e,"tipo")}
                            placeholder={"Seleccionar tipo"}
                            size="small"
                        >
                            <MenuItem disabled value="SELECCIONAR TIPO"><em>SELECCIONAR TIPO</em></MenuItem>
                            <MenuItem value={"BURGERS"}>ADICIONALES BURGER</MenuItem>
                            <MenuItem value={"GENERALES"}>ADICIONALES GENERALES</MenuItem>
                        </Select>
                    </FormControl> 
                </div>
                }
        

            {addType === "BURGERS" &&
            <form className='form-container form-add-product' onSubmit={handleSubmit(handleFormSubmit)} id={"myForm"}>
                        <h1 style={{margin:'1em 0'}}>ADICIONALES BURGERS</h1>

                        <div className='dash-prod-item-box'>
                            <h1>Nombre:</h1>
                            <TextField className="title-dash-prod-item" size="small" autoComplete="off" color="secondary"  id="nameId"  placeholder={"Nombre"} type="text" onChangeCapture={(e) => handleData(e,"nombre")}/>
                        </div>
                        <div className='dash-prod-item-box'>
                            <h1>Tipo:</h1>
                            <FormControl style={{width: '60%'}}>
                            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={adicionalBurgerType}
                                placeholder={adicionalBurgerType}
                                label="Tipo"
                                onChange={e => handleData(e,"tipoBurger")}
                                size="small"
                            >
                                
                                <MenuItem value={"BURGERS"}>BURGERS</MenuItem>
                                <MenuItem value={"VEGGIES"}>VEGGIES</MenuItem>
                                <MenuItem value={"VEGANS"}>VEGANS</MenuItem>
                            </Select>
                        </FormControl> 
                        </div>
                        <div className='dash-prod-item-box'>
                            <h1>Precio:</h1>
                            <TextField className="title-dash-prod-item" size="small" autoComplete="off" color="secondary"  id="nameId"  placeholder={"Precio"} type="number" onChangeCapture={(e) => handleData(e,"precio")}/> 
                        </div>

                        <div className="actions-addproduct">
                            {cargando?
                                <div style={{backgroundColor:"transparent",textAlign:"center",marginTop:"1vw"}}>
                                    <Image src={loading} alt="loading" width={50} height={50} style={{backgroundColor:"transparent"}}/>
                                </div>
                            :
                                <button>AGREGAR</button>
                            }
                            <button onClick={()=>{reset(), setAddType("Seleccionar"),setDispAddAdicional("none"),setAdicionalBurgerType("BURGERS")}} type={"reset"}>CANCELAR</button>
                        </div>
                </form>
            }
            
            {addType === "GENERALES" &&
                 <form className='form-container form-add-product' onSubmit={handleSubmit(handleFormSubmit)} id={"myForm"}>
                    <h1 style={{margin:'1em 0'}}>ADICIONALES GENERALES</h1>

                    <div className='dash-prod-item-box'>
                        <h1>Nombre:</h1>
                        <TextField className="title-dash-prod-item" size="small" autoComplete="off" color="secondary"  id="nameId"  placeholder={"Nombre"} type="text" onChangeCapture={(e) => handleData(e,"nombre")}/>
                    </div>

                    <div className='dash-prod-item-box'>
                        <h1>Tipo burger:</h1>
                        <FormControl style={{width: '60%'}}>
                        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={adicionalGeneralBurgerType}
                            placeholder={adicionalGeneralBurgerType}
                            label="Tipo"
                            onChange={e => handleData(e,"tipoAdGenerales")}
                            size="small"
                        >
                                <MenuItem value={"toBurger"}>BURGERS</MenuItem>
                                <MenuItem value={"toVeggie"}>VEGGIES</MenuItem>
                                <MenuItem value={"toVegan"}>VEGANS</MenuItem>
                        </Select>
                    </FormControl> 
                    </div>

                    <div className='dash-prod-item-box'>
                        <h1>Tipo:</h1>
                        <FormControl style={{width: '60%'}}>
                        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={adicionalGeneralType}
                            placeholder={adicionalGeneralType}
                            label="Tipo"
                            onChange={e => handleData(e,"tipoCheck")}
                            size="small"
                        >
                            <MenuItem value={"RADIO"}>TIPO CAMBIO</MenuItem>
                            <MenuItem value={"CHECK"}>TIPO AÑADIR</MenuItem>
                        </Select>
                    </FormControl> 
                    </div>

                    <div className='dash-prod-item-box'>
                        <h1>Precio:</h1>
                        <TextField className="title-dash-prod-item" size="small" autoComplete="off" color="secondary"  id="nameId"  placeholder={"Precio"} type="number" onChangeCapture={(e) => handleData(e,"precio")}/> 
                    </div>

                    <div className="actions-addproduct">
                        {cargando?
                            <div style={{backgroundColor:"transparent",textAlign:"center",marginTop:"1vw"}}>
                                <Image src={loading} alt="loading" width={50} height={50} style={{backgroundColor:"transparent"}}/>
                            </div>
                        :
                            <button>AGREGAR</button>
                        }
                        <button onClick={()=>{reset(), setAddType("Seleccionar"),setDispAddAdicional("none"), setAdicionalGeneralBurgerType("toBurger"), setAdicionalGeneralType("CHECK")}} type={"reset"}>CANCELAR</button>
                    </div>
                </form>
            }

          </div>
        </div>
    )
}