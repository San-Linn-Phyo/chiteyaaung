// TODO:: Protect the route.

"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CurrentUserContext } from "@/app/providers/CurrentUserProvider";
import { UsersContext } from "@/app/providers/UsersProvider";

export default function Sidebar({ uid }) {
  // const { currentUser } = useContext(CurrentUserContext);
  const { users } = useContext(UsersContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (!currentUser) router.push("/signin");
  // }, [currentUser]);

  return (
    <div className="bg-accent rounded-lg max-h-full min-h-full overflow-auto relative">
      <span className="block text-lg shadow-sm sticky top-0 bg-inherit p-4 z-50 bg-opacity-100">
        People
      </span>

      <div className="grid gap-2 p-4">
        {users.map((user) => {
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
                  <img src={user.image} alt={user.name} />
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
    </div>
  );
}
