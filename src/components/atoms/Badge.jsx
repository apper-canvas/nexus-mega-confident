import { cn } from "@/utils/cn";

const Badge = ({ children, variant = "default", className }) => {
const variants = {
    default: "bg-gray-100 text-text-secondary border-border",
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-50 text-green-600 border-green-200",
    warning: "bg-amber-50 text-amber-600 border-amber-200",
    danger: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;