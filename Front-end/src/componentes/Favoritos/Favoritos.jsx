import { useState, useEffect } from 'react'
import './Favoritos.css'

function Favoritos() {
  const [favoritos, setFavoritos] = useState([])

  useEffect(() => {
    const usuarioLogeado = localStorage.getItem('usuariologeado');
    if (usuarioLogeado){
    obtenerFavoritos();
  } else {
    setFavoritos([])
  }
  }, []);

  async function obtenerFavoritos() {
    try {
      const response = await fetch('http://localhost:3078/api/favoritos', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idUsuario: localStorage.getItem('idusuario')})

      })
      
      const favoritosJson = await response.json();
      
     // console.log(favoritosJson)

      setFavoritos(favoritosJson);
    } catch (error) {
      console.log(error)
    }
  }

 
  //funcion eliminar favoritos
  async function handleClick(idProducto){
    
    const idUsuario= localStorage.getItem('idusuario')
    

    try {
      const response = await fetch(`http://localhost:3078/api/deleteFavorito?idProducto=${idProducto}&idUsuario=${idUsuario}`, {
        method: 'DELETE', // Método DELETE para eliminar un favorito
        credentials: 'include' // Incluimos las credenciales para la sesión
        
      });
      
  
      if (response.ok) {
        // Si la eliminación fue exitosa, actualizamos la lista de favoritos
        obtenerFavoritos();
      } else {
        console.error('Error al eliminar el favorito');
      }
    } catch (error) {
      console.error('Error al eliminar el favorito', error);
    }
  }



  return (
    <>

      <div className='favorito-container'>

        {favoritos.map((favorito) => (
            favorito.map((fav) =>(
            <div className='producto-fav'  >
              <img   src={fav.imagen} />
              <h1>{fav.nombre}</h1>
              <h4>Precio:${fav.precio}</h4>


              <button onClick={() => handleClick(fav._id)}> Quitar </button>


            </div>
            ))
          ))

        }
      </div>
    </>
  )


}

export default Favoritos