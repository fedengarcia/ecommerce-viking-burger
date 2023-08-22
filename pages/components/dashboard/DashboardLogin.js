import {useState} from 'react';
import { getUsuario } from '../../../Firebase/FirebaseDB';

export default function DashboardLogin ({setLogin}) {
    const [usuario,setUsuario] = useState({
        usuario: '',
        pw: ''
    });

    const handleChange = (e,value) => {
        if(value === 'usuario'){
            setUsuario({...usuario,usuario:e.target.value})
        }else{
            setUsuario({...usuario,pw:e.target.value})
        }
    }

    const checkUsuario=(usuario)=>{
        getUsuario(usuario).then(res => {
            const fecha = {'dia': (new Date()).getDate(),'mes':((new Date()).getMonth()+1),"ano":(new Date()).getFullYear()};
            localStorage.setItem("usuarioDashVikings",JSON.stringify(fecha))
            setLogin(!res)
        }).catch(err => console.log(err))
    }

    return (
        <div className="logeo-block">
            <div className="logeo-container">

                <div className="loguin_input">
                    <label form="usuario">USUARIO:</label>
                    <input placeholder="Usuario" name="usuario" id="usuario" onChangeCapture={e => handleChange(e,'usuario')}/>
                </div>
                
                <div className="loguin_input">
                    <label form="contraseña">CONTRASEÑA:</label>
                    <input placeholder="Contraseña" type="password" name="contraseña" id="contraseña" onChangeCapture={e => handleChange(e,'pw')}/>
                </div>
                
                <div className="container-logeo-button">
                    <button onClick={()=>{checkUsuario(usuario)}}>ENTRAR</button>
                </div>
            </div>
        </div>
    )
}