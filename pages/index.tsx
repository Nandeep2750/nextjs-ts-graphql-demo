import type { GetStaticProps, NextPage } from 'next'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react"
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useLoginMutation } from '../graphql/generated';
import { CONSTANTS } from '../config/constants';
import InputField from '../components/form/InputField';
import Router, { useRouter } from 'next/router';
import Loader from '../components/common/Loader';
import CustomLink from '../components/common/CustomLink';


const { LOGIN_DATA, DEVELOPMENT_ENV } = CONSTANTS

const Home: NextPage = () => {

  let router = useRouter();

  const { t } = useTranslation(["auth", "form_field"])

  const { data: sessionData, status: sessionStatus } = useSession()

  useEffect(() => {
    if (sessionData && sessionData !== null && sessionData !== undefined) {
      Router.push("/dashboard");
    }
  }, [sessionData]);

  const [loginMutation, { data: loginMutationData, loading: loginMutationLoading, error: loginMutationError }] = useLoginMutation();

  const LoginValidationSchema = Yup.object().shape({
    username: Yup
      .string()
      .required(t("form_field:field_error.required", { field_name: t("form_field:field_name.user.username") })),
    password: Yup
      .string()
      .required(t("form_field:field_error.required", { field_name: t("form_field:field_name.user.password") }))
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
            callbackUrl: (`/${router.locale}/dashboard`),
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
          <h5 className="card-title text-center">{t("auth:login_title")}</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <InputField
                title={t("form_field:field_name.user.username")}
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
                title={t("form_field:field_name.user.password")}
                type='password'
                id='password'
                name='password'
                formik={formik}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              {t("auth:login_button")}
              {formik.isSubmitting && <div className="spinner-border text-light spinner-border-sm ms-2" role="status"></div>}
            </button>
            {process.env.NODE_ENV === DEVELOPMENT_ENV &&
              <button type="button" className="btn btn-link" onClick={onFill}>{t("auth:fill_form")}</button>
            }
            <div className='mt-2'>
              <span>{t("auth:dont_have_account")}</span>{" "}
              <CustomLink href={"/register"}>{t("auth:signup_title")}</CustomLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale || "en"),
  },
})


export default Home