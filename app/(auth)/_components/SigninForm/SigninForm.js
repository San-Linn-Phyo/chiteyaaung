"use client";

import TextFormControl from "@/app/(auth)/_components/TextFormControl";
import PasswordFormControl from "@/app/(auth)/_components/PasswordFormControl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { validateData } from "@/app/(auth)/_components/SigninForm/utils";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const router = useRouter();

  const [state, setState] = useState({
    name: "",
    password: "",
    isLoading: false,
  });

  const [errorState, setErrorState] = useState({
    nameError: { message: "" },
    passwordError: { message: "" },
  });

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (validateData(state)) {
        // set no error
        setErrorState({
          nameError: { message: "" },
          passwordError: { message: "" },
        });

        setState({ ...state, isLoading: true });

        // signin new user using api
        fetch("http://localhost:3003/api/User/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: state.name, password: state.password }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (
              !(localStorage.getItem("token") && localStorage.getItem("uid"))
            ) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("uid", data._id);
            }
            // router.push("/messages");
          })
          .catch((err) => console.error(err.message))
          .finally(() => {
            setState({ ...state, isLoading: false });
          });
      }
    } catch (e) {
      setErrorState(e);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("uid"))
      router.push("/messages");
  }, []);

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
          {state.isLoading ? (
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
