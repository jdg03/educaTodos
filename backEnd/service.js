import express from 'express';
import path from 'path'; // Importa el módulo path
import { fileURLToPath } from 'url'; //importar fileURLToPath
import bodyParser from 'body-parser';
import session from 'express-session';

const PORT = 3000;

const app = express();

// __dirname contiene la ruta del directorio 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//Utiliza el método join del módulo path para combinar dos rutas en una sola 
export const ruta = path.join(__dirname, '../frontEnd/views');

// Define el motor de plantillas y establece la ruta de las plantillas
app.set('view engine', 'ejs');
app.set('views', ruta);

//Define los archivos estaticos
app.use(express.static(ruta+'\\..'));

// Configurar body-parser para analizar datos de formularios HTML y JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// _____________Rutas________________
import routerLogin from "./routes/usuario.route.js";
import routerGeneros from "./routes/generos.route.js"
import routerRol from './routes/roles.route.js';
import routerPersona from './routes/personas.route.js'

app.use(routerLogin);
app.use(routerGeneros);
app.use(routerRol);
app.use(routerPersona);

