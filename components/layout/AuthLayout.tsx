import * as React from 'react';

type DashboardLayoutProps = {
    children: React.ReactNode,
};

export default function AuthLayout({ children }: DashboardLayoutProps) {
    return (
        <div>
            {children}
        </div>
    );
}