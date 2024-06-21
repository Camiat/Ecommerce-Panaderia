const { mongoose, Schema } = require('mongoose');

const favoritosEsquema = new mongoose.Schema({
    idProducto: { ref: 'Productos', type: Schema.Types.ObjectId },
    idUsuario: { ref: 'Usuarios', type: Schema.Types.ObjectId },
    //id producto y idusuario estan configurados para referenciar a otros documentos en la base de datos 
});

const FavoritosModelo = mongoose.model('Favoritos', favoritosEsquema);

module.exports = FavoritosModelo;