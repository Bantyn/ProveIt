import Spline from '@splinetool/react-spline';

export default function Maintaince() {
  return (
    <>
        <div className="relative h-screen w-full overflow-hidden">
            <Spline scene="https://prod.spline.design/1KFTlhzaTgEZ0aN1/scene.splinecode" className='absolute h-full w-full' />
            <div className="fixed h-11 w-36 rounded-xl bg-gradient-to-r from-violet-200  via-pink-300 to-orange-300 bottom-4 right-4 flex items-center justify-center overflow-hidden font-bold text-white text-1xl uppercase"> ProveIt.io</div>
        </div>

    </>
  );
}
