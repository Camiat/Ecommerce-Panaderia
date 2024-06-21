import  './Footer.css';
import InstagramIcon from '../../assets/instagram.svg';
import FacebookIcon from '../../assets/facebook.svg';
import AdressIcon from '../../assets/adress.svg'
import TimeIcon from '../../assets/time.svg';
import RedesIcon from '../../assets/redes.svg';


function footer(){



    return(
        <>
         <footer>
            <div className='container-general'>
               <div className='uno'>
              <div className='ubicacion'>
                <img src={AdressIcon} alt="" />
               <p className='titulos'> Nuestras sucursales</p>
              </div>
              <div className='info'>
                 <p>Chacabuco 280</p>
                 <p>Gral. Paz 1200</p>
                 <p>24 de Septiembre 400</p>
              </div>
              </div>
                
                <div className='dos'>
                  <div className='time'>
                    <img src={TimeIcon} alt="" />
                  <p className='titulos'>Horarios:</p>
                  </div>

                  <p>Lun a Vie de 7:30 a 12:00 hs<br />
                  y de 17:00 a 20:00hs</p>
                  <p>Sab y Dom de 8hs a 18:30hs</p>
    
    
                </div>
              
                <div className='tres'>
                  <div className='sitios-web'>
                    <img src={RedesIcon} alt="" />
                <p className='titulos'>Nuestras redes</p>
                </div>
                <div className='redes'>
                <a href="https://www.instagram.com/"><img className='icon' src={InstagramIcon} alt="" /></a>
                <a href="https://www.facebook.com/?locale=es_LA"><img className='icon'  src={FacebookIcon} alt="" /></a>
                </div>
                <p className='email'>panlatucumanita@gmail.com</p>
                </div>
                </div>
            </footer>
        </>
    )
}

export default footer