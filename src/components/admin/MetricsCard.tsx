import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: string;
}

const MetricsCard = ({ title, value, subtitle, icon: Icon, iconColor = "text-primary", trend }: MetricsCardProps) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
      {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
      {trend && <div className="text-xs text-green-600 mt-1">{trend}</div>}
    </div>
  );
};

export default MetricsCard;
