import admin from 'firebase-admin';

async function getPlants() {
    const snapshot = await admin.database().ref('plant').once('value');
    const allPlants = snapshot.val();

    if (!allPlants) {
        return [];
    }

    const plantsWithPlagues = Object.entries(allPlants || {})
        .filter(([key, plant]) => plant.deleted !== true )  
        .map(async ([key, plant]) => {
            if (plant.plagueIds) {
                plant.plagues = await getPlaguesByIds(plant.plagueIds);
            }
            return {
                id: key,
                ...plant,
            };
        });

    return Promise.all(plantsWithPlagues);
}


async function getAdminPlants() {
    const snapshot = await admin.database().ref('plant').once('value');
    const allPlants = snapshot.val();

    if (!allPlants) {
        return [];
    }

    const plantsWithPlagues = Object.entries(allPlants || {}).map(async ([key, plant]) => {
        if (plant.plagueIds) {
            plant.plagues = await getPlaguesByIds(plant.plagueIds);
        }
        return {
            id: key,
            ...plant,
        };
    });

    return Promise.all(plantsWithPlagues);
}

async function getPlaguesByIds(plagueIds) {
    const plagasPromises = plagueIds.map(async plagueId => {
        const snapshot = await admin.database().ref('plague').child(plagueId).once('value');
        return {
            id: key,
            ...snapshot.val()
        };
    });

    return Promise.all(plagasPromises);
}

async function getPlantById(id) {
    try {
        const snapshot = await admin.database().ref('plant').child(id).once('value');
        const data = snapshot.val();
        return {
            id: snapshot.key,
            ...data
        };
    } catch (error) {
        console.error('Error al obtener la planta por ID:', error);
        throw error;
    }
}

async function createPlant(plant) {
    const { plagueIds, ...plantData } = plant;
    const plantRef = await admin.database().ref('plant').push(plantData);

    if (plagueIds && plagueIds.length > 0) {
        await plantRef.update({ plagueIds });
    }

    return ("se cargó correctamente: ", plantData);
}

async function updatePlantByID(id, plant) {
    const { plagueIds, ...plantData } = plant;
    const plantRef = admin.database().ref(`plant/${id}`);

    try {
        await plantRef.update(plantData);

        if (plagueIds && plagueIds.length > 0) {
            await plantRef.update({ plagueIds });
        }

        return { success: true, message: 'Planta actualizada exitosamente' };
    } catch (error) {
        console.error('Error al actualizar la planta:', error);
        return { success: false, message: 'Error al actualizar la planta' };
    }
}

async function deletePlantById(id) {
    const plantRef = admin.database().ref(`plant/${id}`);
    try {
        await plantRef.update({ deleted: true });
        return { success: true, message: 'Planta marcada como eliminada' };
    } catch (error) {
        console.error('Error al realizar el delete lógico de la planta:', error);
        return { success: false, message: 'Error al realizar el delete lógico de la planta' };
    }
}

export default {
    getPlantById,
    getPlants,
    getAdminPlants,
    createPlant,
    updatePlantByID,
    deletePlantById
}

//Ok