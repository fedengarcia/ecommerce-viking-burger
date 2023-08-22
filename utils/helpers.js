import { getPreciseDistance } from 'geolib';


export default function calcularDistancia(addressClient,setDistancia){


    const vikingBurgerAddress = {latitude: -34.108280, longitude: -59.014140}

    // const urlAddressShipping = `http://api.positionstack.com/v1//forward?access_key=82b52c921b25505a30e10e0ac5a2fc27&query=${"Zarate Buenos Aires Argentina"}`
    
    const url = `http://api.positionstack.com/v1/forward?access_key=82b52c921b25505a30e10e0ac5a2fc27&query=${addressClient}`

    fetch(url).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        const addressClientData = {
            latitude: response.data[0].latitude,
            longitude: response.data[0].longitude,
        }


        //LA DISTANCIA OBTENIDA ESTA EN METROS
        const dis = getPreciseDistance(vikingBurgerAddress,addressClientData,1)
  
        // setDistancia(dis)
    });

    
}