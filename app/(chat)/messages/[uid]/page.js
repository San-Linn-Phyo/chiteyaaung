import Sidebar from "@/app/components/chat/Sidebar";
import Chat from "@/app/components/chat/Chat";
import RightSidebar from "@/app/components/chat/RightSidebar";
import Header from "@/app/components/chat/Header";

export default async function MessagePage({ params: { uid } }) {
  const users = await (
    await fetch("http://localhost:3003/api/User/user")
  ).json();

  const [user] = users.filter((user) => user._id === uid);

  console.log("Users: ", users);
  return (
    <div className="flex flex-col min-h-screen max-h-screen">
      <Header />

      <div className="flex-grow grid grid-cols-[20%_60%_20%] py-4 px-8 h-full max-h-full overflow-hidden">
        <Sidebar uid={uid} users={users} />
        <Chat user={user} />
        <RightSidebar user={user} />
      </div>
    </div>
  );
}
