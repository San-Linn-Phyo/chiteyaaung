"use client";

import SelectFormControl from "@/app/components/form/SelectFormControl";
import NumberFormControl from "@/app/components/form/NumberFormControl";
import ImageUploaderPreview from "@/app/components/form/ImageUploaderPreview";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import validate from "@/app/utils/form";
import { useFetch } from "@/app/hooks/useFetch";
import { validateUser } from "@/app/utils/cookie";

export default function SignupProfileForm() {
  const { postWithFile, isLoading } = useFetch(
    "http://localhost:3003/api/User/register"
  );
  const router = useRouter();

  const [state, setState] = useState({
    image: "",
    age: "",
    gender: "",
  });

  const [errorState, setErrorState] = useState({
    imageError: "",
    ageError: "",
    genderError: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const result = validate(state);
    if (result.status === "pass") {
      const userTempData = JSON.parse(localStorage.getItem("user_temp_data"));
      postWithFile({
        params: {
          name: userTempData.name,
          ph_no: userTempData.phoneNumber,
          password: userTempData.password,
          age: state.age,
          gender: state.gender,
          image: state.image,
        },
      });
      localStorage.removeItem("user_temp_data");
      router.push("/signin");
      return;
    }
    setErrorState(result.error);
  }

  useEffect(() => {
    function alreadySignedIn() {
      const userData = JSON.parse(localStorage.getItem("user_data"));
      if (userData) router.push("/messages");
      else {
        const userTempData = JSON.parse(localStorage.getItem("user_temp_data"));
        if (!userTempData) router.push("/signup");
      }
    }

    alreadySignedIn();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="flex flex-col items-center"
    >
      <ImageUploaderPreview
        errorMsg={errorState.imageError}
        onChange={{ fun: setState, key: "image" }}
      />

      <NumberFormControl
        fieldFor="Age"
        onChange={{ fun: setState, key: "age" }}
        errorMsg={errorState.ageError}
      />

      <SelectFormControl
        fieldFor="Gender"
        options={["Male", "Female", "Others"]}
        errorMsg={errorState.genderError}
        value={state.gender}
        onChange={{ fun: setState, key: "gender" }}
      />

      <button type="submit" className="btn btn-block btn-primary mt-8">
        Save{" "}
        {isLoading && (
          <span className="loading loading-spinner loading-md"></span>
        )}
      </button>
    </form>
  );
}
