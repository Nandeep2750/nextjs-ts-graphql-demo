import Image from 'next/image';
import * as React from 'react';
import { Spin } from '../../config/image';


const LoaderComponent: React.FunctionComponent = () => {
    return <Image src={Spin} alt="Loading" />;
};

export default LoaderComponent;