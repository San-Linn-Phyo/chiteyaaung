"use client";

import TextFormControl from "@/app/components/form/TextFormControl";
import PasswordFormControl from "@/app/components/form/PasswordFormControl";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import validate from "@/app/utils/form";
import NumberFormControl from "@/app/components/form/NumberFormControl";
import { validateUser } from "@/app/utils/cookie";

export default function SignupForm({ children }) {
  const router = useRouter();
  const { set } = useLocalStorage();

  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    isLoading: false,
  });

  const [errorState, setErrorState] = useState({
    nameError: "",
    phoneNumberError: "",
    passwordError: "",
  });

  function saveTempInLocalStorage() {
    localStorage.setItem(
      "user_temp_data",
      JSON.stringify({
        name: state.name,
        phoneNumber: state.phoneNumber,
        password: state.password,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const result = validate(state);
    if (result.status === "pass") {
      saveTempInLocalStorage();
      router.push("/signup/profile");
      return;
    }
    setErrorState(result.error);
  }

  useEffect(() => {
    function alreadySignedIn() {
      const userData = JSON.parse(localStorage.getItem("user_data"));
      if (userData) router.push("/messages");
    }

    alreadySignedIn();
  }, []);

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

        <NumberFormControl
          fieldFor="Phone Number"
          onChange={{ fun: setState, key: "phoneNumber" }}
          errorMsg={errorState.phoneNumberError}
        />

        <PasswordFormControl
          fieldFor="Password"
          value={state.password}
          onChange={{ fun: setState, key: "password" }}
          errorMsg={errorState.passwordError}
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
