import { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
  className?: string;
};

export function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={`container mx-auto lg:w-1/2 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
