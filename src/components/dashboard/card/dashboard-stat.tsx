import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "yellow" | "green" | "blue";
}

const colorMap = {
  yellow: "bg-yellow-100 text-yellow-400",
  green: "bg-green-100 text-green-400",
  blue: "bg-blue-100 text-blue-400"
};

export function DashboardStatCard({
  title,
  value,
  icon: Icon,
  color = "yellow",
}: DashboardStatCardProps) {
  const fontSizeClass =
    typeof value === "string" && value.length > 11 ? "text-md" : "text-2xl";

  return (
    <Card className="flex items-center">
      <CardContent className="flex w-full items-center gap-4">
        <Icon
          size={42}
          className={cn("p-2 rounded-xs shrink-0", colorMap[color])}
        />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-muted-foreground">
            {title}
          </span>
          <span className={cn("font-bold", fontSizeClass)}>{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
