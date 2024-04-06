import express from 'express';
import path from 'path'; // Importa el módulo path
import { fileURLToPath } from 'url'; //importar fileURLToPath
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const PORT = 3000;

const app = express();

// __dirname contiene la ruta del directorio 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//Utiliza el método join del módulo path para combinar dos rutas en una sola 
export const ruta = path.join(__dirname, '../frontEnd/views');
export const rutaAdmi = path.join(__dirname, '../frontEnd/views/admi');

// Define el motor de plantillas y establece la ruta de las plantillas
app.set('view engine', 'ejs');
app.set('views', ruta);

//Define los archivos estaticos
app.use(express.static(ruta + '\\..'));

// Configurar body-parser para analizar datos de formularios HTML y JSON
app.use(bodyParser.urlencoded({ extended: true }));

//analiza el cuerpo de las solicitudes entrantes como JSON. 
app.use(express.json());

//analiza las cookies adjuntas en las solicitudes entrantes
app.use(cookieParser());
//Para eliminar la cache 
app.use(function (req, res, next) {
  if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

//ruta inicial
app.get('/educaTodos', (req, res) => {
  res.render('index', { PORT });
});

// Configura express-session
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false
}));

// ____________________________Rutas______________________________
import routerVistas from "./routes/vistas.route.js";
import routerVistasAdmi from "./routes/vistasAdmi.route.js"
import routerGeneros from "./routes/generos.route.js"
import routerRol from "./routes/roles.route.js";
import routerUsuarios from "./routes/usuarios.route.js"
import routeCrearExpediente from "./routes/expediente.route.js"
import routeExpediente from "./routes/expedienteEstudiantil.route.js";
import routerInstitucion from "./routes/institucion.route.js";
import routerMatricula from "./routes/matricula.route.js";
import routerDireccion from "./routes/direcciones.route.js"


app.use(routerVistas);
app.use(routerVistasAdmi);
app.use(routerGeneros);
app.use(routerRol);
app.use(routerUsuarios);
app.use(routeCrearExpediente);
app.use(routeExpediente);
app.use(routerInstitucion)
app.use(routerMatricula);
app.use(routerDireccion);

