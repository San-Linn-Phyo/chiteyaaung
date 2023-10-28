"use client";

import TextFormControl from "@/app/(auth)/_components/TextFormControl";
import PasswordFormControl from "@/app/(auth)/_components/PasswordFormControl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { validateData } from "@/app/(auth)/_components/SigninForm/utils";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/(chat)/messages/[uid]/_hooks/useLocalStorage";
import { useFetch } from "@/app/_hooks/useFetch";

export default function SigninForm() {
  const router = useRouter();
  const { isLoading, data, post } = useFetch(
    "http://localhost:3003/api/User/login",
  );

  const [state, setState] = useState({
    name: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    nameError: { message: "" },
    passwordError: { message: "" },
  });

  const { get, set } = useLocalStorage();

  function setNoError() {
    setErrorState({
      nameError: { message: "" },
      passwordError: { message: "" },
    });
  }

  function signin(name, password) {
    post({ params: { name, password } });
  }

  function alreadySignedIn() {
    if (get("token") && get("uid")) return router.push("/messages");
  }

  function newSignedIn() {
    set("token", data.token);
    set("uid", data._id);
    router.push("/messages");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateData(state)) {
      setNoError();
      signin(state.name, state.password);
    }
  }

  useEffect(() => {
    alreadySignedIn();
    if (!data) return;
    newSignedIn();
  }, [data]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextFormControl
          fieldFor="Name"
          placeholder="Type your name"
          value={state}
          setValue={setState}
          errorMsg={errorState.nameError.message}
        />

        <PasswordFormControl
          fieldFor="Password"
          placeholder="Type your password"
          value={state}
          setValue={setState}
          errorMsg={errorState.passwordError.message}
        />

        <button className="btn btn-primary w-full mt-4" type="submit">
          Signin
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : null}
        </button>
      </form>

      <p className="text-center">OR</p>

      <Link href="/signup" className="btn btn-secondary w-full mt-4">
        Signup
      </Link>
    </>
  );
}
