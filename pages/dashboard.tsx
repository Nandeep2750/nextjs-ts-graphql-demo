import type { NextPage } from 'next'
import { useSession, signOut } from "next-auth/react"
import Router from "next/router";
import { useEffect } from 'react';
import Loader from '../components/common/Loader';

const Home: NextPage = () => {

    const { data: session ,status: sessionStatus } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            Router.push("/");
        },
    })

    useEffect(() => {
        console.log("🚀 ~ file: dashboard.tsx ~ line 19 ~ session", session)
    }, [session]);

    return (
        <div className="">
            {sessionStatus === "loading" && <Loader />}
            Dashboard
            <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
        </div>
    )
}

export default Home