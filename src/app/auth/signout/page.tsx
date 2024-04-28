'use client'

import React from "react";
import { signOut } from "next-auth/react";

const SignIn = () => {
  const signOutHandler = async () => {
    await signOut({ callbackUrl: "/" });
    // router.push("/");
  };

  return (
    <div className="signout-container">
      <button onClick={signOutHandler}>
        Sign Out
      </button>
    </div>
  );
};

export default SignIn;
