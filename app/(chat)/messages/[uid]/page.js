import Sidebar from "@/app/(chat)/messages/_components/Sidebar";
import Chat from "@/app/(chat)/messages/_components/Chat";

export default function MessagePage({ params: { uid } }) {
  return (
    <div className="grid grid-cols-[20%_50%_30%] h-screen w-full">
      <Sidebar uid={uid} />
      <Chat uid={uid} />
      <div className="bg-primary">rightsidebar</div>
    </div>
  );
}
