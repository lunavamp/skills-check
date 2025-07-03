"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface SubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ children, loading = false, disabled, className = "", ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      type="submit"
      disabled={disabled || loading}
      className={`btn btn-primary w-full ${
        loading ? "btn-loading" : ""
      } ${className}`.trim()}
    >
      {loading ? "Submitting..." : children}
    </button>
  )
);

SubmitButton.displayName = "SubmitButton";
export default SubmitButton;
