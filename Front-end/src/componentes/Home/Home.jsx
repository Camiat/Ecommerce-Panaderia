import { useState, useEffect } from 'react';
import HeartIcon from '../../assets/heart.svg';
import './Home.css'
import SearchIcon from '../../assets/search.svg';
import Carrusel from '../Carrusel/Carrusel.jsx'; 


function Home({ setRouter }) {
  const [productos, setProductos] = useState([]);
  const [searchProducto, setSearchProducto] = useState('');
  const [filtrarBusqueda, setFiltrarBusqueda] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

// Buscador
useEffect(() => {
  if (searchProducto === '') {
    setFiltrarBusqueda(productos);
  } else {
    setFiltrarBusqueda(
      productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchProducto.toLowerCase())
      )
    );
  }
}, [searchProducto, productos]);

  //obtengo productos
  async function obtenerProductos() {
    const response = await fetch('http://localhost:3078/api/productos');
    const productosJson = await response.json();

    setProductos(productosJson);
  }

  //Agregar al Carrito
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
  }


  //Agregar a Favoritos
  async function agregarFavorito(producto) {
    try {
      const response = await fetch('http://localhost:3078/api/agregarFavoritos', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },                                                  //tiene los usuarios logueados de login
        body: JSON.stringify({ idUsuario: localStorage.getItem('idusuario'), idProducto: producto._id })//_id en mongo


      });

      const favoritosJson = await response.json();
      console.log(favoritosJson);
      alert('Agregado a Favoritos')
    } catch (error) {
      console.log(error)
    }

  }

  //Detalles
  function verDetalles(producto) {
                                           //convierte objeto js a cadena json p guardarlos en localstorage
    localStorage.setItem('productoDetalles', JSON.stringify(producto));
    setRouter(8); 
  }


  return (
    <>
      <Carrusel /> 
     <div className='nuestros-productos'>
     <h1 className='title-productos'>Nuestros Productos</h1>
        <div className='buscador'>
        <input type="text" placeholder='  ¿Qué producto buscas?'
         value={searchProducto}
            onChange={e => setSearchProducto(e.target.value)}
            /><img src={SearchIcon} alt="" />
        </div>
      <div className='producto-container'>
        
      {filtrarBusqueda.length > 0 ? (
        
        filtrarBusqueda.map((producto) => (
            <div className='producto'>


              <img onClick={() => verDetalles(producto)} src={producto.imagen} />
              <h1>{producto.nombre}</h1>
              <h4>Precio:${producto.precio}</h4>
               
               <div className='botones'>
              <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
              <img onClick={() => agregarFavorito(producto)} className='icon-heart' src={HeartIcon} alt="" />
              </div>

            </div>
            ))
          ) : (
            <p className='no-productos'>Producto no encontrado</p>
          


        )}
      </div>
      </div>


    </>
  );
}

export default Home