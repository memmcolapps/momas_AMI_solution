/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SimplifiedCalendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  ChevronDown,
  Check,
  Square,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaginationControls } from "../ui/pagination_controls";
import { FilterControl } from "../meter-management/filterSelect";
import { Card } from "../ui/card";
import { ProfileConfigs } from "./data/eventType";
import { eventTypes, feeders, meterModels, meterNumbers } from "./data/data";

const generateMockDataForEventType = (eventType: string, count: 50) => {
  const config = ProfileConfigs[eventType as keyof typeof ProfileConfigs];
  if (!config) return [];

  const data = [];

  for (let i = 0; i < count; i++) {
    const meterNo =
      meterNumbers[Math.floor(Math.random() * meterNumbers.length)];
    const feeder = feeders[Math.floor(Math.random() * feeders.length)];

    // Generate random time within the last 30 days
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const date = new Date();
    date.setDate(date.getDate() - randomDaysAgo);
    date.setHours(randomHour, randomMinute);
    const timestamp = format(date, "yyyy-MM-dd HH:mm");

    data.push({
      id: i + 1,
      ...config.generateRow(meterNo ?? '', feeder ?? '', timestamp),
    });
  }

  // Sort by time (most recent first)
  return data.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
  );
};

export default function Profile() {
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTimeValue, setStartTimeValue] = useState<string>("00:00");
  const [endTimeValue, setEndTimeValue] = useState<string>("00:00");
  const [meterNo, setMeterNo] = useState("");
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([
    "Select profile",
  ]);
  const [selectedMeterModels, setSelectedMeterModels] = useState<string[]>([]);
  const [tableData, setTableData] = useState<Record<string, string | undefined | number>[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [eventTypeDropdownOpen, setEventTypeDropdownOpen] = useState(false);
  const [meterModelDropdownOpen, setMeterModelDropdownOpen] = useState(false);

  const firstEventType = selectedEventTypes[0]
  // Get current headers based on selected event type (only first one if multiple selected)
  const currentHeaders =
    selectedEventTypes.length > 0
      ? (ProfileConfigs[firstEventType as keyof typeof ProfileConfigs]?.headers ?? [])
      : [];

  // Populate table with dummy data on component mount
  useEffect(() => {
    if (selectedEventTypes.length > 0) {
      const initialData = generateMockDataForEventType(
        selectedEventTypes[0]!,
        50,
      );
      setTableData(initialData);
    }
  }, [selectedEventTypes]);

  const handleEventTypeChange = (eventType: string) => {
    if (eventType === "Select All") {
      if (selectedEventTypes.length === eventTypes.length) {
        setSelectedEventTypes([]);
      } else {
        setSelectedEventTypes([...eventTypes]);
      }
    } else {
      setSelectedEventTypes((prev) => {
        // For single selection only
        return [eventType];
      });
    }
  };

  const handleMeterModelChange = (model: string) => {
    if (model === "Select All") {
      if (selectedMeterModels.length === meterModels.length) {
        setSelectedMeterModels([]);
      } else {
        setSelectedMeterModels([...meterModels]);
      }
    } else {
      setSelectedMeterModels((prev) => {
        if (prev.includes(model)) {
          return prev.filter((m) => m !== model);
        } else {
          return [...prev, model];
        }
      });
    }
  };

  const getEventTypeDisplayText = () => {
    if (selectedEventTypes.length === 0) return "Select Event Type";
    if (selectedEventTypes.length === 1) return selectedEventTypes[0];
    return selectedEventTypes[0]; // Show only first selected
  };

  const getMeterModelDisplayText = () => {
    if (selectedMeterModels.length === 0) return "Select Meter Model";
    if (selectedMeterModels.length === 1) return selectedMeterModels[0];
    if (selectedMeterModels.length === meterModels.length)
      return "All Meter Models";
    return `${selectedMeterModels.length} Meter Models`;
  };

  const handleRun = () => {
    console.log({
      startDate,
      endDate,
      meterNo,
      selectedEventTypes,
      selectedMeterModels,
    });

    // Generate data for the selected event type
    if (selectedEventTypes.length > 0) {
      const generatedData = generateMockDataForEventType(
        selectedEventTypes[0]!,
        50,
      );
      setTableData(generatedData);
      setCurrentPage(1);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setRowsPerPage(newPageSize);
    setCurrentPage(1);
  };

  const filterSections = [
    {
      title: "Meter Class",
      options: [
        { label: "Single-Phase", id: "singlePhase" },
        { label: "Three-Phase", id: "threePhase" },
        { label: "MD", id: "md" },
      ],
    },
    {
      title: "Meter Type",
      options: [
        { label: "Prepaid", id: "prepaid" },
        { label: "Postpaid", id: "postPaid" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex w-full flex-wrap items-end gap-4">
        {/* Start Date */}
        <div className="flex min-w-[180px] flex-1 flex-col gap-2">
          <Label htmlFor="start-date" className="text-sm font-medium">
            Start Date <span className="text-red-500">*</span>
          </Label>
          <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start border-gray-300 text-left font-normal",
                  !startDate && "text-muted-foreground",
                )}
              >
                <Calendar className="mr-2" size={12} />
                {startDate
                  ? format(startDate, "dd-MM-yyyy HH:mm")
                  : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-white p-0" align="start">
              <SimplifiedCalendar
                selected={startDate}
                timeValue={startTimeValue}
                onSelect={setStartDate}
                onTimeChange={setStartTimeValue}
                onClose={() => {
                  setStartDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* To Label */}
        <div className="flex items-center justify-center px-2 pb-2">
          <span className="text-sm">to</span>
        </div>

        {/* End Date */}
        <div className="flex min-w-[180px] flex-1 flex-col gap-2">
          <Label htmlFor="end-date" className="text-sm font-medium">
            End Date <span className="text-red-500">*</span>
          </Label>
          <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start border-gray-300 text-left font-normal",
                  !endDate && "text-muted-foreground",
                )}
              >
                <Calendar className="mr-2" size={12} />
                {endDate ? format(endDate, "dd-MM-yyyy HH:mm") : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-white p-0" align="start">
              <SimplifiedCalendar
                selected={endDate}
                timeValue={endTimeValue}
                onSelect={setEndDate}
                onTimeChange={setEndTimeValue}
                onClose={() => {
                  setEndDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Meter Model */}
        <div className="flex min-w-[120px] flex-1 flex-col gap-2">
          <Label className="text-sm font-medium">
            Meter Model <span className="text-red-500">*</span>
          </Label>
          <DropdownMenu
            open={meterModelDropdownOpen}
            onOpenChange={setMeterModelDropdownOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-gray-300"
              >
                {getMeterModelDisplayText()}
                <ChevronDown size={12} className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="max-h-60 w-(--radix-dropdown-menu-trigger-width) min-w-40 overflow-y-auto"
              align="start"
            >
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                onClick={() => handleMeterModelChange("Select All")}
                className="flex cursor-pointer items-center justify-between gap-4 px-3 py-2 hover:bg-gray-50"
              >
                <span className="flex-1 text-left text-sm">Select All</span>
                <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                  {selectedMeterModels.length === meterModels.length ? (
                    <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-green-100">
                      <Check size={12} className="text-green-600" />
                    </div>
                  ) : (
                    <Square size={14} className="text-gray-400" />
                  )}
                </div>
              </DropdownMenuItem>
              <div className="border-[0.1px] border-t border-gray-300" />
              {meterModels.map((model) => (
                <div key={model}>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => handleMeterModelChange(model)}
                    className="flex cursor-pointer items-center justify-between gap-4 px-3 py-2 hover:bg-gray-50"
                  >
                    <span className="flex-1 text-left text-sm">{model}</span>
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                      {selectedMeterModels.includes(model) ? (
                        <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-green-100">
                          <Check size={12} className="text-green-600" />
                        </div>
                      ) : (
                        <Square size={14} className="text-gray-400" />
                      )}
                    </div>
                  </DropdownMenuItem>
                  <div className="border-[0.1px] border-t border-gray-300" />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Meter No */}
        <div className="flex min-w-[140px] flex-1 flex-col gap-2">
          <Label htmlFor="meter-no" className="text-sm font-medium">
            Meter No. <span className="text-red-500">*</span>
          </Label>
          <Input
            id="meter-no"
            placeholder="622456789012"
            value={meterNo}
            onChange={(e) => setMeterNo(e.target.value)}
            className="w-full border-gray-300 focus:border-[#161CCA]/30 focus:ring-[#161CCA]/50"
          />
        </div>

        {/* Events Type */}
        <div className="flex min-w-40 flex-1 flex-col gap-2">
          <Label className="text-sm font-medium">
            Profile <span className="text-red-500">*</span>
          </Label>
          <DropdownMenu
            open={eventTypeDropdownOpen}
            onOpenChange={setEventTypeDropdownOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-gray-300"
              >
                {getEventTypeDisplayText()}
                <ChevronDown size={12} className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="max-h-60 w-(--radix-dropdown-menu-trigger-width) min-w-40 overflow-y-auto"
              align="start"
            >
              {eventTypes.map((type) => (
                <div key={type}>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => handleEventTypeChange(type)}
                    className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-50"
                  >
                    <span className="text-sm">{type}</span>
                    <div className="flex h-4 w-4 items-center justify-center">
                      {selectedEventTypes.includes(type) ? (
                        <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-green-100">
                          <Check size={12} className="text-green-600" />
                        </div>
                      ) : (
                        <Square size={14} className="text-gray-400" />
                      )}
                    </div>
                  </DropdownMenuItem>
                  <div className="border-[0.1px] border-t border-gray-300" />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Run Button */}
        <div className="flex items-end">
          <Button
            className="bg-[#161CCA] px-8 font-medium text-white hover:bg-[#161CCA]/90"
            onClick={handleRun}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="border-gray-100 bg-transparent px-6 py-4 shadow-none">
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative w-full md:w-[300px]">
                <Search
                  size={14}
                  className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400"
                />
                <Input
                  type="text"
                  placeholder="Search by name, ID, cont..."
                  className="h-10 w-full border-gray-300 pl-10 focus:border-[#161CCA]/30 focus:ring-[#161CCA]/50"
                />
              </div>
              <FilterControl sections={filterSections} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 w-full cursor-pointer gap-2 border-gray-300 sm:w-auto"
                  >
                    <ArrowUpDown className="text-gray-500" size={14} />
                    <span className="hidden text-gray-800 sm:inline">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer text-sm hover:bg-gray-100">
                    Ascending - Descending
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-sm hover:bg-gray-100">
                    Descending - Ascending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader className="bg-transparent">
            <TableRow
              className="border-b border-gray-200 hover:bg-[hsla(0,0%,20%,0.1)]"
              style={{ backgroundColor: "hsla(0, 0%, 97%)" }}
            >
              {currentHeaders.map((header: string, index: number) => (
                <TableHead
                  key={index}
                  className="px-4 py-3 text-sm font-medium text-nowrap text-gray-900"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length > 0 ? (
              tableData
                .slice(
                  (currentPage - 1) * rowsPerPage,
                  currentPage * rowsPerPage,
                )
                .map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="p-4 text-sm text-gray-900">
                      {rowIndex + 1 + (currentPage - 1) * rowsPerPage}
                    </TableCell>
                    {Object.keys(row)
                      .slice(1)
                      .map((key, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className="px-4 py-3 text-sm text-nowrap text-gray-900"
                        >
                          {row[key]}
                        </TableCell>
                      ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={currentHeaders.length}
                  className="py-8 text-center text-sm text-gray-500"
                >
                  {"No data available. Click to 'Search' fetch profiles."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalItems={tableData.length}
        pageSize={rowsPerPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
