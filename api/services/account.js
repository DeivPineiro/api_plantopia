import admin from 'firebase-admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//*###########################//*Register*//*###########################*//

async function createAccount(account) {
    const { email, password } = account;    
    const existingAccountSnapshot = await admin.database().ref('account').orderByChild('email').equalTo(email).once('value');  
    if (existingAccountSnapshot.exists()) {
      throw new Error('Ya existe una cuenta con este correo electrónico');
    }
    const newAccount = {
      email,
      password: await bcrypt.hash(password, await bcrypt.genSalt(10))
    };  
    await admin.database().ref('account').push(newAccount);
  }

//*###########################//*Session*//*###########################*//

async function verifyAccount(account) {
    const snapshot = await admin.database().ref('account').once('value');
    const accounts = snapshot.val();
    if (!accounts) {
        throw { msg: "No hay cuentas registradas" };
    }
    const matchAccountKey = Object.keys(accounts).find(key => accounts[key].email === account.email);
    if (!matchAccountKey) {
        throw { msg: "Email no registrado" };
    }
    const matchAccount = accounts[matchAccountKey];
    if (!await bcrypt.compare(account.password, matchAccount.password)) {
        throw { msg: "Error en la contraseña" };
    }
    return { ...account, password: undefined };
}

async function createToken(payload) {
    const token = jwt.sign(payload, "Secret password")
    await admin.database().ref('token').push({ token, email: payload.email });
    return token
}

async function verifyToken(token) {
    try {
        const payload = jwt.verify(token, "Secret password");
        const snapshot = await admin.database().ref('token').orderByChild('token').equalTo(token).once('value');
        const tokenData = snapshot.val();
        if (!tokenData) {
            throw { msg: "Token inexistente" };
        }
        return payload;
    } catch (error) {
        throw { msg: "Error al verificar el token", error };
    }
}

async function createSession(account) {
    return {
        account: await verifyAccount(account),
        token: await createToken({ ...account, password: undefined })
    }
}

async function deleteSession(token) {
    try {      
      const ref = admin.database().ref('token');        
      const snapshot = await ref.orderByChild('token').equalTo(token).once('value');  
      if (snapshot.exists()) {        
        const key = Object.keys(snapshot.val())[0];
        await ref.child(key).remove();
        console.log('Sesión eliminada exitosamente');
      } else {
        console.log('No se encontró la sesión con el token proporcionado');
      }
    } catch (error) {
      console.error('Error al eliminar la sesión:', error.message);
    }
  }

export default {
    createAccount,
    createSession,
    verifyToken,
    deleteSession
}