import type { NextPage } from 'next'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from "react-toastify";
import Router from "next/router";

import { useLoginMutation } from '../graphql/generated';
import { CONSTANTS } from '../config/constants';

const { LOGIN_DATA } = CONSTANTS

const Home: NextPage = () => {
  
  const [loginMutation, { data, loading, error }] = useLoginMutation();

  const LoginValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  });

  // const onFill = (formikProps) => {
  //     useFormik.setFieldValue('username', LOGIN_DATA.email, false)
  //     formikProps.setFieldValue('password', LOGIN_DATA.password, false)
  // }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true)
      loginMutation({
        variables:{
          ...values
        },
        onCompleted(data){
          Router.push("/dashboard");
          actions.setSubmitting(false)
          actions.resetForm()
        },
        onError(error){
          actions.setSubmitting(false)
          actions.resetForm()
          toast.error(error.message);
        }
      })
    }
  });

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg" style={{ width: '24rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
              <label htmlFor="username" className="form-label">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control ${formik.touched.username && formik.errors.username ? "is-invalid" : ""}`}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.username && formik.touched.username && (
                <span className="text-danger">{formik.errors.username}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.password && formik.touched.password && (
                <span className="text-danger">{formik.errors.password}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              Login
              {formik.isSubmitting && <div className="spinner-border text-light spinner-border-sm ms-2" role="status"></div>}
            </button>
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