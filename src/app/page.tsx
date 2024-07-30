import ChatLayout from "@/components/chat/ChatLayout";
import PreferencesTab from "@/components/PreferencesTab";
import ToastComponent from "@/components/ToastComponent";
import { User } from "@/db/interfaceDB";
import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getUsers(): Promise<User[]> {

	const userKeys: string[] = [];
	let cursor = "0";

	do {
		const [nextCursor, keys] = await redis.scan(cursor, { match: "user:*", type: "hash", count: 100 });
		cursor = nextCursor;
		userKeys.push(...keys);
	} while (cursor !== "0");

	const { getUser } = getKindeServerSession();
	const currentUser = await getUser();
  const users: User[] = [];

  try{
    const pipeline = redis.pipeline();
    userKeys.forEach((key) => pipeline.hgetall(key));
    const results = (await pipeline.exec()) as User[];
    for (const user of results) {
      // exclude the current user from the list of users in the sidebar
      if (user.id !== currentUser?.id) {
        users.push(user);
      }
    }
  }
  catch(e){
    console.error("Error while logging in! Try creating an account",e);
    <ToastComponent title="Authentication Error" description="Try creating an account" />
    redirect('/auth');
  }

  return users;
}

export default async function Home() {
	const layout = cookies().get("react-resizable-panels:layout");
	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

	const { isAuthenticated } = getKindeServerSession();
	if (!(await isAuthenticated())) {   
    console.log("go to auth");
    return redirect("/auth");
  }

	const users = await getUsers();

	return (
		<main className='flex h-screen flex-col items-center justify-center p-4 md:px-24 py-32 gap-4'>
			<PreferencesTab />
			<div
				className='absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
				dark:bg-[size:20px_20px] bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]'
				aria-hidden='true'
			/>

			<div className='z-10 border rounded-lg max-w-5xl w-full min-h-[85vh] text-sm lg:flex'>
				<ChatLayout defaultLayout={defaultLayout} users={users} />
			</div>
		</main>
	);
}