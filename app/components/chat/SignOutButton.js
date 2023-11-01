"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  function signUserOut() {
    localStorage.removeItem("user_data");
    router.push("/");
  }

  return (
    <button className="btn btn-error ms-8 inline-block" onClick={signUserOut}>
      Sign Out
    </button>
  );
}
