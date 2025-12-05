import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { register } from "@/reducers/appReducer.js";
import { registerUser } from "./../services/appServices.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertToast from "@/components/AlertToast.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "@/services/appServices.js";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirm.value;
      if (password !== confirmPassword) {
        setAlert({
          type: "error",
          message: "your password does not match. Try again.",
        });
      } else {
        const res = await registerUser(name, email, password);
        setAlert({ type: "success", message: res.message });
        dispatch(register(res));
        navigate("/login");
      }
    } catch (error) {
      setAlert({ type: "error", message: error.message });
    }
  };
  return (
    <Card {...props}>
      <CardHeader>
        <AlertToast alert={alert} />

        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegistration}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                name="name"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required name="password" />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                name="confirm"
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="bg-amber-600">
                  Create Account
                </Button>
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const idToken = credentialResponse.credential; // IMPORTANT
                      const decoded = jwtDecode(idToken);

                      console.log("Decoded:", decoded);
                      const response = await fetch(`${BASE_URL}/user/sign-up`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          provider: "google",
                          idToken, // MUST send this
                          email: decoded.email, // optional (backend can use googlePayload.email)
                          name: decoded.name, // optional
                        }),
                      });
                      const data = await response.json();
                      console.log(data.message);
                      if (data.user) {
                        dispatch(register(data.user));
                        navigate("/login");
                      } else {
                        setAlert({ type: "error", message: data.message });
                        console.log(data.message);
                      }
                    } catch (err) {
                      console.error("Google Sign-In failed:", err);
                    }
                  }}
                />
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
