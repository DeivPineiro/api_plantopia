import admin from 'firebase-admin';

async function getPlagues() {
  const snapshot = await admin.database().ref('plague').once('value');
  const allPlagues = snapshot.val();

  if (!allPlagues) {
    return [];
  }

  const filteredPlagues = Object.entries(allPlagues || {}).map(([key, plague]) => ({
    id: key,
    ...plague    
  })).filter(plague => !plague || plague.deleted !== true);

  return filteredPlagues;
}


async function getPlagueById(id) {//Busca por id
    try {
        const snapshot = await admin.database().ref('plague').child(id).once('value');
        return snapshot.val();
    } catch (error) {
        console.error('Error al obtener la planga por ID:', error);
        throw error; 
    }
}

async function createPlague(plague) {// Crea una nueva plague
    await admin.database().ref('plague').push(plague);
    return ("se cargo correctamente: ", plague);
}

async function updatePlagueByID(id, plague) {// Actualizar plague
    const plagueRef = admin.database().ref(`plague/${id}`);
  
  try {
    await plagueRef.update(plague);
    return { success: true, message: 'Plaga actualizada exitosamente' };
  } catch (error) {
    console.error('Error al actualizar la plaga:', error);
    return { success: false, message: 'Error al actualizar la plaga' };
  }
}

async function deletePlagueById(id){// Borra logiamente una plaga con campo deleted = true
    const plagueRef = admin.database().ref(`plague/${id}`);
  
  try { 
    await plagueRef.update({ deleted: true });
    return { success: true, message: 'Plaga marcada como eliminada' };
  } catch (error) {
    console.error('Error al realizar el delete lógico de la plaga:', error);
    return { success: false, message: 'Error al realizar el delete lógico de la plaga' };
  }
}

export {
    getPlagueById,
    getPlagues,
    createPlague,
    updatePlagueByID,
    deletePlagueById
}
export default {
    getPlagueById,
    getPlagues,
    createPlague,
    updatePlagueByID,
    deletePlagueById
}

//Ok