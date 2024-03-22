export const verifySession = (req, res, next) => {
    
   // Verificar si hay un usuario almacenado en la sesión
   if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Acceso denegado - Sesion no encontrada' });
    }

    // Continua con la siguiente función en la ruta
    console.log("paso por verifySession");
    next();
};


export const verifyRole = (req, res, next) => {
    
    if (req.session && req.session.user && req.session.user.rol === 'admi') {
        console.log("paso por el verifyRole")

        // Continua con la siguiente función en la ruta
        next();
    } else {
        return res.status(401).json({ error: 'No es administrador, acceso denegado' });
    }
};

