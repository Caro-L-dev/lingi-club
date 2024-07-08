import { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
  className?: string;
};

export function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={`mx-auto overflow-hidden ${className}`}>{children}</div>
  );
}
