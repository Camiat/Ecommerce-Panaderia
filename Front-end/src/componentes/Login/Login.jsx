import { useState } from "react"
import './Login.css';
import EyeIcon from '../../assets/eyeopen.svg';
import EyeCloseIcon from '../../assets/eyeclose.svg';

function Login({setRouter,setUsuario}) {

    const [nombreDeUsuario, setNombreDeUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [contraseniaError, setConstraseniaError] = useState('');
    const [passwordVisible, setPasswordVisible ] = useState("password");

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        if (!contrasenia) {
            setConstraseniaError('El campo contraseña es obligatorio');
            return;
        }else{
            setConstraseniaError('');
        }


        const response = await fetch('http://localhost:3078/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ nombreDeUsuario, contrasenia })
        });

       

        if (response.status === 200) {
            const usuarioLogueado = await response.json();
            // alert(JSON.stringify(usuarioLogueado));
            localStorage.setItem('usuariologeado', usuarioLogueado.nombreDeUsuario)
            localStorage.setItem('idusuario',usuarioLogueado._id)
            
            alert('inicio de sesion exitoso');
            setRouter(1);
            setUsuario(usuarioLogueado.nombreDeUsuario)
            
        }else {alert ('el usuario no existe')}
    }



    return <div className="background">
        <section className="login">
              <div className="login-container">
            <h2 className="titulo-login">Iniciar sesión</h2>
            
            <form onSubmit={handleSubmit} >
                <div className="nombre-usuario">
                    <label for="">Nombre de usuario:</label>
                    <input type="text" name="username" onChange={(e) => setNombreDeUsuario(e.target.value)} value={nombreDeUsuario} />
                </div>

                <div className="contrasenia">
                    <label for="">Contraseña:</label>
                    <div className="div-password">
                    <input type={passwordVisible} name="password" onChange={(e) => setContrasenia(e.target.value)} value={contrasenia} />
                    <img className="eye-password" onClick={() => setPasswordVisible(passwordVisible === "password" ? "text" : "password")} src={passwordVisible === "password" ? EyeCloseIcon : EyeIcon} />
                    </div>
                    {contraseniaError && <small>{contraseniaError}</small>}
                </div>

                <button className="btn-Login">Ingresar</button>
            </form>
            <div className="link-login">
                <p>¿No tienes cuenta aun? <button onClick={() => setRouter(2)}>Registrate</button></p>
            </div>
        </div>
        </section>
    </div>

}

export default Login