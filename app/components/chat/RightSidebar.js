export default function RightSidebar({ user }) {
  return (
    <div className="bg-accent rounded-lg justify-center text-center items-center hidden lg:flex">
      <div>
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
            <img src={user?.image} alt={user?.name} />
          </div>
        </div>

        <p className="mt-4">{user?.name}</p>
        <p className="mt-2">{user?.gender}</p>
        <p className="mt-2">{user?.age}</p>
      </div>
    </div>
  )
}
