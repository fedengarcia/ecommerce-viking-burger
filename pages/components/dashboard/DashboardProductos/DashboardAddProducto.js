import { useState, useEffect } from "react"
import { TextField } from '@mui/material';
import { addProducto, addStorage } from "../../../../Firebase/FirebaseDB"
import { useForm } from "react-hook-form";
import Image from "next/image";
import loading from "../../../../public/loading_icon.webp"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Swal from 'sweetalert2'
import { preciosTipos } from "../../../../helper/CONSTANTS";


export default function DashboardAddProducto ({setDispAddMenu,dispAddMenu,reload,setReload}) {
    const [producto,setProducto] = useState ({})
    const [productoTemplate,setProductoTemplate] = useState({
        hasAditional: false
    })
    const [cargando,setCargando]=useState(false)
    const [typeSelect, setTypeSelect] = useState("");
    const [precios, setPrecios] = useState([""])
    const [hasAditional, setHasAditional] = useState(true);

    const {register, formState:{errors},handleSubmit} = useForm()

    useEffect(() => {
        setProducto(productoTemplate)
    }, [productoTemplate]);


    useEffect(() => {
        if(typeSelect === "NUGGETS")  setPrecios(["",""])
        if(typeSelect === "VEGANS" || typeSelect === "VEGGIES") setPrecios(["","","",""])
        if(typeSelect === "OTROS") setPrecios([""])
        if(typeSelect === "PROMOS") setPrecios([""])
        if(typeSelect === "BURGERS" || typeSelect === "BURGER DEL MES") setPrecios([""])
    }, [typeSelect]);// eslint-disable-line react-hooks/exhaustive-deps
    

    const handleResta=async(i)=>{

        let preciosCopy = precios;

        if(preciosCopy.length > 1){
            preciosCopy.pop();
        }else
            Swal.fire({
                icon: 'warning',
                title: 'Debe contener al menos un precio base',
                text: '',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
        })
        await setPrecios([])
        setPrecios(preciosCopy)
    }
    
    const handleSuma=async(i)=>{
        let preciosCopy = precios;
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
            await setPrecios([])
            setPrecios(preciosCopy)
        }

    }


    const handleData = (e,dataType, positionPrice) => {
        if(dataType === "imagen"){
            setProductoTemplate({...productoTemplate,img: e.target.files[0]})
        }
        if(dataType === "nombre"){
            setProductoTemplate({...productoTemplate,nombre: e.target.value})
        }
        if(dataType === "descripcion"){
            setProductoTemplate({...productoTemplate,descripcion: e.target.value})
        }
        if(dataType === "tipo"){
            setTypeSelect(e.target.value)
            if(e.target.value === "NUGGETS"){
                setProductoTemplate({
                    ...productoTemplate,
                    tipo2: "NUGGETS",
                    tipo: "OTROS",

                })
            }else{
                setProductoTemplate({...productoTemplate,tipo: e.target.value})
            }
           
        }
        if(dataType === "precio"){
            let preciosCopy = precios
            preciosCopy[positionPrice] = e.target.value;
            setPrecios(preciosCopy)
            setProductoTemplate({...productoTemplate,precio: precios})
        }
    }

    const reset = ()=>{
        let form = document.getElementById("myForm")
        form.reset()
        setProducto({})
    }

    const handleFormSubmit = (e) => {
        for(let i=0;i<precios.length;i++){
            if(precios[i]===""){
                alert("FALTAN PRECIOS")
                return
            }
        }
        if(producto.nombre===undefined || producto.descripcion===undefined || producto.img===undefined || producto.tipo===undefined || producto.precio===undefined ){
            Swal.fire({
                icon: 'warning',
                title: `FORMULARIO INCOMPLETO`,
                text: 'Completa todos los campos para evitar que se muestren valores vacios en la aplicacion',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
            })
        }else{
            setCargando(true)
            addStorage(producto.nombre,"productos",producto.img).then(res=>{
                addProducto(producto,res).then(res => {
                    setCargando(false)
                    reset()
                    setReload(!reload)
                    setDispAddMenu("none");
                })
            }).then(res => {
                Swal.fire({
                    icon: 'success',
                    title: `Producto ${producto.nombre} agregado correctamente!`,
                    text: '',
                    color: '#FAC710',
                    confirmButtonColor: '#FAC710',
                    background: 'black'
                })
                setPrecios([""])
                setProducto({})
                setProductoTemplate({})
            }).catch(err => console.log(err))

        }
    }  
    const handleCheck = (value) => {
        setProductoTemplate({...productoTemplate, hasAditional:value})
    }

    return (
        <div id='modal' style={{display:dispAddMenu}}>
          <div className='add-producto-container'>
            <form className='form-container form-add-product' onSubmit={handleSubmit(handleFormSubmit)} id={"myForm"}>
                    <h1 style={{margin:'1em 0'}}>AGREGAR PRODUCTO</h1>

                    <div className='dash-prod-item-box'>
                        <h1>Nombre:</h1>
                        <TextField className="title-dash-prod-item" size="small" autoComplete="off" color="secondary"  id="nameId"  placeholder={"Nombre"} type="text" onChangeCapture={(e) => handleData(e,"nombre")}/>
                    </div>
                    <div className='dash-prod-item-box'>
                        <h1>Descripcion:</h1>
                        <TextField className="title-dash-prod-item" size="small" autoComplete="off" color="secondary"  id="descriptionId"  placeholder={"Descripcion"} type="text" onChangeCapture={(e) => handleData(e,"descripcion")}/>
                    </div>
                    <div className='dash-prod-item-box'>
                        <h1>Adicionales</h1>

                        <div className="dash-has-adicionales">
                            <input type="checkbox" id="adicional" name="adicionales" defaultChecked={true} onClick={() => {handleCheck(!hasAditional), setHasAditional(!hasAditional)}}/>
                        </div>
                    </div>
                    <div className='dash-prod-item-box' style={{marginBottom: '1em'}}>
                        <h1>Imagen: </h1>
                        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <p>(210x195)</p>
                        <input
                            type="file"
                            name="img"
                            id="img"
                            accept="image/png"
                            onChangeCapture={(e) => {handleData(e, "imagen")}}
                        />
                        </div>
                    </div>
                    
                    
                    <FormControl style={{width: '60%', marginBottom: '1em'}}>
                        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeSelect}
                            label="Tipo"
                            onChange={(e) => handleData(e,"tipo")}
                            placeholder={typeSelect}
                            size="small"
                        >
                            <MenuItem value={"BURGERS"}>BURGERS</MenuItem>
                            <MenuItem value={"VEGANS"}>VEGANS</MenuItem>
                            <MenuItem value={"VEGGIES"}>VEGGIES</MenuItem>
                            <MenuItem value={"PROMOS"}>PROMOS</MenuItem>
                            <MenuItem value={"NUGGETS"}>NUGGETS</MenuItem>
                            <MenuItem value={"OTROS"}>OTROS</MenuItem>
                            <MenuItem value={"BURGER DEL MES"}>BURGER DEL MES</MenuItem>

                        </Select>
                    </FormControl>
                    
                   {typeSelect && <div className='dash-prod-item-box' style={{flexWrap:"wrap"}}>
                        <h1>Precios:</h1>
                        {precios.map((value,i )=> 
                            <TextField key={i} className="title-dash-prod-item" size="small" autoComplete="off" color="secondary"  id="nameId"  
                            placeholder={`${
                                typeSelect==="BURGER DEL MES" ? preciosTipos.burgerdelmes[i] :
                                typeSelect === "NUGGETS" ? preciosTipos.pollos[i] : 
                                (producto.tipo === 'VEGANS' || producto.tipo === 'VEGGIES') ? preciosTipos.planta[i] :
                                (typeSelect==="OTROS" || typeSelect==="PROMOS") ? 'PRECIO' : preciosTipos.burger[i]
                            }: $${value}`} type="number" onChangeCapture={(e) => handleData(e,"precio",i)}/>
                        )}   
                        {producto.tipo === "BURGERS" && <div style={{textAlign:'center', display: 'flex', flexDirection:'column'}}>
                            <AddIcon  onClick={() => handleSuma()}/>
                            <RemoveIcon  onClick={() => handleResta()} />    
                        </div>}
                        {producto.tipo==="BURGER DEL MES" && <div style={{textAlign:'center', display: 'flex', flexDirection:'column'}}>
                            <AddIcon  onClick={() => handleSuma()}/>
                            <RemoveIcon  onClick={() => handleResta()} />    
                        </div>}
                    </div>}

                <div className="actions-addproduct">
                    {cargando?
                        <div style={{backgroundColor:"transparent",textAlign:"center",marginTop:"1vw"}}>
                            <Image src={loading} alt="loading" width={50} height={50} style={{backgroundColor:"transparent"}}/>
                        </div>
                    :
                        <button>AGREGAR</button>
                    }
                    <button onClick={()=>{reset(),setDispAddMenu("none"), setProducto({}), setProductoTemplate({}),setTypeSelect("")}} type={"reset"}>CANCELAR</button>
                </div>
            </form>
          </div>
        </div>
    )
}