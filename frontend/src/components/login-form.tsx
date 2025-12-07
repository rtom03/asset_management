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
import { Loader, Loader2, LucideLoader2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    try {
      const username = e.target.username.value;
      const password = e.target.password.value;
      const res = await loginUser(username, password);
      console.log(res.token);
      if (res.user) {
        dispatch(login(res));
        setAlert({ type: "success", message: res.message });
        e.target.username.value = "";
        e.target.password.value = "";
        navigate("/");
      } else {
        setAlert({ type: "failed", message: res.message });
        e.target.email.value = "";
        e.target.password.value = "";
      }
      setLoading(false);
    } catch (error) {
      setAlert({ type: "error", message: "Something went wrong. Try again." });
      console.log(error);
      setLoading(false);
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
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="john_doe"
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
                  {loading ? (
                    <LucideLoader2 className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
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
