//Requerir paquetes
const express = require('express');
const app = express();
const connectDB = require('./config/mongoconection');
const ProductosModelo = require('./models/productos');
const cors = require('cors');
const bcrypt = require('bcrypt');
const UsuariosModelo = require('./models/usuarios');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const FavoritosModelo = require('./models/favoritos');

// CONFIGURACION DE MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(session({
    secret: 'secret',
    name: 'cookie_login_express_session',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Cambia a true si uso HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://tolabacami25:TkHuiXTD2DqjxKzd@cluster0.gpussdl.mongodb.net/panaderia?retryWrites=true&w=majority&appName=Cluster0',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    })
}));



// 2er paso: llamada a funcion para guardar esos productos en la base de datos
connectDB();

// RUTAS PARA traer productos de la BASE DE DATOS
app.get('/api/productos', async (req, res) => {
    // 200 -> OK, 201 -> Creado, 404 -> No encontrado, 400 -> Peticion mal hecha, 500 -> Error interno general
    const productosDB = await ProductosModelo.find({});

    res.status(200).json(productosDB);
});



//Rutas de registro
app.post('/api/registro', async (req, res) => {
    const { nombreDeUsuario, email, contrasenia } = req.body;

    const nivelEncriptacion = await bcrypt.genSalt(10); // 10
    const passwordEncriptada = await bcrypt.hash(contrasenia, nivelEncriptacion);

    const usuario = new UsuariosModelo({ nombreDeUsuario, email, contrasenia: passwordEncriptada });
    await usuario.save();

    res.status(201).send('Usuario registrado con exito');
});

//Ruta de Login
app.post('/api/login', async (req, res) => {
    try {
        const { nombreDeUsuario, contrasenia } = req.body;

        const user = await UsuariosModelo.findOne({ nombreDeUsuario });

        const hayMatch = await bcrypt.compare(contrasenia, user.contrasenia)

        if (hayMatch) {
            req.session.user = user;
            res.status(200).json(user)
        } else {
            res.status(401).send('credenciales invalidas')
        }
    } catch (err) {
        console.log(err);
    }
});

//Rutas para Agregar Favoritos a la lista de un Usuario
app.post('/api/agregarFavoritos', async (req, res) => {
    try{
    const { idProducto, idUsuario } = req.body

    const favorito = await new FavoritosModelo({ idProducto, idUsuario })
    //guarda el favorito en la base de datos
    await favorito.save()
    //Busca todos los favoritos de un usuario 
    const favoritos = await FavoritosModelo.find({idUsuario})
    //envio lista de fav actualizada al cliente
    res.status(201).json(favoritos);
    }catch(error){
        console.log(error)
    }
})

app.post ('/api/favoritos', async (req,res) => {
    //extraigo el idUsuario del cuerpo de la solicitud req.body.
    // Este idUsuario se utiliza para buscar los favoritos asociados a ese usuario.
    const {idUsuario} = req.body;
    // Aqui busco todos los favoritos asociados al idUsuario proporcionado
    const favs = await FavoritosModelo.find({idUsuario})
    const productoFavorito = []

    for (const fav of favs){
     // Buscar el producto asociado a este favorito por su idProducto
     const producto = await ProductosModelo.find({_id:fav.idProducto})
     //agrego producto al array 
     productoFavorito.push(producto)

   }
   res.status(201).json(productoFavorito);


})


//Ruta para eliminar un favorito
app.delete('/api/deleteFavorito', async (req, res) => {
   
      const { idUsuario, idProducto} = req.query;
      
      const favs = await FavoritosModelo.deleteOne({idUsuario, idProducto})
     
      res.status(200).json('Favorito eliminado con exito');
    })
  
















//Puerto
app.listen(3078, () => {
    console.log('Servidor corriendo en el puerto 3078')
})