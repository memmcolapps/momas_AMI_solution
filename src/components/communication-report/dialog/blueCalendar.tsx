import { Button } from "@/components/ui/button";
import { PopoverContent } from "@/components/ui/popover";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Calendar } from "@/components/ui/blue-calendar";

interface BlueCalendarProps {
  date: Date | undefined;
  month: Date;
  onDateSelect: (date: Date | undefined) => void;
  onMonthChange: (month: Date) => void;
  onClose: () => void;
  today: Date;
}

export function BlueCalendar({
  date,
  month,
  onDateSelect,
  onMonthChange,
  onClose,
  today,
}: BlueCalendarProps) {
  const handlePrevMonth = () => {
    const prev = new Date(month);
    prev.setMonth(month.getMonth() - 1);
    onMonthChange(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(month);
    next.setMonth(month.getMonth() + 1);
    onMonthChange(next);
  };

  const handleDone = () => {
    onClose();
  };

  return (
    <PopoverContent
      className="relative w-[320px] overflow-hidden rounded-lg border-none bg-white p-4 shadow-lg"
      align="start"
    >
      {/* Close button */}
      <div className="flex justify-end px-2 py-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X strokeWidth={2} size={16} />
        </Button>
      </div>
      <div className="mb-4 border-t border-gray-200"></div>

      {/* Header section */}
      <div className="relative z-10 mb-4 flex items-center justify-between px-2">
        <div className="font-semibold text-gray-800">
          {month.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handlePrevMonth}
          >
            <ChevronLeft strokeWidth="1" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleNextMonth}
          >
            <ChevronRight strokeWidth="1" className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar */}
      <div className="relative z-0 flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          month={month}
          onMonthChange={onMonthChange}
          onSelect={onDateSelect}
          disabled={(date) => date > today}
          className="rounded-md"
        />
      </div>

      {/* Done button */}
      <div className="relative z-10 mt-6">
        <Button
          onClick={handleDone}
          className="h-11 w-full rounded-lg bg-[#161CCA] px-10 py-6 text-base font-semibold text-white hover:bg-[#1219b0]"
        >
          Done
        </Button>
      </div>
    </PopoverContent>
  );
}