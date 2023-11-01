"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UsersList({ users, uid }) {
  const [result, setResult] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (!userData) return router.push("/signup");
    setResult(users.filter((user) => user._id !== userData._id));
  }, []);

  return (
    <div className="grid gap-2 p-4">
      {result.map((user) => {
        return (
          <div
            key={user._id}
            className={`flex items-center gap-4 p-4 rounded-2xl relative ${
              user._id === uid
                ? "bg-primary bg-opacity-50"
                : "hover:bg-primary hover:bg-opacity-50"
            }`}
          >
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                <span className="text-xl">JO</span>
              </div>
            </div>

            <span>{user.name}</span>

            <Link
              href={`/messages/${user._id}`}
              className="absolute top-0 left-0 bottom-0 right-0"
            />
          </div>
        );
      })}
    </div>
  );
}
