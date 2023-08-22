import React from 'react';
import { ConectorPlugin } from '../../../helper/Conector';
import vikingImagen from '../../../public/logo.png'


const ImprimirTicketButton = ({order, children}) => {

    
    const handleImprimir = async() => {
        let conector = new ConectorPlugin();
        conector.establecerEnfatizado(0);
        conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
        conector.establecerTamanioFuente(3, 3);
        conector.texto(`VIKINGS BURGER\n`);
        conector.feed(1);
        conector.establecerTamanioFuente(2, 2);
        conector.texto(`@vikingsburgerss\n`);
        conector.texto("_______________________")
        conector.feed(2);

        conector.establecerTamanioFuente(2, 1);
        conector.texto(`${order.payer.address}\n`);
        conector.establecerTamanioFuente(1, 1);
        conector.texto(`${order.envio}\n`);
        conector.texto(`${order.payer.name} ${order.payer.surname}\n`);
        conector.texto(`${order.payer.phone.area_code} ${order.payer.phone.number}\n`);
        
        await order.items.forEach(item => {
            conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
            conector.texto("_______________________")
            conector.feed(1)
            conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
            conector.establecerTamanioFuente(2, 1);
            conector.feed(2);
            conector.texto(`*-${item.title} $${item.unit_price}\n`);
            conector.establecerTamanioFuente(1, 1);
            item.adicionales?.length > 0 &&
                item.adicionales?.adBurger.forEach(adBurger =>{
                    adBurger.cantidad > 0 && conector.texto(`  -- x${adBurger.cantidad} ${adBurger.nombre} $${adBurger.precio * adBurger.cantidad}`)
                    conector.feed(1);
                })
                item.adicionales?.adPapas.forEach(adPapas =>{
                    conector.texto(`  -- ${adPapas.nombre} $${adPapas.precio}`)
                    conector.feed(1);
                })
                item.adicionales?.cambioPapas && conector.texto(`  ** ${item.adicionales.cambioPapas.nombre} $${item.adicionales.cambioPapas.precio}`)
        });
        conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
        conector.feed(3);
        conector.texto("***Gracias por su compra***");
        conector.feed(2);
        conector.cortar();


        conector.imprimirEn("EPSON TM-T20II Receipt")
        .then(respuestaAlImprimir => {
            if (respuestaAlImprimir === true) {
                console.log("Impreso correctamente");
            } else {
                console.log("Error. La respuesta es: " + respuestaAlImprimir);
            }
        });
    }

    return (
        <button onClick={() => handleImprimir()}>
            {children}
        </button>
    );
}

export default ImprimirTicketButton;
