import type { NextPage } from 'next'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Router from "next/router";

import InputField from '../components/form/InputField';
import { useRegisterMutation } from '../graphql/generated';
import { toast } from 'react-toastify';
import { CONSTANTS } from '../config/constants';

const { LOGIN_DATA, DEVELOPMENT_ENV } = CONSTANTS

const Register: NextPage = () => {

  const [registerMutation, { data: registerMutationData, loading: registerMutationLoading, error: registerMutationError }] = useRegisterMutation();

  const RegistrationValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    confirmPassword : Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match.')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegistrationValidationSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true)
      registerMutation({
        variables: {
          registerInput:{
            ...values
          }
        },
        onCompleted(data) {
          actions.setSubmitting(false)
          actions.resetForm()
          toast.success("Congratulations, your account has been successfully created.");
          Router.push("/");
        },
        onError(error) {
          actions.setSubmitting(false)
          actions.resetForm()
          toast.error(error.message);
        }
      })
    }
  });

  const onFill = () => {
    formik.setFieldValue('username', LOGIN_DATA.username, false)
    formik.setFieldValue('email', LOGIN_DATA.email, false)
    formik.setFieldValue('password', LOGIN_DATA.password, false)
    formik.setFieldValue('confirmPassword', LOGIN_DATA.password, false)
  }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg" style={{ width: '24rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Sign Up</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <InputField
                title='User Name'
                type='text'
                id='username'
                name='username'
                formik={formik}
              />
            </div>
            <div className="mb-3">
              <InputField
                title='Email'
                type='email'
                id='email'
                name='email'
                formik={formik}
              />
            </div>
            <div className="mb-3">
              <InputField
                title='Password'
                type='password'
                id='password'
                name='password'
                formik={formik}
              />
            </div>
            <div className="mb-3">
              <InputField
                title='Confirm Password'
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                formik={formik}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              Sign Up
              {formik.isSubmitting && <div className="spinner-border text-light spinner-border-sm ms-2" role="status"></div>}
            </button>
            {process.env.NODE_ENV === DEVELOPMENT_ENV &&
              <button type="button" className="btn btn-link" onClick={onFill}>Fill form</button>
            }
            <div className='mt-2'>
              <span>Already have an account?</span>{" "}
              <Link href={"/"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register