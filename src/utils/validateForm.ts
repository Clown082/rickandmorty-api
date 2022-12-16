import * as yup from 'yup'

export const LoginValidate = yup.object().shape({
  username: yup.string().trim().required('Email field is required'),
  password: yup
    .string()
    .trim()
    .required('Password field is required')
    .min(4, 'Minimun 4 characters required')
    .max(20, 'Maximun 20 characters required'),
})
