import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from "next-auth/react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Router, { useRouter } from "next/router";
import { useEffect } from 'react';
import Loader from '../../components/common/Loader';
import PostDetail from '../../components/post/PostDetail';
import { useGetPostQuery,GetPostDocument,GetPostQueryVariables,GetPostQuery} from '../../graphql/generated';
import  {initializeApollo} from '../../graphql/apollo'

const PostDetailPage: NextPage = () => {

    const { data: sessionData, status: sessionStatus } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            Router.push("/");
        }
    })

    const router = useRouter()
    const { postId } = router.query;

    const { data: getPostData, loading: getPostLoading, error: getPostError } = useGetPostQuery({
        variables: {
            postId: String(postId)
        }
    });

    if (sessionStatus === "loading") {
        return <Loader />
    }

    return (
        <div className='row my-3'>
            {getPostData && getPostData?.getPost &&
                <PostDetail
                    {...getPostData.getPost}
                />
            }
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log("🚀 ~ file: [postId].tsx ~ line 47 ~ constgetServerSideProps:GetServerSideProps= ~ context", context)
    let locale = context.locale
    let {postId} = context.query
    const apolloClient = initializeApollo(null,context);
    await apolloClient.query<GetPostQuery,GetPostQueryVariables>({
        query:GetPostDocument,
        variables:{postId : String(postId)}
    })
    return {
        props: {
            initialApolloState:apolloClient.cache.extract(),
            ...await serverSideTranslations(locale || "en"),
        },
    }
}

export default PostDetailPage;