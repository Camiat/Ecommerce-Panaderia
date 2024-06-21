import './Nav.css'
import BreadIcon from '../../assets/bread.svg';
import CartIcon from '../../assets/cart.svg';
import HeartIcon from '../../assets/heart.svg';
import MenuIcon from '../../assets/menuIcon.svg';
import userIcon from '../../assets/user.svg';




function Nav({setRouter, usuario, setUsuario}){
   
 //funcion cerrar sesion
    function handleClickOutSession (){
        localStorage.setItem('usuariologeado','')
        
        setUsuario('')
        setRouter(1)
    }

//Menú desplegable
    function handleToggleMenu() {
      const menu = document.getElementById('nav-menu');
      menu.classList.toggle('open');
  }

  

  return (
    <>
       <div>
             
             <nav>
   
               <div className='logo'>
                 <img className='bread' onClick={() => setRouter(1)} src={BreadIcon} alt="" />
                 <p onClick={() => setRouter(1)}>Pan La Tucumanita</p>
               </div>
   
               <div className='secciones'>
   
               <button onClick={() => setRouter(1)}>Home</button>
               <button onClick={() => setRouter(5)}>Sobre Nosotros</button>
               <button onClick={() => setRouter(6)}>Contáctanos</button>
               </div>
   
               
               <div className='secciones2'>
               <img onClick={()=> setRouter(4)} src={CartIcon} alt="" />
               <img onClick={() => setRouter(7)} src={HeartIcon} className='heart-nav' alt="" />

               
               <div className='user'  >
                 <img src={userIcon} alt="" /><p className='usuario-name'>{ usuario }</p> 
                </div>
              
               
               {
                 usuario &&  <button onClick={handleClickOutSession}>Cerrar Sesión</button>
               }
               
               
               
               { !usuario && <div>
               <button className='btn-register' onClick={() => setRouter(2)}>Registro</button>
               <button onClick={() => setRouter(3)}>Login</button>
               </div>
               }

               
               </div>

               {/* ------Menu desplegable------- */}
               <div className='iconos-menu'>
                
               <img onClick={()=> setRouter(4)} src={CartIcon} alt="" />
               <img onClick={() => setRouter(7)} src={HeartIcon} className='heart-nav' alt="" />
               <img className='menu-icon' onClick={handleToggleMenu} src={MenuIcon} alt="Menu" />
                
               
               </div>    

              <div id='nav-menu' className='menu-desplegable'>

                <div className='secciones-menu'>
                    
                   <div className='name-user-desplegable'> 
                    <img src={userIcon} alt="" /> 
                    <p className='name-desplegable'>{usuario}</p>
                    </div>
   
                     <button className='home' onClick={() => setRouter(1)}>Home</button>
                     <button className='sobre-nosotros' onClick={() => setRouter(5)}>Sobre Nosotros</button>
                     <button className= 'contactanos' onClick={() => setRouter(6)}>Contáctanos</button>

                    <div className='seccion-login'>
                     {
                       usuario &&  <button className='cerrar-sesion' onClick={handleClickOutSession}>Cerrar Sesión</button>
                      }
               
                    { !usuario && <div className='registro-login'>
                    <button className='button-de-registro' onClick={() => setRouter(2)}>Registro</button>
                     <button className='button-de-login' onClick={() => setRouter(3)}>Login</button>
                    </div>
               }
               </div>

                     </div>

               </div>

             
   
             </nav>
   
              </div>
    
    </>
  )

}

export default Nav