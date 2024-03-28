import nodemailer from 'nodemailer';

export const generateRandom = (length) => {
  // Longitud de la contraseña aleatoria
 
  // Caracteres válidos para la contraseña
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

export const sendCorreo = async (nombre, apellido, nombreUsuario, clave, correoDestinatario) => {
  // Configuración del transporter
  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
          user: 'educatodos.edu@gmail.com', 
          pass: 'fqnw jiee jgkm ngbc'
      }
  });

  // Detalles del correo
  let mailOptions = {
      from: 'tudireccion@dominio.com',
      to: correoDestinatario, // Dirección de correo del destinatario
      subject: 'Credenciales de acceso', // Asunto del correo
      text: `Hola,${nombre} ${apellido},\n\n` +
            `Se ha creado una cuenta para ti en nuestra plataforma.\n\n` +
            `Usuario: ${nombreUsuario}\n` +
            `Contraseña: ${clave}\n\n` +
            `Por favor, inicia sesión utilizando estas credenciales.\n\n`
            
  };

  try {
      // Envío del correo
      let info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado:');
  } catch (error) {
      console.error('Error al enviar el correo:', error);
  }
}