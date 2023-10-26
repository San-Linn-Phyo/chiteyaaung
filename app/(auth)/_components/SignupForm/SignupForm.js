"use client";

import TextFormControl from "@/app/(auth)/_components/TextFormControl";
import PasswordFormControl from "@/app/(auth)/_components/PasswordFormControl";
import { useState } from "react";
import { validateData } from "@/app/(auth)/_components/SignupForm/utils";
import Link from "next/link";

export default function SignupForm({ children }) {
  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    isLoading: false,
  });

  const [errorState, setErrorState] = useState({
    nameError: { message: "" },
    phoneNumberError: { message: "" },
    passwordError: { message: "" },
  });

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (validateData(state)) {
        // set no error
        setErrorState({
          nameError: { message: "" },
          phoneNumberError: { message: "" },
          passwordError: { message: "" },
        });

        setState({ ...state, isLoading: true });

        console.log("state ", state);

        // register new user using api
        fetch("http://localhost:3003/api/User/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: state.name,
            ph_no: state.phoneNumber,
            password: state.password,
            age: 14,
            gender: "Male",
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.error(err));
      }
    } catch (e) {
      setErrorState(e);
    }
  }

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
        <TextFormControl
          fieldFor="Phone Number"
          placeholder="Type your phone number"
          value={state}
          setValue={setState}
          errorMsg={errorState.phoneNumberError.message}
        />
        <PasswordFormControl
          fieldFor="Password"
          placeholder="Type your password"
          value={state}
          setValue={setState}
          errorMsg={errorState.passwordError.message}
        />

        <button className="btn btn-primary w-full mt-4" type="submit">
          Signup
          {state.isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : null}
        </button>
      </form>

      <p className="text-center">OR</p>

      <Link href="/signin" className="btn btn-secondary w-full mt-4">
        Signin
      </Link>
    </>
  );
}
