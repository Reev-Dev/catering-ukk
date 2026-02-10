type TimelineItemProps = {
  title?: string;
  description?: string;
};

export function TimelineItem({ title, description }: TimelineItemProps) {
  return (
    <div className="relative pb-4 pl-8 last:pb-0">
      {/* Timeline dot */}
      <div className="absolute top-3 left-px h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background ring-8 ring-background" />

      {/* Content */}
      <div className="space-y-1">
        {title && (
          <h3 className="font-semibold text-md pt-1 tracking-[-0.01em]">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-pretty text-muted-foreground text-xs sm:text-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

type TimelineProps = {
  items: TimelineItemProps[];
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20">
      <div className="relative ml-3">
        {/* Timeline line */}
        <div className="absolute top-4 bottom-0 left-0 border-l-2" />

        {items.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
