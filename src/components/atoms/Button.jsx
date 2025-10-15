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
      primary: "bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white hover:from-[#1E3A8A] hover:to-[#1E40AF] transition-all shadow-lg hover:shadow-xl",
      secondary: "bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 transition-colors",
      ghost: "text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors",
      danger: "bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg",
      purple: "bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white hover:from-[#1E3A8A] hover:to-[#1E40AF] transition-all shadow-lg",
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