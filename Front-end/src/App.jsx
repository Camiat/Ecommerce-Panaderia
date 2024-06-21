import { useState, useEffect } from 'react';
import './App.css'
import Registro from './componentes/Registro/Registro.jsx';
import Login from './componentes/Login/Login.jsx';
import Cart from './componentes/Cart/Cart.jsx';
import About from './componentes/About/About.jsx';
import Contact from './componentes/Contact/Contact.jsx';
import Favoritos from './componentes/Favoritos/Favoritos.jsx';
import Details from './componentes/Details/Details.jsx';
import Home from './componentes/Home/Home.jsx'
import Nav from './componentes/Nav/Nav.jsx';
import Footer from './componentes/Footer/Footer.jsx';



export default function App() {
  
  const [router, setRouter] = useState(1);
  const [usuario, setUsuario ] = useState(localStorage.getItem('usuariologeado'));


 

  useEffect(() => {
    if (1 === router) {
      window.history.pushState(null, '', '/')
    } else if (2 === router){
      window.history.pushState(null, '', '/registro')
    } else if (3 === router){
      window.history.pushState(null, '', '/login')
    } else if (4 === router){
      window.history.pushState(null, '', '/miCarrito')
    } else if (5 === router){
      window.history.pushState(null, '', '/sobreNosotros')
    } else if (6 === router){
      window.history.pushState(null, '', '/contactanos')
    } else if (7 === router){
      window.history.pushState(null, '','/misFavoritos')
    } else if (8 === router){
      window.history.pushState(null, '','/details')
    }
    
  },[router]);

  


  

  if (router === 1) {
    return (
      <>
        <Nav setRouter={setRouter}  usuario={usuario} setUsuario={setUsuario}/>
        <Home setRouter={setRouter}/>
        <Footer />

      </>
    );
  }

  if (router === 2) {
    return (
      <>
        <Nav setRouter={setRouter} usuario={usuario} setUsuario={setUsuario} />
        <Registro setRouter={setRouter} />
        <Footer />
      </>
    );
  }

  if (router === 3) {
    
    return (
    <>
       <Nav setRouter={setRouter} usuario={usuario} setUsuario={setUsuario}/>
       <Login setRouter={setRouter} setUsuario={setUsuario} />
       <Footer />
    </>
    ) 
  }

  if (router === 4) {
    return(
      <>
      <Nav setRouter={setRouter} usuario={usuario} setUsuario={setUsuario}/>
      <Cart setRouter={setRouter} />
      <Footer />
     </>
    )
  }

  if (router === 5) {
    return( 
    <>
    <Nav setRouter={setRouter} usuario={usuario} setUsuario={setUsuario}/>
    <About setRouter={setRouter} />
    <Footer />
    </>
    )
  }


  if (router === 6){
    return (
    <>
    <Nav setRouter={setRouter} usuario={usuario} setUsuario={setUsuario}/>
    <Contact setRouter={setRouter} />
    <Footer />
    </>

    )
  }

  if (router === 7){
    return (
      <>
      <Nav setRouter={setRouter} usuario={usuario} setUsuario={setUsuario}/>
      <Favoritos setRouter={setRouter} />
      <Footer />
    </>
    )

  }

  if (router === 8){
    return (
      <>
       <Nav setRouter={setRouter} usuario={usuario} setUsuario={setUsuario}/>
       <Details setRouter={setRouter} />
       <Footer />
      </> 
  )
  }
}
