import React, { PropsWithChildren } from 'react';
import Link, { LinkProps } from "next/link"
import { useRouter } from 'next/router';
const CustomLink = ({ children, ...rest }: LinkProps & PropsWithChildren) => {
    const Router = useRouter();

    return (
        <Link locale={Router.locale} {...rest} >
            {children}
        </Link>
    );
};

export default CustomLink;