import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import Router from "next/router";
import { useEffect } from 'react';
import Loader from '../components/common/Loader';

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
        <>
            <div className="card m-4">
                <div className="card-body">
                    <h3 className="card-title">Posts</h3>

                    <ul className="list-group">
                        <li className="list-group-item">
                            <h5>asdasd</h5>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur eius nisi mollitia aut voluptate. Obcaecati est aspernatur mollitia, voluptatum commodi, nam eaque deleniti ut veniam natus delectus itaque, earum aliquam?</p>
                        </li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                        <li className="list-group-item">A fourth item</li>
                        <li className="list-group-item">And a fifth one</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Dashboard