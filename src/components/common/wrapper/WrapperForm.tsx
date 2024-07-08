import { ReactNode } from "react";

type WrapperFormProps = {
  children: ReactNode;
  className?: string;
};

export function WrapperForm({ children, className }: WrapperFormProps) {
  return (
    <div className={`mx-auto overflow-hidden ${className}`}>{children}</div>
  );
}
