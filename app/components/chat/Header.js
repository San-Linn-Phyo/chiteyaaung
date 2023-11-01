"use client";

import { useEffect, useState } from "react";
import SignOutButton from "./SignOutButton";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (!userData) return router.push("/signup");
    setUser(userData);
  }, []);

  return (
    <div className="flex items-center justify-between py-4 px-8 shadow-md">
      <h1 className="text-2xl">Chityaaung</h1>

      <div>
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
            <span>KO</span>
          </div>
        </div>

        <span className="ms-4">{user.name}</span>

        <SignOutButton />
      </div>
    </div>
  );
}
