import Header from "@/app/components/chat/Header";
import Sidebar from "@/app/components/chat/Sidebar";

export default async function MessagePage() {
  const users = await (
    await fetch("http://localhost:3003/api/User/user")
  ).json();

  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden">
      <Header />

      <div className="flex-grow grid grid-cols-[20%_80%] py-4 px-8 max-h-full min-h-full">
        <Sidebar users={users} />

        <div className="grid items-center justify-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8em"
              height="8em"
              viewBox="0 0 512 512"
              className="mx-auto"
            >
              <path
                fill="#88dcdd"
                d="M64 0C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"
              ></path>
            </svg>
            <p className="text-xl mt-4">No chats selected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
