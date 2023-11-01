import Sidebar from "@/app/components/chat/Sidebar";
import Chat from "@/app/components/chat/Chat";
import RightSidebar from "@/app/components/chat/RightSidebar";
import Header from "@/app/components/chat/Header";

export default function MessagePage({ params: { uid } }) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen">
      <Header />

      <div className="flex-grow grid grid-cols-[20%_60%_20%] py-4 px-8 h-full max-h-full overflow-hidden">
        <Sidebar uid={uid} />
        <Chat uid={uid} />
        <RightSidebar uid={uid} />
      </div>
    </div>
  );
}
