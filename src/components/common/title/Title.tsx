import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
  className?: string;
};

export function Title({ children, className }: TitleProps) {
  return (
    <h1
      className={`text-4xl font-extrabold tracking-tight lg:text-5xl  ${className}`}
    >
      {children}
    </h1>
  );
}
