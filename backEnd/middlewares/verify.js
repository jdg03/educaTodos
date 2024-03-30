import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// verifica si el token es valido
export const verifyToken = async (req, res, next) => {
    if (req.cookies.jwt) {
      try {
        
        // Decodifica el token JWT para obtener la información del usuario
        const tokenDecodificado = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);

        // Almacena la información del usuario decodificada en req.user para que esté disponible en las rutas posteriores
        req.user = tokenDecodificado;

        console.log("Usuario autenticado:", req.user);
        // Continúa con el siguiente controlador
        return next();
      } catch (error) {
        console.log(error);
        return res.redirect('/educaTodos');
      }
    } else {
        // Si no se encuentra un token JWT en las cookies, redirige al usuario a la página principal
      return res.redirect('/educaTodos');
    }
  };

  //verifica si es admi
  export const verifyAdmin = async (req, res, next) => {
    try {

      console.log(req.user.rol);
      // Verifica si el usuario tiene un rol válido
      if (req.user.rol === 3) {
        // Si el usuario tiene rol de administrador, continúa con el siguiente controlador
        return next();
      } else {
        // Si el usuario no es un administrador, redirige a una página de acceso denegado o realiza otra acción adecuada
        return res.redirect("/bienvenido")
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send('Error interno del servidor');
    }
  };
  