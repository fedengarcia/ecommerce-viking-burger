import React,{useState, useEffect} from 'react';

const DashboardVentas = () => {

    const [optionType,setOptionType] = useState('NUEVA VENTA')
    const [reload,setReload] = useState(false);

    return (
        <div className='dashboard-ventas'>
            <div id="navProds" style={{display:'flex'}}>
                <button onClick={() => setOptionType('NUEVA VENTA')}>NUEVA VENTA</button>
                <button onClick={() => setOptionType('REALIZADAS')}>VENTAS REALIZADAS</button>
            </div>


            {
                optionType === "NUEVA VENTA" ? 
                
                <div className="ventas-container">
                    <h1>{optionType}</h1>
                </div> 
                
                
                
                :   <div className="ventas-container">
                        <h1>{optionType}</h1>

                    </div> 
            }
        </div>
    );
}

export default DashboardVentas;
