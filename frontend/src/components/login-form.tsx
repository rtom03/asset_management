import { cn } from "@/lib/utils";
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
import { loginUser } from "./../services/appServices.js";
import { useDispatch } from "react-redux";
import { login } from "@/reducers/appReducer.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertToast from "@/components/AlertToast.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "@/services/appServices.js";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const res = await loginUser(email, password);
      dispatch(login(res));
      if (res.ok) {
        setAlert({ type: "success", message: res.message });
      } else {
        setAlert({ type: "failed", message: res.message });
      }
      e.target.email.value = "";
      e.target.password.value = "";
      navigate("/");
    } catch (error) {
      setAlert({ type: "error", message: "Something went wrong. Try again." });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required name="password" />
              </Field>
              <Field>
                <Button type="submit" className="bg-amber-600 cursor-pointer">
                  Login
                </Button>
                {/* <Button
                  variant="outline"
                  type="button"
                  onClick={() => loginWithRedirect()}
                  className="cursor-pointer"
                > */}
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const decoded = jwtDecode(credentialResponse.credential);
                      const idToken = credentialResponse.credential;
                      console.log(decoded);
                      const res = await fetch(`${BASE_URL}/user/sign-in`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: decoded.email,
                          name: decoded.name,
                          provider: "google",
                          idToken,
                        }),
                      });

                      const data = await res.json(); // parse JSON from backend
                      dispatch(login(data)); // now dispatch the actual response
                      navigate("/");
                    } catch (err) {
                      console.error("Login failed:", err);
                    }
                  }}
                />
                {/* Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <AlertToast alert={alert} />
    </div>
  );
}
