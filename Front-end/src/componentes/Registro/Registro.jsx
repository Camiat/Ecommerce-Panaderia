import { useState } from "react"
import './Registro.css';
import EyeIcon from '../../assets/eyeopen.svg';
import EyeCloseIcon from '../../assets/eyeclose.svg';

function Registro({setRouter}) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [nombreError, setNombreError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [contraseniaError, setConstraseniaError] = useState('');
    const [confirmarError, setConfirmarError] = useState('');
    const [passwordVisible, setPasswordVisible ] = useState("password");


    async function handlesubmit(e) {
        e.preventDefault();

        if (!nombre) {
            setNombreError('El campo nombre es obligatorio.');
            return;
        } else {
            setNombreError('');
        }


        if (!email) {
            setEmailError('El campo email es obligatorio');
            return;
        }else{
            setEmailError('');
        }

        if (!contrasenia) {
            setConstraseniaError('El campo contraseña es obligatorio');
            return;
        }else{
            setConstraseniaError('');
        }

        if (!confirmar) {
            setConfirmarError('El campo confirmar contraseña es obligatorio');
            return;
        }else{
            setConfirmarError('');
        }


        if (contrasenia !== confirmar) {
            setConfirmarError('Las contraseñas no coinciden');
            return;
        } else {
            setConfirmarError('');
        }

        if (!(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(contrasenia))) {
           setConstraseniaError('La contraseña debe tener al menos 8 caracateres, un numero, una mayúscula, una minúscula');
           return;
        } else {
            setConstraseniaError('');
        }


        const response = await fetch('http://localhost:3078/api/registro', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombreDeUsuario: nombre, email, contrasenia })
        });

        
        if (response.status === 201) {
            alert('registro exitoso');
            setRouter(3)
        }
    }

    return (<>
            <div className="background-registro">
             <section className="registro">
                  
                <div className="container-registro">
                    <h1 className="registro-titulo">¡Bienvenido! Crea tu cuenta aquí</h1>
                    <form action="" onSubmit={handlesubmit}>
                        <div className="">
                            <label htmlFor="">Nombre de Usuario:</label>
                            <input type="text" placeholder="nombre de usuario" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                            {nombreError && <small className="small-error">{nombreError}</small>}
                        </div>

                        <div>
                            <label htmlFor="">Email:</label>
                            <input type="email" placeholder="Ingrese su email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                             {emailError && <small className="small-error">{emailError}</small>}
                        </div>

                        <div >
                            <label htmlFor="">Contraseña:</label>
                            
                            <div className="div-password">
                                <input type={passwordVisible} placeholder="contraseña" onChange={(e) => setContrasenia(e.target.value)} value={contrasenia} />
                                <img className="eye-password-registro" onClick={() => setPasswordVisible(passwordVisible === "password" ? "text" : "password")} src={passwordVisible === "password" ? EyeCloseIcon : EyeIcon} />
                            </div>

                            {contraseniaError && <small className="small-error-password">{contraseniaError}</small>}
                            
                        </div>

                        <div>
                            <label htmlFor="">Confirmar contraseña:</label>

                            <div className="div-password">
                            <input type={passwordVisible} placeholder="confirmar contraseña" onChange={(e) => setConfirmar(e.target.value)} value={confirmar} />
                            <img className="eye-password-registro" onClick={() => setPasswordVisible(passwordVisible === "password" ? "text" : "password")} src={passwordVisible === "password" ? EyeCloseIcon : EyeIcon} />
                            </div>

                            {confirmarError && <small className="small-error">{confirmarError}</small>}
                        </div>

                        <button className="btn-registro" type="submit">Registrarme</button>
                    </form>

                    <div className="link-registro">
                        <p>¿Ya tienes cuenta? <button onClick={() => setRouter(3)}>Inicia sesion</button></p>
                    </div>
                </div>
                </section>
            </div>
        </>);
}

export default Registro