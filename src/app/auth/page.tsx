import AuthButtons from "./AuthButtons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
	const { isAuthenticated } = getKindeServerSession();
	if (await isAuthenticated()) return redirect("/");

	return (
		<div className='flex h-screen w-full'>
			<div
				className='flex-1 flex overflow-hidden dark:bg-[#454e7d55] bg-[#39428b] relative 
      justify-center items-center'
			>

				<div className='flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold'>
					<p className="text-6xl mb-2 font-bold"><span className=" text-blue-300">Ship</span>DOCKS</p>

					<p className='text-xl md:text-2xl text-balance z-10'>
						<span className='text-blue-300 pr-2 font-bold '>Docking</span> your messages
					</p>

					<p className='text-xl md:text-2xl mb-32 text-balance z-10'>
						To <span className='text-blue-300 font-bold px-2'>Your Friends</span>
					</p>
					<AuthButtons />
				</div>
			</div>
		</div>
	);
};
export default page;
