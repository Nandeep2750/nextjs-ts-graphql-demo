import type { NextPage } from 'next'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react"

import { useLoginMutation } from '../graphql/generated';
import { CONSTANTS } from '../config/constants';
import InputField from '../components/form/InputField';
import Router from 'next/router';
import { useEffect } from 'react';
import Loader from '../components/common/Loader';

const { LOGIN_DATA, DEVELOPMENT_ENV } = CONSTANTS

const Home: NextPage = () => {

  const { data: sessionData, status: sessionStatus } = useSession()

  useEffect(() => {
    if (sessionData && sessionData !== null && sessionData !== undefined) {
      Router.push("/dashboard");
    }
  }, [sessionData]);

  const [loginMutation, { data: loginMutationData, loading: loginMutationLoading, error: loginMutationError }] = useLoginMutation();

  const LoginValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true)
      loginMutation({
        variables: {
          ...values
        },
        onCompleted(data) {
          signIn("credentials", {
            // redirect: false, 
            callbackUrl: '/dashboard', 
            ...data.login
          })
          actions.setSubmitting(false)
          actions.resetForm()
          // Router.push("/dashboard");
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
    formik.setFieldValue('password', LOGIN_DATA.password, false)
  }

  if (sessionStatus === "loading") {
    return <Loader />
  }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg" style={{ width: '24rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <InputField
                title='User Name'
                type='text'
                id='username'
                name='username'
                // value={formik.values.username}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // disabled={formik.isSubmitting}
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
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              Login
              {formik.isSubmitting && <div className="spinner-border text-light spinner-border-sm ms-2" role="status"></div>}
            </button>
            {process.env.NODE_ENV === DEVELOPMENT_ENV &&
              <button type="button" className="btn btn-link" onClick={onFill}>Fill form</button>
            }
            <div className='mt-2'>
              <span>Don&apos;t have account?</span>{" "}
              <Link href={"/register"}>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home