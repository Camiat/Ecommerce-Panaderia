const mongoose = require('mongoose');

const productosEsquema = new mongoose.Schema({
    
    nombre: String,
    descripcion: String,
    precio: Number,
    imagen: String, 
}); 
//                                      Coleccion
const ProductosModelo = mongoose.model('Productos', productosEsquema)

module.exports = ProductosModelo;

