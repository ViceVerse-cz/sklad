"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./calendar";
import { useState } from "react";

type DatePickerProps = {
  defaultDate?: Date;
  onSelectDate?: (date: Date | undefined) => void;
  placeholder?: string;
};

export function DatePicker({
  defaultDate,
  onSelectDate,
  placeholder,
}: DatePickerProps) {
  const [date, setDate] = useState(defaultDate);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onSelectDate) {
      onSelectDate(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{placeholder ?? "Vyber datum"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <div className="z-50 shadow-lg">
        <PopoverContent className="w-auto bg-white p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </div>
    </Popover>
  );
}
