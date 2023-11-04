import yup from 'yup';

export const votesCreateSchema = yup.object({
    idJudge: yup.string().required(),
    Jugabilidad: yup.number().integer().min(1).max(10).required(),
    Arte: yup.number().integer().min(1).max(10).required(),
    Sonido: yup.number().integer().min(1).max(10).required(),
    Afinidad_tematica: yup.number().integer().min(1).max(10).required()    
});
