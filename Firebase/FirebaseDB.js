import { initializeApp } from "firebase/app";
import {doc, getDoc, getFirestore, orderBy} from "firebase/firestore";
import { collection, getDocs, where, query, limit, setDoc, addDoc, updateDoc, deleteField, deleteDoc} from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage"

const firebaseConfig = {
  apiKey: '',
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//USUARIO DASHBOARD
export const getUsuario = async(usr)=>{
  const user = doc(db,"Usuario","lFyVUzXvhiWMj3Ta1sz2");
  const userDataDoc = await getDoc(user);
  const userData = userDataDoc.data()

  if(usr.usuario === userData.usuario  && usr.pw === userData.pw)
    return true
  else
    return false

}

//OBTENER PRODUCTOS
export const getProductos = async() =>{
  var productosDocs = await getDocs(query(collection(db,"Menu"),orderBy("nombre")));
  const productos = productosDocs.docs.map(doc=>{return{id:doc.id,...doc.data()}})
  return(productos)
}


//OBTENER ADICIONALES GENERALES
export const getAdicionalesGenerales = async(type) =>{
  var adicionales_generales = await getDocs(query(collection(db,"Adicionales_generales"),orderBy("nombre")));
  
  const adicionales = adicionales_generales.docs.map(doc=>{return{id:doc.id,...doc.data()}})
  return(adicionales)
}


//OBTENER ADICIONALES BURGER
export const getAdicionalesBurger = async() =>{
  var adicionales_burgers = await getDocs(query(collection(db,"Adicionales_burger"),orderBy("nombre")));

  const adicionales = adicionales_burgers.docs.map(doc=>{return{id:doc.id,...doc.data()}})
  return(adicionales)
}


// DASHBOARD PRODUCTOS
// UPDATE PRODUCT
export const editPropProduct = async (id,type,data) => {
  const product = doc(db, "Menu", id);
  if(type === "nombre"){
    await setDoc(product,{nombre:data}, {merge:true})
  }
  if(type === "descripcion"){
    await setDoc(product,{descripcion:data}, {merge:true})
  }
  if(type === "tipo"){
    await setDoc(product,{tipo:data}, {merge:true})
  }
  if(type === "precio"){
    await updateDoc(product, {
      precio: deleteField()
    });
    await updateDoc(product, {
      precio: data
    });
  }
  if(type === "img"){
    await setDoc(product,{img:data}, {merge:true})
  }
  if(type === "hasAditional"){
    await setDoc(product,{hasAditional:data}, {merge:true})
  }
}

// UPDATE ADICIONAl
export const editPropAdicionales = async (id, propType, data,adicionalType) => {
  if(adicionalType === "generales" || adicionalType === "generales2" ){
    var adicional = doc(db, "Adicionales_generales", id);
  }else{
    var adicional = doc(db, "Adicionales_burger", id);
  }
  if(propType === "nombre"){
    await setDoc(adicional,{nombre:data}, {merge:true})
  }
  if(propType === "precio"){
    await setDoc(adicional,{precio:Number(data)}, {merge:true})
  }
  if(propType === "tipo"){
    await setDoc(adicional,{tipo:data}, {merge:true})
  }
  if(propType === "tipo2"){
    await setDoc(adicional,{tipo2:data}, {merge:true})
  }
  if(propType === "imagen"){
    await setDoc(adicional,{img:data}, {merge:true})
  }
}

// DASHBOARD REF IMAGE
const storage=getStorage(app)

export const addStorage = async(titulo,carpeta,imagen)=>{
  
  const storageRef = ref(storage,`${carpeta}/${titulo}.webp`)
  await uploadBytes(storageRef,imagen);
  return(getDownloadURL(ref(storage,`${carpeta}/${titulo}.webp`)));
}

export const removeProduct = async (id) => {
  await deleteDoc(doc(db, "Menu", id));
}

export const removeAdicional = async (id,adicionalType) => {
  if(adicionalType === "generales"){
    await deleteDoc(doc(db, "Adicionales_generales", id));
  }else{
    await deleteDoc(doc(db, "Adicionales_burger", id));
  }

}

export const addProducto = async (producto,img) => {
  const newProd={
    ...producto, img:img
  }

  await addDoc(collection(db, "Menu"),newProd);
  return (true)
}

export const addAdicional = async (adicionalType,adicional) => {
  if(adicionalType === "BURGERS"){
    await addDoc(collection(db, "Adicionales_burger"),adicional);
  }else{
    await addDoc(collection(db, "Adicionales_generales"),adicional);

  }

  return (true)
}


//CARGAR UNA NUEVA ORDEN DE COMPRA
export const addNewOrder = async (order,id) => {

  const fechaOrder={'dia': (new Date()).getDate(),'mes':((new Date()).getMonth()+1),"ano":(new Date()).getFullYear()}

  let newOrder = {}

  if(id!==undefined){
    newOrder = {
        fecha:fechaOrder,
        items: order.items,
        envio:order.envio,
        payer: order.metodo_pago==="mercadopago"?order.payer:order.payerInfoEspecial,
        entregado: false,
        metodo_pago: order.metodo_pago,
        address:{street_name:"Lopez y Planes",street_number:677,zip_code:"2800"},
        email:"Vikings.burgerss@gmail.com",
        precioTotal: order.precioTotal,
        horaDePedido: order.horaDePedido,
        eliminado: false,
      };
      await setDoc(doc(db, "Orders",id), newOrder);
  }else{
    newOrder = {
      fecha:fechaOrder,
      items: order.items,
      envio:order.envio,
      payer: order.metodo_pago==="mercadopago"?order.payer:order.payerInfoEspecial,
      entregado: false,
      metodo_pago: order.metodo_pago,
      address:{street_name:"Lopez y Planes",street_number:677,zip_code:"2800"},
      email:"Vikings.burgerss@gmail.com",
      precioTotal: order.precioTotal,
      horaDePedido: order.horaDePedido,
      eliminado: false,
    };
    const doc = await addDoc(collection(db, "Orders"), newOrder);
    return(doc.id);
  }

}

// REMOVE ORDER
export const removeOrder = async (id) => {
  await deleteDoc(doc(db, "Orders", id));
}

// //CARGAR UNA NUEVA ORDEN DE COMPRA TEMPORAL
export const addNewOrderFalse = async (order) => {
  
  const fechaOrder={'dia': (new Date()).getDate(),'mes':((new Date()).getMonth()+1),"ano":(new Date()).getFullYear()}

  const newOrder = {
      fecha:fechaOrder,
      items: order.items,
      payer: order.payerInfoEspecial,
      entregado: false,
      envio: order.envio,
      horaDePedido: order.horaDePedido,
      metodo_pago: "mercadopago",
      precioTotal: order.precioTotal,
      primerCarga:order.primerCarga
  };
  const doc = await addDoc(collection(db, "OrdersFalses"), newOrder);
  return(doc.id);
}

// REMOVE ORDER TEMPORAL
export const removeOrderTemporal = async (id) => {
  await deleteDoc(doc(db, "OrdersFalses", id));
}

export const updateOrderTemporal = async (id)=>{
  const orders = doc(db, "OrdersFalses", id);
  await updateDoc(orders,{
    primerCarga:false
  })
  return true
}

// DASHBOARD GET ORDERS
export const getOrders = async(typeOrder) => {
  
  const ordersDoc = await getDocs(query(collection(db,typeOrder),orderBy("fecha")));
  const orders = ordersDoc.docs.map(doc=>{return{id:doc.id,...doc.data()}});
  return(orders);
}


export const getOrderbyId = async(id) => {
  const orderRef =  doc(db, 'Orders', id);
  const order = await getDoc(orderRef);
  return order.data();
}

export const getOrderFalsebyId = async(id) => {
  const orderRef =  doc(db, 'OrdersFalses', id);
  const order = await getDoc(orderRef);
  return order.data();
}

export const setOrderEntregada = async(id, state) => {
  const order =  doc(db, 'Orders', id);
  await setDoc(order, { entregado: state }, { merge: true });
}

export const removeOrderFinal = async (id,typeOrder) => {
  if(typeOrder === "RECHAZADA"){
    await deleteDoc(doc(db, "OrdersFalses", id));
  }else{
    const order = doc(db, "Orders", id);
    await setDoc(order,{eliminado:true}, {merge:true})
  }  

}
