'use client'

import React from "react";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const signInHandler = async () => {
    await signIn("github", { callbackUrl: "/" });
  };

  return (
    <div className="signin-container">
      <button onClick={signInHandler}>
        Sign In with GitHub
      </button>
    </div>
  );
};

export default SignIn;
