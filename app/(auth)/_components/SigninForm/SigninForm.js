"use client";

import TextFormControl from "@/app/components/form/TextFormControl";
import PasswordFormControl from "@/app/components/form/PasswordFormControl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useFetch } from "@/app/hooks/useFetch";
import validate from "@/app/utils/form";
import { validateUser } from "@/app/utils/cookie";

export default function SigninForm() {
  const router = useRouter();
  const { isLoading, data, post } = useFetch(
    "http://localhost:3003/api/User/login"
  );

  const [state, setState] = useState({
    name: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    nameError: "",
    passwordError: "",
  });

  const { get, set } = useLocalStorage();

  function setNoError() {
    setErrorState({
      nameError: "",
      passwordError: "",
    });
  }

  function signin(name, password) {
    post({ params: { name, password } });
  }

  function alreadySignedIn() {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (userData) router.push("/messages");
  }

  function newSignedIn() {
    localStorage.setItem("user_data", JSON.stringify(data));
    router.push("/messages");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const result = validate(state);
    if (result.status === "pass") {
      setNoError();
      signin(state.name, state.password);
      return;
    }

    setErrorState(result.error);
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
          autoFocus={true}
          fieldFor="Name"
          value={state.name}
          onChange={{ fun: setState, key: "name" }}
          errorMsg={errorState.nameError}
        />

        <PasswordFormControl
          fieldFor="Password"
          value={state.password}
          onChange={{ fun: setState, key: "password" }}
          errorMsg={errorState.passwordError}
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
