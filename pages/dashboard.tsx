import type { GetStaticProps, NextPage } from 'next'
import { useSession } from "next-auth/react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Router from "next/router";
import Loader from '../components/common/Loader';
import CreatePost from '../components/post/CreatePost';
import PostList from '../components/post/PostList';

const Dashboard: NextPage = () => {

    const { data: sessionData, status: sessionStatus } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            Router.push("/");
        },
    })

    if (sessionStatus === "loading") {
        return <Loader />
    }

    return (
        <div className='row my-3'>
            <div className="col-md-4">
                <CreatePost />
            </div>
            <div className="col-md-8">
                <PostList />
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale || "en"),
    },
})

export default Dashboard;