import React, { useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css'

function Contact(){
  const form = useRef();
  const [mensajeEnviado,setMensajeEnviado] = useState (false)

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_p24fpqr', 'template_n9kelz4', form.current, {
        publicKey: 'E9wq-qH0GbxY5DOVe',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
          setMensajeEnviado(true);
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };




  return <> 
  
<section className="contacto">
    <h2>Contacto</h2>
    <form className="contact-form" ref={form} onSubmit={sendEmail}>
    
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="user_name" required />


        <label htmlFor="email">Email:</label>
        <input type="email" name="user_email" id="email" required/>

        <label htmlFor="message">Mensaje:</label>
        <textarea name="user_message" id="message" rows="4" required></textarea>

        
        <input className='button' type="submit" value="Enviar" />
    </form>

    {mensajeEnviado && <p>Se ha enviado su mensaje con éxito</p>}
</section>

  </>
}

export default Contact