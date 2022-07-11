import type { NextPage } from 'next'
import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Home: NextPage = () => {

  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values, actions) => {
      console.log("🚀 ~ file: index.tsx ~ line 20 ~ values", values)
      actions.setSubmitting(true)
      setTimeout(() => {
        actions.setSubmitting(false)
        actions.resetForm()
      }, 1000);
    }
  });

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="card" style={{ width: '24rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.email && formik.touched.email && (
                <span className="text-danger">{formik.errors.email}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home