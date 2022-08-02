import React from 'react';
import Head from 'next/head';
import { GetPostQuery, useCreateCommentMutation } from '../../graphql/generated'
import TextareaField from '../form/TextareaField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';

const PostDetail: React.FunctionComponent<GetPostQuery["getPost"]> = (props) => {
    const { t } = useTranslation(["post", "form_field"])

    const CreateCommentValidationSchema = Yup.object().shape({
        body: Yup.string().required(t("form_field:field_error.required", { field_name: t("form_field:field_name.post.comment_body") }))
    });

    const [createCommentMutation, { data: createCommentMutationData, loading: createCommentMutationLoading, error: createCommentMutationError }] = useCreateCommentMutation()


    const formik = useFormik({
        initialValues: {
            body: ''
        },
        validationSchema: CreateCommentValidationSchema,
        onSubmit: (values, actions) => {
            actions.setSubmitting(true)
            createCommentMutation({
                variables: {
                    postId: props?.id ? props?.id : '',
                    ...values
                },
                onCompleted() {
                    actions.setSubmitting(false)
                    actions.resetForm()
                },
                onError(error) {
                    actions.setSubmitting(false)
                    actions.resetForm()
                    //   toast.error(error.message);
                }
            });
        }
    });

    return (
        <>
            <Head>
                <title>
                    post-detail-{props?.username}-{props?.body.slice(0, 20)}
                </title>
                <meta name="description" content={props?.body.slice(0, 10)} />
            </Head>

            <div className='col-12'>
                <div className='card'>
                    <div className="card-body">
                        <p className='h4'>
                            {props?.body}
                        </p>
                        <h6 className='text-end'> - {props?.username}</h6>
                        <hr />
                        <h3> {t("post:post_detail.comment_title")} </h3>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <TextareaField
                                    title={t("form_field:field_name.post.comment_body")}
                                    id='body'
                                    name='body'
                                    formik={formik}
                                />
                                <br />
                                <br />
                                <button className='btn btn-primary' onClick={formik.submitForm}>{t("post:post_detail.add_comment")}</button>
                            </li>
                            {
                                props?.comments.map(comment => {
                                    return <li key={comment?.id} className="list-group-item">{comment?.body}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostDetail