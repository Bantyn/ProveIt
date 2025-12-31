import Spline from '@splinetool/react-spline';

export default function Maintaince() {
  return (
    <>
        <div className="relative h-screen w-full overflow-hidden">
            <Spline scene="https://prod.spline.design/1KFTlhzaTgEZ0aN1/scene.splinecode" className='absolute h-full w-full' />
            <div className="absolute h-15 w-full bg-white bottom-0"></div>
        </div>

    </>
  );
}
