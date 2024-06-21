import { useEffect, useState } from 'react';
import './Cart.css'
import TruckIcon from '../../assets/truck.svg';
import VisaIcon from '../../assets/visa.svg';
import MasterIcon from '../../assets/master.svg';

function Cart({setRouter}){
    const [productos, setProductos] = useState(JSON.parse(localStorage.getItem('productos')));
    const [precioTotal, setPrecioTotal] = useState(0)
    // JSON.parse() // JSON -> JS
    // JSON.stringify() // JS -> JSON

    // 1. creo useffect escuchando a productos.
    useEffect(()=> {
        // 2. sumar el precio de todos los productos.
        let sumaTotal = 0;

        for (const producto of productos){
            sumaTotal = sumaTotal + producto.precio
        }

        // 3. guardo esa suma total en setpreciototal
         setPrecioTotal(sumaTotal)
    }, [productos])

    function handleClick(productoId) {
        const arrayFiltrado = [];

       for (const producto of productos){
        if (producto.carritoId === productoId){
            // Si es el que quiero borrar, no lo agrego al array nuevo filtrado.
        } else {
            arrayFiltrado.push(producto) 
        }
       }

        localStorage.setItem('productos', JSON.stringify(arrayFiltrado))
        setProductos(arrayFiltrado)
    }

    function handleFinalizarCompra() {

        const usuarioLogeado = localStorage.getItem('usuariologeado');
        if (usuarioLogeado){
            alert('Pago efectuado con exito. ¡Gracias por tu compra!');
        setRouter(1)
        } else{
            alert ('Necesitas estar logeado antes de comprar')
        }
       
       
           
    }
 
    return(
    <>
    <div className="container-cart">
            <div className="left-cart">
                <h2 className="titulo-Carrito">Mi carrito</h2>
           
                    {productos.map((producto) => (
                      <div className='productos'>
                       <div className='image-productos'>
                          <img src={producto.imagen} />
                       </div>
                       <div className="productos-info">
                          <h3>{producto.nombre}</h3>
                          <p>{producto.descripcion}</p>
                          <h4>Precio:${producto.precio}</h4>
                          <button onClick={() => handleClick(producto.carritoId)} className="delete-btn">Eliminar</button>
                       </div>
                     
                     </div> 
                ))}
                
            </div>

            <div className="right-cart">
                    <p><strong>Total: ${precioTotal}</strong></p>

                    <div className='envio'>
                    <p className='p2'><strong>Envio gratis</strong> </p>
                    <img src={TruckIcon} alt="" />
                    </div>

                    <div className='pagos'>
                        <p>Medios de pago:</p>
                        <div className='card'>
                            <img src={MasterIcon} alt="" />
                            <img src={VisaIcon} alt="" />
                        </div>
                    </div>
                    
                    <button onClick={handleFinalizarCompra} className="comprar-btn">Finalizar compra</button>
                    <button onClick={() => setRouter(1)} className='continuar-btn'>Continuar comprando</button>
                
            </div>
              
    
        </div>
          
        </>
    )        
};

export default Cart


