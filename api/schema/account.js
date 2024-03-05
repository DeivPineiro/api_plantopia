import yup from 'yup';

const accountSchema = yup.object({
  email: yup.string().email().min(3).required(),
  password: yup.string().min(3).required()
})

export {
  accountSchema
}