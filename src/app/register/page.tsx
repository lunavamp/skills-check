import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card p-6 max-w-md w-full shadow-lg bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-6">
          Регистрация в SkillsCheck
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
}
