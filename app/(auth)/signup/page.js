import SignupForm from "@/app/(auth)/_components/SignupForm/SignupForm";

export default function SignupPage() {
  return (
    <div className="card bg-base-100 shadow-xl max-w-sm mx-auto">
      <div className="card-body">
        <h2 className="card-title mb-4">ချစ်ရအောင်</h2>

        <SignupForm />
      </div>
    </div>
  );
}
