import * as React from 'react';
import { useGetPostsQuery } from '../../graphql/generated';

const PostList: React.FunctionComponent = () => {

    const { data: useGetPostsData, loading: useGetPostsLoading, error: useGetPostsError } = useGetPostsQuery();

    return (
        <div className="card shadow-lg">
            <div className="card-body">
                <h3 className="card-title">Posts</h3>
                {useGetPostsData?.getPosts?.length && useGetPostsData?.getPosts?.length > 0 &&
                    <ul className="list-group">
                        {useGetPostsData?.getPosts.map((data) => (
                            <li className="list-group-item" key={data?.id}>
                                <p>
                                    <span className='white-space-pre-wrap'>{data?.body}</span> <br />
                                    <span className='small'> - {data?.username}</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    );
};

export default PostList;