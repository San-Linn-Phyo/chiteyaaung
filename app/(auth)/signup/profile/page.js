import SignupProfileForm from "@/app/(auth)/signup/profile/_components/SignupProfileForm";

export default function Profile() {
  return (
    <div className="card bg-base-100 shadow-xl max-w-sm mx-auto mt-8">
      <div className="card-body">
        <SignupProfileForm />
      </div>
    </div>
  );
}
