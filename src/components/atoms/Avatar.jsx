import { cn } from "@/utils/cn";

const Avatar = ({ name = "", size = "md", className, imageUrl }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
    xl: "w-24 h-24 text-3xl",
  };

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (imageUrl) {
    return (
      <div className={cn("rounded-full overflow-hidden border-2 border-primary/50", sizes[size], className)}>
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-full flex items-center justify-center font-semibold",
      "bg-gradient-to-br from-primary to-secondary text-white",
      "border-2 border-primary/50 shadow-glow",
      sizes[size],
      className
    )}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;