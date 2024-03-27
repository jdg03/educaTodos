import { Resend } from 'resend';

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

  export const sendEmail = async (primer_nombre,primer_apellido, usuario, clave, to) => {

    try {
      // Crea una instancia de Resend con tu API key
      const resend = new Resend('re_LTGcpYJL_7CYF7LCE9KmCDF59yb6bDKAj');
  
      // Mensaje con las credenciales
      const subject = 'Credenciales de inicio de sesión en educaTodos';
      const htmlContent = `<p>Hola,</p><p>Las credenciales de inicio de sesión del estudiante: ${primer_nombre} ${primer_apellido}  en educaTodos son:</p><p>Usuario: ${usuario}</p><p>Contraseña: ${clave}</p>`;
  
      // Envía el correo electrónico
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: to,
        subject: subject,
        html: htmlContent
      });
    } catch (error) {
      console.log("Error al enviar el correo electrónico:", error);
      throw error; // Lanza el error para manejarlo en el bloque catch donde llamas a esta función
    }
  }

