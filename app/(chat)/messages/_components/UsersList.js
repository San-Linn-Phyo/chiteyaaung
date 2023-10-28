"use client";

import Link from "next/link";
import { useLocalStorage } from "@/app/(chat)/messages/[uid]/_hooks/useLocalStorage";

export default function UsersList({ users, uid }) {
  const { get } = useLocalStorage();
  const result = users.filter((user) => user._id !== get("uid"));

  return (
    <div className="grid gap-2">
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

            <p>{user.name}</p>

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
