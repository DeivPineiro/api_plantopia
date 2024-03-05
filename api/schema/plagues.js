import yup from 'yup';

export const createPlagueSchema = yup.object({   
    imagen: yup.string().required(),
    nombre: yup.string().required(),
    nombre_cientifico: yup.string().required(),
    solucion: yup.string().required(),
});