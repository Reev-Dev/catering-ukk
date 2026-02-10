import { Building2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TimelineItemFullProps = {
  title?: string;
  iconTitle?: string;
  period?: string;
  description?: string;
  badges?: string[];
  icon?: React.ReactNode;
};

export function TimelineItemFull({
  title,
  iconTitle,
  period,
  description,
  badges,
  icon,
}: TimelineItemFullProps) {
  return (
    <div className="relative pb-4 pl-8 last:pb-0">
      {/* Timeline dot */}
      <div className="absolute top-3 left-px h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background ring-8 ring-background" />

      {/* Content */}
      <div className="space-y-3">
        {(iconTitle || icon) && (
          <div className="flex items-center mb-1 gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
              {icon || <Building2 className="h-5 w-5 text-muted-foreground" />}
            </div>
            {iconTitle && (
              <span className="font-medium text-sm">{iconTitle}</span>
            )}
          </div>
        )}
        {title && (
          <h3 className="font-semibold text-md pt-1 tracking-[-0.01em]">
            {title}
          </h3>
        )}
        {period && (
          <div className="mt-1 flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{period}</span>
          </div>
        )}
        {description && (
          <p className="text-pretty text-muted-foreground text-xs sm:text-sm">
            {description}
          </p>
        )}
        {badges && (
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <Badge className="rounded-full" key={b} variant="secondary">
                {b}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type TimelineFullProps = {
  items: TimelineItemFullProps[];
};

export default function Timeline({ items }: TimelineFullProps) {
  return (
    <div className="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20">
      <div className="relative ml-3">
        {/* Timeline line */}
        <div className="absolute top-4 bottom-0 left-0 border-l-2" />

        {items.map((item, index) => (
          <TimelineItemFull key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
