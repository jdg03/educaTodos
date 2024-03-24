import Router from "express";
import {findUserById,getAllUsers,login, singUp, authSignUp, authLoginJwt, bienvenido, logoutJwt, expediente}  from "../controllers/usuario.controller.js"
import {verifyToken} from "../middlewares/verify.js";

const router = Router();

//ruta para obtener todos los usuarios
router.get('/usuarios',getAllUsers)
//ruta para obtener un usuario
router.get('/usuario/id',findUserById)

//ruta que lleva a la pagina de login
router.get('/login/page',login)
//ruta que lleva a pagina de registro
router.get('/singUp/page',singUp)

//ruta que que registra un usuario
router.post('/auth/singUp', authSignUp);
//ruta que verifica si se inicio sesion correctamente
router.post('/auth/login', authLoginJwt);

//ruta que lleva a las paginas de bienvenida con los datos del usuario que inicio sesión dependiendo su rol
router.get('/bienvenido',bienvenido);
router.get('/expediente', expediente)


//ruta que destruye el token y cierra la sesion
router.get('/logout', logoutJwt);


export default router;