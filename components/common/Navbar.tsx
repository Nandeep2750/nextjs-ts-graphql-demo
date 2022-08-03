import { useSession, signOut } from 'next-auth/react';
import * as React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Navbar: React.FunctionComponent = () => {

    const { t } = useTranslation()

    const router = useRouter();

    const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(router.asPath, router.asPath, { locale: event.target.value })
    }

    const { data: sessionData } = useSession()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <a className="navbar-brand" href="#">{t("common:app_title")}</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {sessionData &&
                        <li className="nav-item mx-2 my-2">
                            <button type="button" className="btn btn-outline-light" onClick={() => signOut({ callbackUrl: `/${router.locale}` })}>{t("common:sign_out")}</button>
                        </li>
                    }
                    <li className="nav-item dropdown mx-2 my-2">
                        <select className="form-select bg-dark text-white" aria-label="Default select example" value={router.locale} onChange={onLanguageChange}>
                            {router?.locales && router?.locales.map((locale, index) => (
                                <option key={index}>{locale}</option>
                            ))}
                        </select>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;