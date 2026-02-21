import type { ReactNode } from "react";

type PaperProps = {
	children: ReactNode;
	className?: string;
	variant?: "default" | "intro";
};

export function Paper({ children, className = "", variant = "default" }: PaperProps) {
	const variantClass = variant === "intro" ? "paper intro" : "paper";
	return <div className={`${variantClass} ${className}`.trim()}>{children}</div>;
}
