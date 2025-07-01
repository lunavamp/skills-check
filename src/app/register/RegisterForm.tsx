"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, gql } from "@apollo/client";
import useForm from "@/hooks/useForm";

// GraphQL-мутaция для регистрации
const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { loading }] = useMutation(REGISTER_MUTATION);

  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (vals) => {
      try {
        const { data } = await registerUser({
          variables: {
            username: vals.username.trim(),
            email: vals.email.trim(),
            password: vals.password,
          },
        });
        localStorage.setItem("token", data.register);
        router.push(`/profile/${vals.username.trim()}`);
      } catch (error: any) {
        console.error(error);
      }
    },
    validate: (vals) => {
      const errs: Record<string, string> = {};
      if (!vals.username.trim()) errs.username = "Введите имя пользователя";
      if (!vals.email) errs.email = "Email обязателен";
      else if (!/^\S+@\S+\.\S+$/.test(vals.email))
        errs.email = "Неверный формат email";
      if (!vals.password) errs.password = "Пароль обязателен";
      else if (vals.password.length < 8) errs.password = "Минимум 8 символов";
      if (!vals.confirmPassword) errs.confirmPassword = "Подтвердите пароль";
      else if (vals.confirmPassword !== vals.password)
        errs.confirmPassword = "Пароли не совпадают";
      return errs;
    },
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Username */}
      <div className="form-control">
        <label htmlFor="username" className="label">
          <span className="label-text">Имя пользователя</span>
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Ваш ник"
          value={values.username}
          onChange={handleChange}
          className={`input input-bordered ${
            errors.username ? "input-error" : ""
          }`}
          required
        />
        {errors.username && (
          <span className="text-error text-sm mt-1">{errors.username}</span>
        )}
      </div>

      {/* Email */}
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          className={`input input-bordered ${
            errors.email ? "input-error" : ""
          }`}
          autoComplete="email"
          required
        />
        {errors.email && (
          <span className="text-error text-sm mt-1">{errors.email}</span>
        )}
      </div>

      {/* Password */}
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">Пароль</span>
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Минимум 8 символов"
            value={values.password}
            onChange={handleChange}
            className={`input input-bordered w-full pr-10 ${
              errors.password ? "input-error" : ""
            }`}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute top-1/2 right-3 -translate-y-1/2"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.password && (
          <span className="text-error text-sm mt-1">{errors.password}</span>
        )}
      </div>

      {/* Confirm Password */}
      <div className="form-control">
        <label htmlFor="confirmPassword" className="label">
          <span className="label-text">Подтвердите пароль</span>
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          value={values.confirmPassword}
          onChange={handleChange}
          className={`input input-bordered ${
            errors.confirmPassword ? "input-error" : ""
          }`}
          required
        />
        {errors.confirmPassword && (
          <span className="text-error text-sm mt-1">
            {errors.confirmPassword}
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Регистрация..." : "Зарегистрироваться"}
      </button>

      <p className="text-center text-sm mt-4">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-primary underline">
          Войти
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
