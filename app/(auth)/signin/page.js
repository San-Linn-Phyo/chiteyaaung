import SigninForm from "@/app/(auth)/_components/SigninForm/SigninForm";

export default function SigninPage() {
  return (
    <div className="card bg-base-100 shadow-xl max-w-sm mx-auto">
      <div className="card-body">
        <h2 className="card-title mb-4">ချစ်ရအောင်</h2>

        <SigninForm />
      </div>
    </div>
  );
}
