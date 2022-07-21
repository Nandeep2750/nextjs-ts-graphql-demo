import * as React from 'react';
import { useSession } from 'next-auth/react';

import Navbar from '../common/Navbar';

type DashboardLayoutProps = {
    children: React.ReactNode,
};

export default function AuthLayout({ children }: DashboardLayoutProps) {

    const { data: sessionData, status: sessionStatus } = useSession()

    return (
        <>
            {sessionData ? 
                <>
                    <Navbar />
                    {children}
                </>
                : 
                children
            }
        </>
    );
}