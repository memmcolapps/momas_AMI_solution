import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronDown, Square } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DailyReportTable } from "../table/daily-report-table";
import { BlueCalendar } from "./blueCalendar";
import { Card } from "@/components/ui/card";

interface DailyReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const meterNumberData = [
  "6212026559",
  "6212026549",
  "6212026539",
  "6212026529",
  "6212026519",
  "6212026589",
  "6212026569",
  "6212026579",
  "6212026599",
  "6212026509",
];

export function DailyReportDialog({
  open,
  onOpenChange,
}: DailyReportDialogProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [startMonth, setStartMonth] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [endMonth, setEndMonth] = useState<Date>(new Date());
  const [showTable, setShowTable] = useState(false);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [selectedMeterNumber, setSelectedMeterNumber] = useState<string[]>([]);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [meterNumberDropdownOpen, setMeterNumberDropdownOpen] = useState(false);

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

  const getMeterMeterDisplayText = () => {
    if (selectedMeterNumber.length === 0) return "Enter Meter Number";
    if (selectedMeterNumber.length === 1) return selectedMeterNumber[0];
    if (selectedMeterNumber.length === meterNumberData.length)
      return "All Meter Number";
    return `${selectedMeterNumber.length} Meter Number`;
  };

  const handleMeterNumberChange = (meter: string) => {
    if (meter === "Select All") {
      if (selectedMeterNumber.length === meterNumberData.length) {
        setSelectedMeterNumber([]);
      } else {
        setSelectedMeterNumber([...meterNumberData]);
      }
    } else {
      setSelectedMeterNumber((prev) => {
        if (prev.includes(meter)) {
          return prev.filter((m) => m !== meter);
        } else {
          return [...prev, meter];
        }
      });
    }
  };

  const dialogClassNames = showTable
    ? "bg-white w-[95vw] max-w-[1000px] h-[70vh] p-6 overflow-auto md:max-w-[1000px]"
    : "bg-white h-fit w-full max-w-[600px] sm:max-w-[600px]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={dialogClassNames}>
        <DialogHeader>
          <DialogTitle className="px-2 pt-4">Report</DialogTitle>
        </DialogHeader>
        {!showTable ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4 md:flex-row">
                {/* select staratDate */}
                <div className="w-full flex-1 space-y-4 py-4">
                  <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        size={"neutral"}
                        variant="outline"
                        className={cn(
                          "w-full justify-start border-gray-300 text-left font-normal focus:ring-0 focus:ring-offset-0",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon size={10} className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "yyyy-MM-dd")
                        ) : (
                          <span>Select Start Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <BlueCalendar
                      date={startDate}
                      month={startMonth}
                      onDateSelect={handleStartDateSelect}
                      onMonthChange={setStartMonth}
                      onClose={() => setStartDateOpen(false)}
                      today={today}
                    />
                  </Popover>
                </div>

                {/* select endDate */}
                <div className="w-full flex-1 space-y-4">
                  <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        size={"neutral"}
                        variant="outline"
                        className={cn(
                          "w-full justify-start border-gray-300 text-left font-normal focus:ring-0 focus:ring-offset-0",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon size={10} className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "yyyy-MM-dd")
                        ) : (
                          <span>Select End Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <BlueCalendar
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

              {/* Meter Number */}
              <div className="grid grid-cols-1 items-center gap-2">
                <Label
                  htmlFor="meter-number"
                  className="mb-2 block text-base font-medium text-gray-700"
                >
                  Meter Number <span className="text-red-500">*</span>
                </Label>
                <DropdownMenu
                  open={meterNumberDropdownOpen}
                  onOpenChange={setMeterNumberDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 w-full justify-between! border-gray-100 text-gray-400 hover:bg-gray-50"
                    >
                      {getMeterMeterDisplayText()}
                      <ChevronDown size={12} className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="max-h-60 w-(--radix-dropdown-menu-trigger-width) min-w-40 overflow-y-auto"
                    align="start"
                  >
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={() => handleMeterNumberChange("Select All")}
                      className="flex cursor-pointer items-center justify-between gap-4 px-3 py-2 hover:bg-gray-50"
                    >
                      <span className="flex-1 text-left text-sm">
                        Select All
                      </span>
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                        {selectedMeterNumber.length ===
                        meterNumberData.length ? (
                          <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-green-100">
                            <Check size={12} className="text-green-600" />
                          </div>
                        ) : (
                          <Square size={14} className="text-gray-400" />
                        )}
                      </div>
                    </DropdownMenuItem>
            <hr className="border-gray-200" />
                    {meterNumberData.map((number) => (
                      <div key={number}>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          onClick={() => handleMeterNumberChange(number)}
                          className="flex cursor-pointer items-center justify-between gap-4 px-3 py-2 hover:bg-gray-50"
                        >
                          <span className="flex-1 text-left text-sm">
                            {number}
                          </span>
                          <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                            {selectedMeterNumber.includes(number) ? (
                              <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-green-100">
                                <Check size={12} className="text-green-600" />
                              </div>
                            ) : (
                              <Square size={14} className="text-gray-400" />
                            )}
                          </div>
                        </DropdownMenuItem>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Action */}
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
                disabled={!startDate || !endDate || !selectedMeterNumber}
              >
                Proceed
              </Button>
            </div>
          </>
        ) : (
          <>
            <Card className="border-[0.1px] border-gray-100 p-4 shadow-none">
              <DailyReportTable />
            </Card>
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
