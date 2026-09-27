import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div className={`os-container ${className}`.trim()}>
      {children}
    </div>
  );
}
