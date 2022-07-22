import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { useCreatePostMutation, GetPostsDocument } from '../graphql/generated/index';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useSession } from 'next-auth/react';
import Router from "next/router";

import InputField from '../components/form/InputField';
import Loader from '../components/common/Loader';

const CreatePost = () => {

  const { data: sessionData, status: sessionStatus } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      Router.push("/");
    },
  })

  const [createPostMutation, { data: createPostMutationData, loading: createPostMutationLoading, error: createPostMutationError }] = useCreatePostMutation()

  const CreatePostValidationSchema = Yup.object().shape({
    body: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      body: ''
    },
    validationSchema: CreatePostValidationSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true)
      createPostMutation({
        variables: {
          ...values
        },
        onCompleted() {
          actions.setSubmitting(false)
          actions.resetForm()
        },
        onError(error) {
          actions.setSubmitting(false)
          actions.resetForm()
          toast.error(error.message);
        },
        update(proxy, result) {
          const data: any = proxy.readQuery({ query: GetPostsDocument })
          if (data) {
            proxy.writeQuery({
              query: GetPostsDocument,
              data: { getPosts: [result.data?.createPost, ...data?.getPosts] },
            });
          }
        }
      });
    }
  });

  if (sessionStatus === "loading") {
    return <Loader />
  }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg" style={{ width: '24rem' }}>
        <div className="card-body">
          <h5 className="card-title text-center">Create Post</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <InputField
                title='Post Body'
                type='text'
                id='body'
                name='body'
                formik={formik}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
              Create Post
              {formik.isSubmitting && <div className="spinner-border text-light spinner-border-sm ms-2" role="status"></div>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost   