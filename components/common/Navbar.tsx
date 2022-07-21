import { signOut } from 'next-auth/react';
import * as React from 'react';

const Navbar: React.FunctionComponent = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <a className="navbar-brand" href="#">Nextjs ts graphql demo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <button type="button" className="btn btn-outline-light" onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;