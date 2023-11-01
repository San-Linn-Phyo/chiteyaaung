export default function RightSidebar({ uid }) {
  return (
    <div className="bg-accent rounded-lg flex justify-center text-center items-center">
      <div>
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
            <span className="text-3xl">K</span>
          </div>
        </div>

        <p className="mt-4">Someone</p>
        <p className="mt-2">age</p>
      </div>
    </div>
  );
}
