import { useState,useEffect} from "react"
import DashboardContainer from "./components/dashboard/DashboardContainer"
import DashboardLogin from "./components/dashboard/DashboardLogin"

export default function Dashboard(){

    // LOGIN---------------------------------------------
    const [login, setLogin] = useState(true)

    useEffect(()=>{
        const data = {'dia': (new Date()).getDate(),'mes':((new Date()).getMonth()+1),"ano":(new Date()).getFullYear()};
        if(!localStorage.getItem("usuarioDashVikings")){
        }else{
            const fecha = {'dia': (new Date()).getDate(),'mes':((new Date()).getMonth()+1),"ano":(new Date()).getFullYear()};
            const dataStorage = JSON.parse(localStorage.getItem("usuarioDashVikings"));
            if ((dataStorage.ano>=fecha.ano) && (dataStorage.mes>=fecha.mes) && (dataStorage.dia>=fecha.dia)) { // un dia en ms
                setLogin(false)
            }
        }
    },[login])// eslint-disable-line react-hooks/exhaustive-deps
    return(
        <>
            {login?
               <DashboardLogin setLogin={setLogin} login={login}/>
                :
                <DashboardContainer/>
            }
        </>    
    )
}