const mongoose = require('mongoose');

const usuariosEsquema = new mongoose.Schema({
    nombreDeUsuario: String,
    contrasenia:String,
    email: String,
    
});

const UsuariosModelo = mongoose.model('Usuarios', usuariosEsquema);

module.exports = UsuariosModelo;
