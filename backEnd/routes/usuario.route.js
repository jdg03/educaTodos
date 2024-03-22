import Router from "express";
import {findUserById,getAllUsers,login, singUp, authSignUp, authLoginSession, bienvenido, bienvenidoAdmi, logout}  from "../controllers/usuario.controller.js"
import {verifySession, verifyRole} from "../middlewares/verify.js";

const router = Router();

//ruta para obtener todos los usuarios
router.get('/usuarios',getAllUsers)

//ruta para obtener un usuario
router.get('/usuario/id',findUserById)

//ruta que lleva a la pagina de registro
router.get('/login/page',login)

//ruta que lleva a pagina de inicio de registro
router.get('/singUp/page',singUp)

//ruta que que registra un usuario
router.post('/auth/singUp', authSignUp);

//ruta que verifica si se inicio sesion correctamente
router.post('/auth/login', authLoginSession);

//ruta que lleva a las paginas de bienvenida con los datos del usuario que inicio sesión dependiendo su rol
router.get('/bienvenido', verifySession, bienvenido);
router.get('/bienvenidoAdmi',verifyRole, bienvenidoAdmi);

//ruta que destruye la sesion, las rutas anteriores estaran bloquedas por los middleware(verifySession,)
router.get('/logout', logout);


export default router;