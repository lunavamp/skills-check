"use client";

import { useState } from "react";
import useForm from "@/hooks/useForm";
import Input from "@/components/form/Input";
import PasswordInput from "@/components/form/PasswordInput";
import SubmitButton from "@/components/form/SubmitButton";

export interface LoginValues {
  email: string;
  password: string;
}

function validateLogin(values: LoginValues) {
  const errors: Partial<Record<keyof LoginValues, string>> = {};
  if (!values.email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Invalid email format";
  if (!values.password) errors.password = "Password is required";
  return errors;
}

async function handleLoginSubmit(
  vals: LoginValues,
  setAuthError: React.Dispatch<React.SetStateAction<string>>
) {
  setAuthError("");
  await new Promise((res) => setTimeout(res, 1000));
  if (vals.email === "test@example.com" && vals.password === "password") {
    alert("Login successful!");
  } else {
    setAuthError("Invalid credentials");
  }
}

export default function LoginPage() {
  const [authError, setAuthError] = useState("");

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<LoginValues>({
      initialValues: { email: "", password: "" },
      validate: validateLogin,
      onSubmit: (vals) => handleLoginSubmit(vals, setAuthError),
    });

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-sm p-8 space-y-4 bg-base-100 rounded shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            autoFocus
            required
          />

          <PasswordInput
            name="password"
            label="Password"
            placeholder="Your password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          {authError && <div className="text-error text-sm">{authError}</div>}

          <SubmitButton loading={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
