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
  Calendar as CalendarIcon,
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

interface EventData {
  id: number;
  sn: string;
  meterNo: string;
  feeder: string;
  time: string;
  eventType: string;
  event: string;
}

// Event data organized by event type
const eventDataByType: Record<string, string[]> = {
  "Standard Event Log": [
    "Daylight Savings",
    "Power Down",
    "Power Up",
    "Clock Adjusted",
    "Time Sync Failed",
    "Configuration Changed"
  ],
  "Relay Control Log": [
    "Relay Opened",
    "Relay Closed",
    "Remote Disconnect",
    "Remote Reconnect",
    "Manual Override",
    "Load Control Activated"
  ],
  "Power Quality Log": [
    "Voltage Sag Detected",
    "Voltage Swell Detected",
    "Phase Loss",
    "Frequency Deviation",
    "Harmonic Distortion",
    "Power Factor Low"
  ],
  "Communication Log": [
    "Connection Established",
    "Connection Lost",
    "Data Transfer Failed",
    "Authentication Failed",
    "Timeout Error",
    "Protocol Mismatch"
  ],
  "Fraud Event Log": [
    "Tamper Detected",
    "Cover Opened",
    "Magnetic Interference",
    "Reverse Energy Flow",
    "Neutral Disturbance",
    "Terminal Cover Removed"
  ],
  "Token Event Log": [
    "Token Accepted",
    "Token Rejected",
    "Credit Added",
    "Low Credit Warning",
    "Zero Credit",
    "Invalid Token Format"
  ]
};

const meterNumbers = [
  "621245698701",
  "621245698702",
  "621245698703",
  "621245698704",
  "621245698705",
  "621245698706"
];

const feeders = [
  "Ijeun Feeder 1",
  "Ijeun Feeder 2",
  "Ikeja Feeder 3",
  "Lekki Feeder 1",
  "Apapa Feeder 2",
  "Surulere Feeder 1"
];

const generateMockData = (eventTypes: string[]): EventData[] => {
  const data: EventData[] = [];
  let id = 1;

  eventTypes.forEach(eventType => {
    const events = eventDataByType[eventType] ?? [];
    
    // Generate data for each meter
    meterNumbers.forEach((meterNo, meterIndex) => {
      // Each meter gets 2-3 random events from this event type
      const numEvents = Math.floor(Math.random() * 2) + 2;
      
      for (let i = 0; i < numEvents; i++) {
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        const randomFeeder = feeders[meterIndex % feeders.length];
        
        // Generate random time within the last 30 days
        const randomDaysAgo = Math.floor(Math.random() * 30);
        const randomHour = Math.floor(Math.random() * 24);
        const randomMinute = Math.floor(Math.random() * 60);
        const date = new Date();
        date.setDate(date.getDate() - randomDaysAgo);
        date.setHours(randomHour, randomMinute);
        
        data.push({
          id: id++,
          sn: id.toString(),
          meterNo,
          feeder: randomFeeder,
          time: format(date, "yyyy-MM-dd HH:mm"),
          eventType,
          event: randomEvent
        });
      }
    });
  });

  // Sort by time (most recent first)
  return data.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
};

const eventTypes = [
  "Standard Event Log",
  "Relay Control Log",
  "Power Quality Log",
  "Communication Log",
  "Fraud Event Log",
  "Token Event Log",
];

// Meter models list
const meterModels = [
  "Model A100",
  "Model B200",
  "Model C300",
  "Model D400",
  "Model E500",
  "Model F600",
  "Model G700",
  "Model H800",
];


export default function Events() {
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTimeValue, setStartTimeValue] = useState<string>("00:00");
  const [endTimeValue, setEndTimeValue] = useState<string>("00:00");
  const [meterNo, setMeterNo] = useState("");
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedMeterModels, setSelectedMeterModels] = useState<string[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [tableData, setTableData] = useState<EventData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [eventTypeDropdownOpen, setEventTypeDropdownOpen] = useState(false);
  const [meterModelDropdownOpen, setMeterModelDropdownOpen] = useState(false);

  // Populate table with dummy data on component mount
  useEffect(() => {
    const initialData = generateMockData(eventTypes);
    setTableData(initialData);
  }, []);

  // Handle Event Type selection
  const handleEventTypeChange = (eventType: string) => {
    if (eventType === "Select All") {
      if (selectedEventTypes.length === eventTypes.length) {
        setSelectedEventTypes([]);
      } else {
        setSelectedEventTypes([...eventTypes]);
      }
    } else {
      setSelectedEventTypes((prev) => {
        if (prev.includes(eventType)) {
          return prev.filter((type) => type !== eventType);
        } else {
          return [...prev, eventType];
        }
      });
    }
  };

  // Handle Meter Model selection
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


  // Get display text for dropdowns
  const getEventTypeDisplayText = () => {
    if (selectedEventTypes.length === 0) return "Select Event Type";
    if (selectedEventTypes.length === 1) return selectedEventTypes[0];
    if (selectedEventTypes.length === eventTypes.length)
      return "All Event Types";
    return `${selectedEventTypes.length} Event Types`;
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
      selectedEvents,
    });

    // Generate mock data based on selected event types
    const typesToUse = selectedEventTypes.length > 0 ? selectedEventTypes : eventTypes;
    const generatedData = generateMockData(typesToUse);
    
    setTableData(generatedData);
    setCurrentPage(1); // Reset to first page
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
                <CalendarIcon className="mr-2" size={12} />
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
                <CalendarIcon className="mr-2" size={12} />
                {endDate
                  ? format(endDate, "dd-MM-yyyy HH:mm")
                  : "Select Date"}
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

        {/* Meter Model - Now Independent */}
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
              {/* Select All Option */}
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

              {/* Separator */}
              <div className="border-t border-[0.1px] border-gray-300" />

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
                  <div className="border-t border-[0.1px] border-gray-300" />
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
            Events Type <span className="text-red-500">*</span>
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
              {/* Select All Option */}
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                onClick={() => handleEventTypeChange("Select All")}
                className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-50"
              >
                <span className="text-sm">Select All</span>
                <div className="flex h-4 w-4 items-center justify-center">
                  {selectedEventTypes.length === eventTypes.length ? (
                    <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-green-100">
                      <Check size={12} className="text-green-600" />
                    </div>
                  ) : (
                    <Square size={14} className="text-gray-400" />
                  )}
                </div>
              </DropdownMenuItem>

              {/* Separator */}
              <div className="border-t border-[0.1px] border-gray-300" />

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
                  <div className="border-t border-[0.1px] border-gray-300" />
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
                  className="w-full h-10 border-gray-300 pl-10 focus:border-[#161CCA]/30 focus:ring-[#161CCA]/50"
                // value={searchTerm}
                // onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
              <FilterControl
                sections={filterSections}
              // onApply={handleSetActiveFilters}
              // onReset={() => handleSetActiveFilters({})}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-10 cursor-pointer gap-2 border-gray-300 sm:w-auto"
                  >
                    <ArrowUpDown className="text-gray-500" size={14} />
                    <span className="hidden text-gray-800 sm:inline">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    // onClick={handleSortChange}
                    className="cursor-pointer text-sm hover:bg-gray-100"
                  >
                    Ascending - Descending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    // onClick={handleSortChange}
                    className="cursor-pointer text-sm hover:bg-gray-100"
                  >
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
              <TableHead className="px-4 py-3 text-sm font-medium text-gray-900">
                S/N
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-gray-900">
                Meter No.
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-gray-900">
                Feeder
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-gray-900">
                Time
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-gray-900">
                Event Type
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-gray-900">
                Event
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length > 0 ? (
              tableData
                .slice(
                  (currentPage - 1) * rowsPerPage,
                  currentPage * rowsPerPage,
                )
                .map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 border-gray-100">
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      {index + 1 + (currentPage - 1) * rowsPerPage}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      {row.meterNo}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      {row.feeder}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      {row.time}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      {row.eventType}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">
                      {row.event}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
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