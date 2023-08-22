import { useState,createContext,useEffect,useContext } from "react";
import { getAdicionalesBurger, getAdicionalesGenerales, getProductos } from "../Firebase/FirebaseDB";
import { UseStorageContext } from "./StorageContext";

export const UseCartContext = createContext();

export function CartContext ({children}) {

    const {CarritoCargado,carritoStorage} = useContext(UseStorageContext);

    const [items,setItems] = useState([]);
    const [itemTrashId,setItemTrashId] = useState(undefined);
    const [idCompra,setIdCompra] = useState(undefined);
    const [productos, setProductos] = useState([]);
    const [adMoment,setAdMoment]=useState({
        adBurger:{},
        adPapas:{},
        cambioPapas:{}
    })
    const [adicionalesBurger,setAdicionalesBurger]=useState([])
    const [adicionalesGenerales,setAdicionalesGenerales]=useState([])

    useEffect(() => {
        getProductos().then(res => {
            setProductos(res);
        }).catch(err => console.log(err))
        getAdicionalesBurger().then(res=>{
            setAdicionalesBurger(res)
        }).catch(err=> console.log(err))
        getAdicionalesGenerales().then(res=>{
            setAdicionalesGenerales(res)
        }).catch(err=> console.log(err))
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        setItems(carritoStorage)
    },[carritoStorage])// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(()=>{
        CarritoCargado(items)
    },[items])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        restAdicionales()
    },[adicionalesBurger])// eslint-disable-line react-hooks/exhaustive-deps
    
    
    // ACTUALIZAR CANTIDAD DE UN ITEM
    const updateQuantityItem = (id, newQuantity) => {
        const newItems = [...items]
        const position = getIndex(id);
        newItems[position]["quantity"] = newQuantity;
        setItems(newItems);
    }

    //DEVUELVE -1 SI NO EXISTE EL ITEM
    const getIndex = (id) =>{
        return items.findIndex(item => item.id === id);
    }

    //AGREGO UN ITEM AL CARRITO, SI EXISTE LE CAMBIO LA CANTIDAD
    const addItem = (item) => {
        setItems(items => [...items,item])
    }

    const addImpuestosMP = (unit_price) => {
        const impuestosMP = {
            id:"impuestosMP",
            title: "Tasa Mercadopago",
            quantity: 1,
            unit_price: unit_price,
        }

        let result = getIndex("impuestosMP");
        if(result === -1){
            setItems(items => [...items,impuestosMP])
        }else{
            const newItems = [...items];
            newItems[result]["unit_price"] = impuestosMP.unit_price;
            setItems(newItems);
        }
    }

    //DEVUELVO EL PRECIO TOTAL DE LA COMPRA
    const getTotalPriceCart = () =>{
        const totalPrice = items.filter(item.id!=="impuestosMP").reduce(function(accumulator, currentValue) {
            return accumulator + (currentValue.unit_price * currentValue.quantity) ;
          },0);
        return totalPrice;
    }

    const getTotalPriceForm = () =>{
        const totalPrice = items.filter(item=>item.id!=="impuestosMP").reduce(function(accumulator, currentValue) {
            return accumulator + (currentValue.unit_price * currentValue.quantity) ;
          },0);
        return totalPrice;
    }

    //DEVUELVO CANTIDAD DE TOTAL ITEMS EN CARRITO
    const getQuantity = () => {
        const quantity = items.reduce(function(accumulator, currentValue) {
            if(currentValue.id!=="envioprod" && currentValue.id!=="packaging" && currentValue.id!=="impuestosMP"){
                return accumulator + currentValue.quantity;
            }else{
                return accumulator + currentValue.quantity - 1;
            }
          },0);
        
        return quantity;
    }

    //SACO UN ITEM DEL CARRITO
    
    const removeItem = (id) => {
        const newArray = items.filter((item,indice)=>indice!==id)
        if(newArray.length===0){
            setItems(newArray)
            localStorage.setItem("CarritoVikings",[])
        }else{
            setItems(newArray)
        }
    }

    const removeImpuestos = (id) => {
        const newArray = items.filter((item,indice)=>item.id!==id)
        setItems(newArray)
    }

    //LIMPIO POR COMPLETO EL CARRITO
    const clear = () => {
        setItems([])
    }

    // DEVUELVO TODOS LOS ITEMS DEL CARRITO
    const getItems = () => {
        return items;
    }

    // RESTABLEZCO ADICIONALES
    const restAdicionales=()=>{
        if(adMoment["adBurger"]!==undefined){
            let newArray=[]
            for(let i=0;i<adicionalesBurger.length;i++){
                newArray.push({nombre:adicionalesBurger[i].nombre,cantidad:0,tipo:adicionalesBurger[i].tipo,precio:adicionalesBurger[i].precio})
            }
            setAdMoment({...adMoment,adBurger:newArray})
            return adMoment
        }
    }


    return(<UseCartContext.Provider value={{restAdicionales,adMoment,setAdMoment,productos,adicionalesBurger,adicionalesGenerales,addImpuestosMP, items, clear,updateQuantityItem,addItem, getTotalPriceCart,getTotalPriceForm,getQuantity,getItems,removeItem,removeImpuestos,setItems,setAdMoment}}>
        {children}
    </UseCartContext.Provider>)
}