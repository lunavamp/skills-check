"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import Input from "./Input";

export interface PasswordInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  label: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ id, label, error, className = "", ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const inputType: "text" | "password" = visible ? "text" : "password";

    return (
      <div className="form-control">
        <label htmlFor={id} className="label">
          <span className="label-text">{label}</span>
        </label>
        <div className="relative">
          <Input
            {...props}
            id={id}
            ref={ref}
            type={inputType}
            className={`w-full pr-10 ${className}`}
            label=""
            error={error}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute top-1/2 right-3 -translate-y-1/2"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? "🙈" : "👁️"}
          </button>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
