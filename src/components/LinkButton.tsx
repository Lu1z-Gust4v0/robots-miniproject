import Link from "next/link";
import { ReactNode } from "react";

interface LinkButtonProps {
  children: ReactNode;
  path: string;
  className?: string;
}

export default function LinkButton({ children, path, className }: LinkButtonProps) {
  return (
    <Link
      href={path}
      className={`
          block bg-primary text-white py-2 px-4 rounded-md 
          transition-all duration-200 ease-out 
          hover:scale-105 hover:bg-accent 
          focus:scale-105 focus:bg-accent ${className}
        `}
    >
      {children} 
    </Link>
  );
}
