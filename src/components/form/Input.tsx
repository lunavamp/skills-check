"use client";

import { forwardRef, useId, type ComponentPropsWithoutRef } from "react";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, className = "", ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? `input-${autoId}`;

    return (
      <div className="form-control">
        <label htmlFor={inputId} className="label">
          {label}
        </label>
        <input
          {...props}
          id={inputId}
          ref={ref}
          className={`input input-bordered w-full ${
            error ? "input-error" : ""
          } ${className}`}
        />
        {error && <span className="text-error text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
