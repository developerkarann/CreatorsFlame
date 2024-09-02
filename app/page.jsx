import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center text-white flex-col items-center h-[44vh] text-xs md:text-base  gap-7 px-5 md:px-0 ">
        <div className=" flex gap-1 py-7 font-bold text-3xl justify-center items-center">Creator's Flame
          <span><img className="invertImg" src="./assest/flame.gif" width={40} alt="" /></span>
        </div>
        <p className="text-center text-base md:text-left mb-5">
          A crowd funding platform for creators & developers to fund their projects.
        </p>
        {/* <p className="text-center text-[10px] md:text-sm md:text-left">
          A place where your fans can buy you flame. Unlesh the power of your fans and get your projects funded.
        </p> */}
        <div className="">
          <Link href={'/login'}>
            <button type="button" class="text-white bg-gradient-to-r
           from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
           focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 
           shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium 
           rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Start Now
            </button>
          </Link>

          <Link href={'/about'}>
            <button type="button" class="text-white bg-gradient-to-r
           from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
           focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 
           shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium 
           rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Read More
            </button>
          </Link>
        </div>
      </div>
      {/* <div className="bg-white h-1 opacity-5"></div> */}

      <div className=" text-white container  mx-auto my-7 px-8">
        {/* <h2 className=" text-2xl font-bold text-center mb-14" > Your Fans can give you a flame</h2> */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-5 justify-around">
          <div className="item space-y-1  flex flex-col items-center justify-center ">
            <img src="./assest/man.gif" className=" w-[250px] md:w-[130px]"  alt="" />
            <p className=" font-bold  text-2xl md:text-lg text-center">Empower Your Journey</p>
            <p className="text-center text-sm md:text-xs text-slate-300">Get the support you need from your fans.</p>
          </div>
          <div className="item space-y-1 flex flex-col items-center justify-center ">
            <img src="./assest/coin.gif" className=" w-[250px] md:w-[130px]" alt="" />
            <p className=" font-bold text-2xl md:text-lg  text-center">Monetize Your Passion</p>
            <p className="text-center text-sm md:text-xs text-slate-300 ">Turn creativity into income.</p>
          </div>
          <div className="item space-y-1 flex flex-col items-center justify-center ">
            <img src="./assest/group.gif" className=" w-[250px] md:w-[130px] md:pb-6" alt="" />
            <p className="  font-bold text-2xl md:text-lg text-center">Connect and Collaborate</p>
            <p className="text-center text-sm md:text-xs text-slate-300">Build strong fan relationships.</p>
          </div>
        </div>
      </div>

      <div className="text-white container mx-auto pb-20 pt-14 flex flex-col items-center justify-center">
        <h2 className=" text-2xl font-bold text-center mb-20 my-10" > Learn more about us!</h2>
        <div className=" w-[90%] h-[18vh] md:h-[50vh] xl:h-[65vh] ">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/yOHzrJsWs74?si=t8G38du1DH_GxA_e"
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>

  
    </>
  );
}
