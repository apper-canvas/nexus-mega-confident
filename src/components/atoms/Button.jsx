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
    primary: "bg-primary text-white hover:bg-primary/90 transition-colors",
    secondary: "bg-sidebar-bg text-text-primary hover:bg-sidebar-active border border-border transition-colors",
    ghost: "text-text-secondary hover:bg-sidebar-active hover:text-text-primary transition-colors",
    danger: "bg-red-500 text-white hover:bg-red-600 transition-colors",
    purple: "bg-primary text-white hover:bg-primary/90 transition-colors",
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