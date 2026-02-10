"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";

type DatePickerProps = {
  name: string;
  label?: string;
  value?: Date;
  onChange?: (date?: Date) => void;
};

export function DatePicker({ name, label, value, onChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col">
      {label && (
        <Label htmlFor={name} className="mb-2">
          {label}
        </Label>
      )}

      {/* Hidden input supaya ikut FormData */}
      <input
        type="hidden"
        name={name}
        value={value ? value.toISOString().split("T")[0] : ""}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            id={name}
            className="justify-start font-normal"
          >
            {value ? value.toLocaleDateString("id-ID") : "Pilih tanggal"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
