import './Details.css';
import { useState,useEffect } from 'react';

function Details({setRouter}) {
 
    const [producto, setProducto] = useState(null);
  
    useEffect(() => {
      const productoDetalles = JSON.parse(localStorage.getItem('productoDetalles'));
      if (productoDetalles) {
        setProducto(productoDetalles);
      }
    }, []);
  
    if (!producto) {
      return <div>Cargando...</div>;
    }
  

    function agregarAlCarrito(producto) {
      //obtengo productos bajo la clave productos y los almaceno en let productos
      let productos = JSON.parse(localStorage.getItem('productos'));
       // Verifico si ya existen productos en el carrito
      if (productos) {
         // Si ya hay productos en el carrito, agrego el nuevo producto al final de la lista
        localStorage.setItem('productos', JSON.stringify([...productos, { ...producto, carritoId: productos.length + 1 }]));
      } else {
         // Si no hay productos en el carrito, creo un nuevo carrito con el producto
        localStorage.setItem('productos', JSON.stringify([producto, { ...producto, carritoId: 1 }]));
      }
      alert('Agregaste un producto a tu carrito')
    }


return(
<>
    <button className='back' onClick={() => setRouter(1)} >Volver atras </button>

   <div className='details-container'>
          
  
        <div className='producto-details'>
              <div>
                <img src={producto.imagen} />
              </div>

              <div>

                <div className='details'>
                  <h1>{producto.nombre}</h1>
                  <p>{producto.descripcion}</p>
                  <h4>Precio:${producto.precio}</h4>
                </div>
              
               <div className='botones-details'>
                <button className='btn-de-compra' onClick={() => agregarAlCarrito(producto)}>Comprar</button>
                <button className='btn-ir-carrito' onClick={() => setRouter(4)}>Ir a carrito</button>
               </div>

              </div>

              </div>
              
              
        </div>




</>
)
}

export default Details