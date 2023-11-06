import SigninForm from "@/app/components/form/SigninForm";

export default function SigninPage() {
  return (
    <div className="card bg-base-100 shadow-xl max-w-sm mx-auto mt-8">
      <div className="card-body">
        <h2 className="card-title mb-4">Chityaaung</h2>

        <SigninForm />
      </div>
    </div>
  );
}
