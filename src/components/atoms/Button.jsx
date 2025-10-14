import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  disabled,
  loading,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";
  
const variants = {
primary: "bg-gradient-to-r from-primary to-secondary text-white hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-glass",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    danger: "bg-red-500 text-white hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98]",
    purple: "bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-glass",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
<div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;