import Link from 'next/link'
import Lottie from "react-lottie";
import animationData from "../assets/lotties/404-animation.json";

export default function FourOhFour() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData
  };

  return (
    <div className='vh-100 d-flex flex-column align-items-center justify-content-center'>
      <Lottie options={defaultOptions} height="auto" width="40%" />
      <h1 className='mt-3'>Page Not Found</h1>
      <Link href="/"> 
        <a className='btn btn-primary mt-3' role="button">
          Go back home
        </a>
      </Link>
    </div>
  );
}
