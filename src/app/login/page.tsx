"use client";
import React, { useState } from "react";
import useForm from "@/hooks/useForm";

type LoginValues = {
  email: string;
  password: string;
};

const validateLogin = (values: LoginValues) => {
  const errs: Partial<Record<keyof LoginValues, string>> = {};
  if (!values.email) {
    errs.email = "Email обязателен";
  } else if (!values.email.includes("@")) {
    errs.email = "Неверный формат email";
  }
  if (!values.password) {
    errs.password = "Пароль обязателен";
  }
  return errs;
};

export default function LoginPage() {
  const [error, setError] = useState("");

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<LoginValues>({
      initialValues: { email: "", password: "" },
      validate: validateLogin,
      onSubmit: async ({ email, password }) => {
        setError("");
        // эмуляция запроса
        await new Promise((res) => setTimeout(res, 1000));
        if (email === "test@example.com" && password === "password") {
          alert("Login successful!");
        } else {
          setError("Invalid credentials");
        }
      },
    });

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-sm p-8 space-y-4 bg-base-100 rounded shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              className="input input-bordered"
              value={values.email}
              onChange={handleChange}
              required
              autoFocus
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered"
              value={values.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-error text-sm">{errors.password}</p>
            )}
          </div>

          {error && <div className="text-error text-sm">{error}</div>}

          <button
            type="submit"
            className={`btn btn-primary w-full" ${
              isSubmitting ? "loading" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
