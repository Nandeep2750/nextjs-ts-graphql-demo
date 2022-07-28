import type { NextPage, GetStaticProps } from 'next'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { toast } from 'react-toastify';

import InputField from '../components/form/InputField';
import { useRegisterMutation } from '../graphql/generated';
import { CONSTANTS } from '../config/constants';
import CustomLink from '../components/common/CustomLink';

const { LOGIN_DATA, DEVELOPMENT_ENV } = CONSTANTS

const Register: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(["auth", "form_field"])
  const [registerMutation, { data: registerMutationData, loading: registerMutationLoading, error: registerMutationError }] = useRegisterMutation();

  const RegistrationValidationSchema = Yup.object().shape({
    username: Yup
      .string()
      .required(t("form_field:field_error.required", { field_name: t("form_field:field_name.user.username") })),
    email: Yup
      .string()
      .required(t("form_field:field_error.required", { field_name: t("form_field:field_name.user.email") }))
      .email(t("form_field:field_error.email", { field_name: t("form_field:field_name.user.email") })),
    password: Yup
      .string()
      .required(t("form_field:field_error.required", { field_name: t("form_field:field_name.user.password") })),
    confirmPassword: Yup
      .string()
      .required(t("form_field:field_error.required", { field_name: t("form_field:field_name.user.confirm_password") }))
      .oneOf([Yup.ref('password'), null], t("form_field:field_error.confirm_password"))
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
          registerInput: {
            ...values
          }
        },
        onCompleted() {
          actions.setSubmitting(false)
          actions.resetForm()
          toast.success("Congratulations, your account has been successfully created.");
          router.push('/', '/', { locale: router.locale })
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
          <h5 className="card-title text-center">{t("auth:signup_title")}</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <InputField
                title={t("form_field:field_name.user.username")}
                type='text'
                id='username'
                name='username'
                formik={formik}
              />
            </div>
            <div className="mb-3">
              <InputField
                title={t("form_field:field_name.user.email")}
                type='email'
                id='email'
                name='email'
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
            <div className="mb-3">
              <InputField
                title={t("form_field:field_name.user.confirm_password")}
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
              <span>{t("auth:already_have_account")}</span>{" "}
              <CustomLink href={"/"}>{t("auth:login_title")}</CustomLink>
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

export default Register