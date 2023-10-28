import UsersList from "@/app/(chat)/messages/_components/UsersList";

export default async function Sidebar({ uid }) {
  const users = await (
    await fetch("http://localhost:3003/api/User/user")
  ).json();

  return (
    <div className="bg-secondary px-4 border-r">
      <UsersList users={users} uid={uid} />
    </div>
  );
}
