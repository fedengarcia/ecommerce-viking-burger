import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { UseCartContext } from '../../../Context/CartContext';
import { addNewOrder } from '../../../Firebase/FirebaseDB';
import MercadoPagoButton from '../MercadoPagoButtonX/MercadoPagoButton';
import LoaderInicio from './LoaderInicio';
import loadingGIF from "../../../public/loading_icon.webp"
import Image from 'next/image';
import Router from 'next/router';

const Form = () => {
    const { register, formState: { errors },handleSubmit } = useForm();
    
    const{items,addImpuestosMP,getTotalPriceForm,removeImpuestos,clear}=useContext(UseCartContext)
    
    const [formValidado,setFormValidado]=useState(false)
    
    const [total,setTotal]=useState(0)
    const [hora,setHora]=useState("")
    const [horaExacta,setHoraExacta]=useState("")
    
    const [payerInfoEspecial,setPayerInfoEspecial]=useState({})
    const [phone, setPhone] = useState({});
    const [horaEnvio,setHoraEnvio]=useState("")
    const [pago,setPago]=useState("")
    
    const [loading,setLoading]=useState(false)
    
    useEffect(()=>{
        setTotal(getTotalPriceForm)
    },[items])// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(()=>{
        let currentTime=new Date()
        let minutes=currentTime.getMinutes()
        setHoraExacta(`${currentTime.getHours()}${minutes<10?0:""}${minutes}`)
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(()=>{
        setHoraEnvio("")
    },[hora])
    
    useEffect(()=>{
        setFormValidado(false)
        
        localStorage.setItem("FormVikingsEspecial",JSON.stringify(payerInfoEspecial))
    },[payerInfoEspecial])// eslint-disable-line react-hooks/exhaustive-deps
    
    
    const handleChangesName=(e)=>{
        setPayerInfoEspecial({...payerInfoEspecial,name:e.target.value})
    }
    const handleChangesSurname=(e)=>{
        setPayerInfoEspecial({...payerInfoEspecial,surname:e.target.value})
    }
    const handleChangesAdress=(e)=>{
        setPayerInfoEspecial({...payerInfoEspecial,address:e.target.value})
    }
    const handleChangeP=(e)=>{
        setPayerInfoEspecial({...payerInfoEspecial,piso:e.target.value})
    }
    const handleChangeD=(e)=>{
        setPayerInfoEspecial({...payerInfoEspecial,departamento:e.target.value})
    }
    const handleChangeAreaNumber=(e)=>{
        setPayerInfoEspecial({...payerInfoEspecial,phone:{...phone,area_code: String(e.target.value)}})
        setPhone({...phone,area_code: String(e.target.value)})
    }
    const handleChangeNumber=(e)=>{
        setPayerInfoEspecial({...payerInfoEspecial,phone:{...phone,number: Number(e.target.value)}})
        setPhone({...phone,number: Number(e.target.value)})
    }
    const handleChangeHora = ()=>{
        setHoraEnvio(document.getElementById("horaEnvio").value)
    }
    const handlePago=(forma)=>{
        setPago(forma)
        if(forma==="mercadopago"){
            addImpuestosMP((total*10)/100)
        }else{
            removeImpuestos("impuestosMP")
        }
    }
    
    const handleFormSubmit = () =>{
        setFormValidado(true)
    }
    
    const handleRealizarPedido = async (tipoPago) => {
        setLoading(true)
        
        let currentTime=new Date()
        let minutes=currentTime.getMinutes()
        
        const order = {
            items: JSON.parse(localStorage.getItem("CarritoVikings")),
            payerInfoEspecial: JSON.parse(localStorage.getItem("FormVikingsEspecial")),
            metodo_pago: tipoPago,
            envio: hora === "" ?  "Proxima Entrega" : horaEnvio,
            precioTotal: tipoPago === "mercadopago" ? total+(total*10)/100 : total,
            horaDePedido: `${currentTime.getHours()}:${minutes<10?0:""}${minutes}`
        }
        
        if(hora!=="" && horaEnvio===""){
            Swal.fire({
                title: 'Debes seleccionar un horario',
                color: '#FAC710',
                confirmButtonColor: '#FAC710',
                background: 'black'
            })
        }else if(tipoPago==="efectivo"){
            await addNewOrder((order)).then(res => {
                Router.push(`https://vikingspage.vercel.app/StatusCompra?keyword=success&idCompra=${res}&pago=efectivo`)
            }).catch(err => {
                console.log(err)
            })
        }else if(tipoPago==="transferencia"){
            await addNewOrder((order)).then(res => {
                Router.push(`https://vikingspage.vercel.app/StatusCompra?keyword=success&idCompra=${res}&pago=transferencia`)
            }).catch(err => {
                console.log(err)
            })
        }
        setLoading(false)
    }


    return (
    <div className='form-container'>
        <ul className='lista-ul'>
            <li>- El envío no esta incluido en el precio de la web</li>
            <li>- El costo de envío varia entre 250/500 pesos</li>
            <li>- El costo de envío se te comunica via WhatsApp junto con la confirmación del pedido</li>
            <li>- El envío se abona en efectivo</li>
        </ul>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='form-datos'>

                <div className="input-span">
                    <input className="form-input" autoComplete="off" id="nameId" placeholder="Nombre" type="text" onChangeCapture={handleChangesName}
                    {...register("nameId",{required:true,maxLength:15})}/>
                    <span>
                        {errors.nameId?.type==="maxLength"&&"Se supero el limite de caracteres"}
                        {errors.nameId?.type==="required"&&"Campo obligatorio"}
                    </span>
                </div>

                <div className="input-span">
                    <input className="form-input" autoComplete="off" id="surnameId" placeholder="Apellido" type="text" onChangeCapture={handleChangesSurname}
                    {...register("surnameId",{required:true,maxLength:20})}/>
                    <span>
                        {errors.surnameId?.type==="maxLength"&&"Se supero el limite de caracteres"}
                        {errors.surnameId?.type==="required"&&"Campo obligatorio"}
                    </span>
                </div>

                <div className="input-span">
                    <input className="form-input" autoComplete="off" id="direccion" placeholder="Dirección o lugar de entrega" type="text" onChangeCapture={handleChangesAdress}
                    {...register("calle",{required:true,maxLength:60})}/>
                    <span>
                        {errors.calle?.type==="maxLength"&&"Se supero el limite de caracteres"}
                        {errors.calle?.type==="required"&&"Campo obligatorio"}
                    </span>
                </div>

                <div className="input-span">
                    <input className="form-input" autoComplete="off" id="piso"  placeholder="Piso (Opcional)" type="text" onChangeCapture={handleChangeP}
                    {...register("piso")}/>
                </div>

                <div className="input-span">
                    <input className="form-input" autoComplete="off" id="departamento"  placeholder="Departamento (Opcional)" type="text" onChangeCapture={handleChangeD}
                    {...register("departamento")}/>
                </div>

                <div style={{display:"flex"}} className="numero">
                    <div className="input-span input-span-number1">
                        <input className="form-input" autoComplete="off" id="numberAreaId"  placeholder="Código de area" type="number" onChangeCapture={handleChangeAreaNumber}
                        {...register("numberAreaId",{required:true,minLength:2,maxLength:4, pattern:/^[0-9]+/})}/>
                        <span>
                            {errors.numberAreaId?.type==="required"&&"Campo obligatorio"}
                            {errors.numberAreaId?.type==="minLength"&&"Código muy corto"}
                            {errors.numberAreaId?.type==="maxLength"&&"Código sin 0"}
                            {errors.numberAreaId?.type==="pattern"&&"Solo números"}
                        </span>
                        <span className='ej-num'>
                            Ej: 3487 / 11
                        </span>
                    </div>
                    <div className="input-span input-span-number2">
                        <input className="form-input" autoComplete="off" id="numberId"  placeholder="Num. celular" type="number" onChangeCapture={handleChangeNumber}
                        {...register("numberId",{required:true,minLength:6,maxLength:6, pattern:/^[0-9]+/})}/>
                        <span>
                            {errors.numberId?.type==="required"&&"Campo obligatorio"}
                            {errors.numberId?.type==="minLength"&&"Numero muy corto"}
                            {errors.numberId?.type==="maxLength"&&"Numero sin 15"}
                            {errors.numberId?.type==="pattern"&&"Solo números"}
                        </span>
                        <span className='ej-num'>
                            Ej: 700487
                        </span>
                    </div>
                </div>

            </div>

            {!formValidado &&<div>
                <button className="boton-validar">VALIDAR FORMULARIO</button>
            </div>}
        </form>
        {formValidado && <form>
            <ul className='lista-ul'>
                <li>- Las entregas empiezan a las 19:30hs</li>
                <li>- Último horario de entrega 23:30 (Miercoles-Jueves-Domingo)</li>
                <li>- Último horario de entrega 23:59 (Viernes-Sábado)</li>
            </ul>

            <div className='form-pago'>
                <div className='pago-title'>
                    <h2>HORA DE ENVIO</h2>
                </div>
                <div style={{display:'flex', flexDirection: 'column', marginBottom:'0.5em'}}>
                    <label htmlFor="45-50">
                        <input
                            type="radio"
                            name="hora"
                            value="45-50"
                            id="45-50"
                            onClick={()=>setHora("")}
                        />
                        Próxima entrega (45-50 mins)
                    </label>
                    <label htmlFor="otro" style={{display:'flex', alignItems:'center'}} >
                        <input
                            type="radio"
                            name="hora"
                            value="otro"
                            id="otro"
                            onClick={()=>setHora("horaEspecifica")}
                        />
                        Hora específica 
                        {hora==="horaEspecifica" ? 
                            <>
                                <select id='horaEnvio' onChangeCapture={handleChangeHora} style={{marginLeft: '0.5em', marginBottom:' 0.5em'}}>
                                    <option value={""}>HORA</option>
                                    {horaExacta<=1845 && <option value={"19:30"}>19:30</option>}
                                    {horaExacta<=1915 && <option value={"20:00"}>20:00</option>}
                                    {horaExacta<=1945 && <option value={"20:30"}>20:30</option>}
                                    {horaExacta<=2015 && <option value={"21:00"}>21:00</option>}
                                    {horaExacta<=2045 && <option value={"21:30"}>21:30</option>}
                                    {horaExacta<=2115 && <option value={"22:00"}>22:00</option>}
                                    {horaExacta<=2145 && <option value={"22:30"}>22:30</option>}
                                    {horaExacta<=2215 && <option value={"23:00"}>23:00</option>}
                                    {horaExacta<=2245 && <option value={"23:30"}>23:30</option>}
                                    {horaExacta<=2315 && <option value={"23:59"}>23:59</option>}
                                </select>
                            </>
                            :
                            <></>
                        }
                    </label>
                </div>
        </div>
            <div className='form-pago'>
                <div className='pago-title'>
                    <h2>METODO DE PAGO</h2>
                </div>
                <div style={{display:'flex', flexDirection: 'column'}}>
                    <label htmlFor="efectivo">
                        <input
                            {...register("pago",{required:true})}
                            type="radio"
                            name="pago"
                            value="efectivo"
                            id="efectivo"
                            onClick={()=>handlePago("efectivo")}
                        />
                        EFECTIVO
                    </label>
                    <label htmlFor="transferencia">
                        <input
                            {...register("pago",{required:true})}
                            type="radio"
                            name="pago"
                            value="transferencia"
                            id="transferencia"
                            onClick={()=>handlePago("transferencia")}
                        />
                        TRANSFERENCIA
                    </label>
                    <label htmlFor="mercadopago">
                        <input
                            {...register("pago",{required:true})}
                            type="radio"
                            name="pago"
                            value="mercadopago"
                            id="mercadopago"
                            onClick={()=>handlePago("mercadopago")}
                        />
                        MERCADOPAGO
                    </label>
                </div>
                {(pago !== '' && pago !== "efectivo")  &&
                <ul className='lista-ul'>
                    {pago === "mercadopago" && <li>- La opción Mercadopago Link tiene un 10% de aumento</li>}
                    {pago === "transferencia" && <li>- En la opcion Transferencia se otorga nuestro CBU para enviar el dinero</li>}
                </ul>}
            </div>
        </form>}


        {pago==="mercadopago"&&<p className='total total-MP'>Mercadopago: ${(total*10)/100}</p>}
        {pago==="mercadopago"?<p className='total'>TOTAL FINAL: ${total+(total*10)/100}</p>:<p className='total'>TOTAL FINAL: ${total}</p>}


        {formValidado && 
            <>
            {pago === "mercadopago" && <MercadoPagoButton items={items} total={total} hora={hora} horaEnvio={horaEnvio} clear={clear} payerInfoEspecial={payerInfoEspecial} formValidado={formValidado}/>}
            {(pago === "transferencia" || pago==="efectivo") &&
                <>
                    {loading?
                        <div style={{textAlign:"center"}}>
                            <Image src={loadingGIF} width={100} height={100} alt="LOADER"></Image>
                        </div>
                    :
                        <button className="boton-validar" onClick={()=>handleRealizarPedido(pago)}>REALIZAR PEDIDO</button>
                    }
                </>
            }
            </>
        }
        

        
    </div>
    );
}

export default Form;
