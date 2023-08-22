import { useState } from "react";

export default function DashboardBuscador ({adicionalesFiltrados, setAdicionalesFiltrados, optionType, listaProds,setProdsFiltrados,prodsFiltrados,setBusquedaProd}) {
    

    const getIndex = (id) =>{
        return prodsFiltrados.findIndex(item => item.id === id);
    }

    const [variable,setVariable]=useState(0)
    const [variable2,setVariable2]=useState(0)
    
    const buscador=(e)=>{
        var v = variable
        var v2 = variable2
        setBusquedaProd(false)
        if(e.target.value.length!=0){
            let busqueda = e.target.value.toUpperCase()
            for(let prod of listaProds){
                let tituloProd = prod.Nombre.toUpperCase().slice(0,busqueda.length)
                setVariable(1)
                v=1
                if(tituloProd === busqueda){
                    setVariable2(1)
                    v2=1
                    if(getIndex(prod.id) === -1){
                        setProdsFiltrados(prodsFiltrados => [...prodsFiltrados, prod])
                    }
                }else{
                    if(getIndex(prod.id) != -1){
                        setProdsFiltrados((prodsFiltrados.filter(item=>item.id!=prod.id)))
                    }
                }
            }
            if(v===0){
                setProdsFiltrados([])
            }else if(v===1 && v2===0){
                setBusquedaProd(true)
            }
        }else{
            setProdsFiltrados([])
        }
        setVariable(0)
        setVariable2(0)
    }

    return (
        <div className="dash-buscador">
            <input type="text" placeholder="Buscar producto" onChangeCapture={buscador}/>
        </div>
    )
}