import yup from 'yup';

export const createPlantSchema = yup.object({
    estacion: yup.string().required(),
    imagen: yup.string().required(),
    kg_cosecha_km2: yup.number().required(),
    luz: yup.string().required(),
    nombre: yup.string().required(),
    nombre_cientifico: yup.string().required(),
    ph: yup.number().required(),
    plagas: yup.array().of(yup.string().required()),
    tipo: yup.string().required(),
    tipo_terreno: yup.string().required(),
});
