"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useMutation,
  gql,
  MutationFunctionOptions,
  FetchResult,
} from "@apollo/client";
import useForm from "@/hooks/useForm";
import Input from "@/components/form/Input";
import PasswordInput from "@/components/form/PasswordInput";
import SubmitButton from "@/components/form/SubmitButton";

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;


interface RegisterResponse {
  register: string;
}


interface RegisterVars {
  username: string;
  email: string;
  password: string;
}


interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}


function validateRegister(vals: RegisterFormValues): Record<string, string> {
  const errs: Record<string, string> = {};
  if (!vals.username.trim()) errs.username = "Type your username";
  if (!vals.email) errs.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(vals.email))
    errs.email = "Wrong email format";
  if (!vals.password) errs.password = "Password is required";
  else if (vals.password.length < 8)
    errs.password = "At least 8 characters required";
  if (!vals.confirmPassword) errs.confirmPassword = "Repeat your password";
  else if (vals.confirmPassword !== vals.password)
    errs.confirmPassword = "Passwords do not match";
  return errs;
}


async function handleRegisterSubmit(
  vals: RegisterFormValues,
  registerUser: (
    options?: MutationFunctionOptions<RegisterResponse, RegisterVars>
  ) => Promise<FetchResult<RegisterResponse>>,
  router: ReturnType<typeof useRouter>
) {
  const result = await registerUser({
    variables: {
      username: vals.username.trim(),
      email: vals.email.trim(),
      password: vals.password,
    },
  });

  if (result.data?.register) {
    localStorage.setItem("token", result.data.register);
    router.push(`/profile/${vals.username.trim()}`);
  }
}

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [registerUser, { loading }] = useMutation<
    RegisterResponse,
    RegisterVars
  >(REGISTER_MUTATION);

  const { values, handleChange, handleSubmit, errors } = useForm<
    RegisterFormValues
  >({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateRegister,
    onSubmit: (vals) => handleRegisterSubmit(vals, registerUser, router),
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input
        id="username"
        name="username"
        type="text"
        label="Username"
        placeholder="Your username"
        value={values.username}
        onChange={handleChange}
        error={errors.username}
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
        required
      />

      <PasswordInput
        id="password"
        name="password"
        label="Password"
        placeholder="At least 8 characters"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="new-password"
        required
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        placeholder="Repeat your password"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      <SubmitButton loading={loading}>Sign Up</SubmitButton>

      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-primary underline">
          Log In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
