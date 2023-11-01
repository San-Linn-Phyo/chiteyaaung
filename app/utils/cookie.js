"use client";

export function validateUser(passPath, failPath, router) {
  const cookies = document.cookie;
  if (!cookies.includes("user_data")) {
    if (failPath) router.push(failPath);
    return;
  }
  cookies.split(";").forEach((cookie) => {
    if (cookie.includes("user_data")) {
      const userData = JSON.parse(cookie.split("=")[1]);
      if (userData.uid && userData.token && passPath) {
        router.push(passPath);
      }
    }
  });
}
