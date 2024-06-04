import { ReactNode } from "react";

type TitleCardProps = {
  children: ReactNode;
  className?: string;
};

export function TitleCard({ children, className }: TitleCardProps) {
  return (
    <h1
      className={`text-center leading-7 tracking-wide uppercase text-2xl font-extrabold text-foreround  ${className}`}
    >
      {children}
    </h1>
  );
}
