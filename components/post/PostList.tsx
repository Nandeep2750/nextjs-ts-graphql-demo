import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react'

import { useGetPostsQuery } from '../../graphql/generated';
import Like from './like/Like';

const PostList: React.FunctionComponent = () => {
    const { t } = useTranslation(["auth", "form_field"])
    const { data: sessionData } = useSession()

    const { data: useGetPostsData, loading: useGetPostsLoading, error: useGetPostsError } = useGetPostsQuery();

    return (
        <div className="card shadow-lg">
            <div className="card-body">
                <h3 className="card-title">{t("post:list_post.title")}</h3>
                {useGetPostsData?.getPosts?.length && useGetPostsData?.getPosts?.length > 0 &&
                    <ul className="list-group">
                        {useGetPostsData?.getPosts.map((data) => (
                            data &&
                            <li className="list-group-item" key={data?.id}>
                                <p>
                                    <span className='white-space-pre-wrap'>{data?.body}</span> <br />
                                    <span className='small'> - {data?.username}</span>
                                </p>
                                <Like postId={data?.id} isLiked={!!(data?.likes?.some((like) => like?.username === sessionData?.user?.username))} key={data?.id} likeCount={data.likeCount} />
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    );
};

export default PostList;