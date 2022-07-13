import type { NextPage } from 'next'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const Register: NextPage = () => {

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
      <div className="card shadow-lg" style={{ width: '24rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Sign Up</h5>
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
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""}`}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <span className="text-danger">{formik.errors.confirmPassword}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              Sign Up
              {formik.isSubmitting && <div className="spinner-border text-light spinner-border-sm ms-2" role="status"></div>}
            </button>
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