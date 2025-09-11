import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/components/ui/button";

// Enhanced button variants for CivicFix
export const CivicButton = ({ className, variant, ...props }: ButtonProps) => {
  const civicVariants = {
    hero: "bg-gradient-to-r from-civic-blue to-civic-green text-white hover:shadow-civic transition-all duration-300 hover:scale-105",
    official: "bg-civic-blue text-white hover:bg-civic-blue/90 shadow-md",
    public: "bg-civic-green text-white hover:bg-civic-green/90 shadow-md",
    outline: "border-civic-blue text-civic-blue hover:bg-civic-blue/5"
  };

  return (
    <Button
      className={cn(
        variant && variant in civicVariants 
          ? civicVariants[variant as keyof typeof civicVariants]
          : "",
        className
      )}
      variant={variant}
      {...props}
    />
  );
};