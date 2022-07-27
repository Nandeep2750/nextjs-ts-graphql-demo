import * as React from 'react';
import Navbar from '../common/Navbar';

type DashboardLayoutProps = {
    children: React.ReactNode,
};

export default function AuthLayout({ children }: DashboardLayoutProps) {

    return (
        <>
            <Navbar />
            <div className='container-fluid'>
                {children}
            </div>
        </>
    );
}