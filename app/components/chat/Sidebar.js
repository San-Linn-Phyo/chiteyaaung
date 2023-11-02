import UsersList from "@/app/components/chat/UsersList";

export default async function Sidebar({ uid , users}) {
  return (
    <div className="bg-accent rounded-lg max-h-full min-h-full overflow-auto relative">
      <span className="block text-lg shadow-sm sticky top-0 bg-inherit p-4 z-50 bg-opacity-100">
        People
      </span>

      <UsersList users={users} uid={uid} />
    </div>
  );
}
