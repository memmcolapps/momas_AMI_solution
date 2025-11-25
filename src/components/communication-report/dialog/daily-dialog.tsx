// components/DailyReportDialog.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DailyReportTable } from "../table/daily-report-table";
import { CalendarPopover } from "./blueCalendar";

interface DailyReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportType: "daily" | "monthly";
}

export function DailyReportDialog({
  open,
  onOpenChange,
  reportType,
}: DailyReportDialogProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [startMonth, setStartMonth] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [endMonth, setEndMonth] = useState<Date>(new Date());
  const [meterNumber, setMeterNumber] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const handleProceed = () => {
    setShowTable(true);
  };

  const handleCancel = () => {
    if (showTable) {
      setShowTable(false);
    } else {
      onOpenChange(false);
    }
  };

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
  };

  const dialogClassNames = showTable
    ? "bg-white w-full max-w-[1000px] h-fit p-6 overflow-auto"
    : "bg-white h-fit w-full max-w-lg";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={dialogClassNames}>
        <DialogHeader>
          <DialogTitle>
            {reportType === "monthly" ? "Monthly Report" : "Daily Report"}
          </DialogTitle>
        </DialogHeader>
        {!showTable ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4 md:flex-row">
                {/* Start Date Picker */}
                <div className="w-full flex-1 space-y-4 py-4">
                  <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        size={"neutral"}
                        variant="outline"
                        className={cn(
                          "w-full justify-start border-gray-300 text-left font-normal focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon size={10} className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "yyyy-MM-dd HH:mm")
                        ) : (
                          <span>Select Start Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <CalendarPopover
                      date={startDate}
                      month={startMonth}
                      onDateSelect={handleStartDateSelect}
                      onMonthChange={setStartMonth}
                      onClose={() => setStartDateOpen(false)}
                      today={today}
                    />
                  </Popover>
                </div>

                {/* End Date Picker */}
                <div className="w-full flex-1 space-y-4">
                  <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        size={"neutral"}
                        variant="outline"
                        className={cn(
                          "w-full justify-start border-gray-300 text-left font-normal focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon size={10} className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "yyyy-MM-dd HH:mm")
                        ) : (
                          <span>Select End Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <CalendarPopover
                      date={endDate}
                      month={endMonth}
                      onDateSelect={handleEndDateSelect}
                      onMonthChange={setEndMonth}
                      onClose={() => setEndDateOpen(false)}
                      today={today}
                    />
                  </Popover>
                </div>
              </div>

              {/* Meter Number Selection */}
              <div className="grid grid-cols-1 items-center gap-2">
                <Label htmlFor="meter-number" className="text-left">
                  Meter Number
                </Label>
                <Select onValueChange={setMeterNumber}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Enter Meter Number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6212026559">6212026559</SelectItem>
                    <SelectItem value="6212456987">6212456987</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between space-x-2">
              <Button
                size={"md"}
                variant="outline"
                onClick={handleCancel}
                className="cursor-pointer border-[#161CCA] text-[#161CCA]"
              >
                Cancel
              </Button>
              <Button
                size={"md"}
                className="cursor-pointer border-none bg-[#161CCA] px-4 py-2 font-medium text-white hover:bg-[#1219b0]"
                onClick={handleProceed}
                disabled={!startDate || !endDate || !meterNumber}
              >
                Proceed
              </Button>
            </div>
          </>
        ) : (
          <>
            <DailyReportTable />
            <div className="mt-4 flex justify-between space-x-2">
              <Button
                variant="outline"
                size={"lg"}
                className="cursor-pointer border-[#161CCA] text-[#161CCA]"
                onClick={handleCancel}
              >
                Back
              </Button>
              <Button
                size={"lg"}
                className="cursor-pointer border-none bg-[#161CCA] px-4 py-2 font-medium text-white hover:bg-[#1219b0]"
              >
                Export
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}