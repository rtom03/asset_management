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
import { useEffect, useRef, useState } from "react";
import { register } from "@/reducers/appReducer.js";
import { registerUser } from "./../services/appServices.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertToast from "@/components/AlertToast.jsx";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "@/services/appServices.js";
import { LucideLoader2 } from "lucide-react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const department = [
    "CCTV_OPERATION",
    "ESG",
    "FINANCE",
    "FRONT_DESK",
    "HR",
    "IT",
    "MARKETING",
    "PROCUREMENT",
  ];
  const [alert, setAlert] = useState({ type: "", message: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [value, setValue] = useState(department[4]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(!loading);

    try {
      const name = e.target.name.value;
      const username = e.target.username.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirm.value;
      const dept = e.target.dept.value;
      if (password !== confirmPassword) {
        setAlert({
          type: "error",
          message: "your password does not match. Try again.",
        });
      } else {
        const res = await registerUser(name, username, dept, password);
        setAlert({ type: "success", message: res.message });
        dispatch(register(res));
        navigate("/login");
      }
      setLoading(false);
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
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                required
                name="username"
              />
            </Field>
            <Field className="relative">
              <FieldLabel htmlFor="dept">Department</FieldLabel>
              <Input
                id="dept"
                type="text"
                name="dept"
                value={value}
                className="pr-10"
                readOnly
              />
              <div ref={ref} className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-300 cursor-pointer mt-[-30px]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                  {open && (
                    <div className="absolute left-3 mt-2 w-36 bg-gray-800 text-gray-100 rounded-md border border-gray-700 z-20">
                      <ul className="">
                        {department.map((item) => (
                          // <span className="flex justify-between items-center px-4 text-xs py-2 hover:bg-gray-700 cursor-pointer">
                          <li
                            key={item}
                            className="flex justify-between items-center px-4 text-xs py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => setValue(item)}
                          >
                            {item}
                          </li>
                          // </span>
                        ))}
                      </ul>
                    </div>
                  )}
                </button>
              </div>
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
                  {loading ? (
                    <LucideLoader2 className="animate-spin" />
                  ) : (
                    "Create account"
                  )}
                </Button>
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
