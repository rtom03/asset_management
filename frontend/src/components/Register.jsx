import React from "react";
import { SignupForm } from "./signup-form";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Register = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <SignupForm />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Register;
