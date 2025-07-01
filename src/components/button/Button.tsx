type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};
export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const colors =
    variant === "primary" ? "btn btn-primary" : "btn btn-secondary";
  return <button className={`${colors} ${className}`} {...props} />;
}
