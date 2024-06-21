const mongoose = require('mongoose');
const productosJson = require('../utils/productos.json');
const ProductosModelo = require('../models/productos')

async function connectDB () {
    await mongoose.connect('mongodb+srv://tolabacami25:TkHuiXTD2DqjxKzd@cluster0.gpussdl.mongodb.net/panaderia?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log('Connected succesfully.')).catch(err => console.log(err));

    const productos = await ProductosModelo.find();
    
    if (!productos.length){
        await ProductosModelo.insertMany(productosJson);
    }
   
}

module.exports = connectDB