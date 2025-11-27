"use client";

import { Button } from "@/components/ui/button";
import {
  BanIcon,
  CircleCheck,
  Eye,
  MoreVertical,
  SendIcon,
  Settings2,
} from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Meter } from "@/components/meter-remote-config/dialog/configure-apn-dialog";
import { FilterControl } from "@/components/meter-management/filterSelect";
import ConfigureAPNDialog from "@/components/meter-remote-config/dialog/configure-apn-dialog";
import ConfigureCTVTRatioDialog from "@/components/meter-remote-config/dialog/configure-radio-dialog";
import ChangeRelayModeDialog from "@/components/meter-remote-config/dialog/change-relay-mode";
import SetDateTimeDialog from "@/components/meter-remote-config/dialog/set-date-time-dialog";
import ConfigureIPDialog from "@/components/meter-remote-config/dialog/configure-ip-dialog";
import ViewDetailsDialog from "@/components/meter-remote-config/dialog/view-details-dialog";
import OfflineDialog from "@/components/meter-remote-config/dialog/offline-meter-dialog";
import { ContentHeader } from "@/components/ui/content_header";
import { PaginationControls } from "@/components/ui/pagination_controls";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Define the possible dialog types
type DialogType = "apn" | "ctvt" | "relay" | "datetime" | "ip" | "viewDetails";

// Define filter sections
const filterSections = [
  {
    title: "Meter Class",
    options: [
      { label: "Single Phase", id: "singlePhase" },
      { label: "Three Phase", id: "threePhase" },
      { label: "MD", id: "md" },
    ],
  },
  {
    title: "Meter Category",
    options: [
      { label: "Prepaid", id: "prepaid" },
      { label: "Postpaid", id: "postpaid" },
    ],
  },
  {
    title: "Status",
    options: [
      { label: "Online", id: "online" },
      { label: "Offline", id: "offline" },
    ],
  },
];

// Initial meter data
const initialMeterData: Meter[] = [
  {
    sN: "01",
    meterNumber: "61245269523",
    simNo: "89000497699707079",
    businessHub: "ljeun",
    class: "MD",
    category: "Prepaid",
    manufacturer: "Momas",
    model: "MX-300",
    status: "Online",
    region: "Ogun",
    serviceCenter: "ljeun",
    feeder: "ljeun",
    transformer: "Olowotedo",
    lastSync: "01:00 am",
  },
  {
    sN: "02",
    meterNumber: "61245269523",
    simNo: "89000497699707079",
    businessHub: "ljeun",
    class: "Single Phase",
    category: "Prepaid",
    manufacturer: "Momas",
    model: "MX-300",
    status: "Online",
    region: "Ogun",
    serviceCenter: "ljeun",
    feeder: "ljeun",
    transformer: "Olowotedo",
    lastSync: "01:00 am",
  },
  {
    sN: "03",
    meterNumber: "61245269523",
    simNo: "89000497699707079",
    businessHub: "ljeun",
    class: "Three Phase",
    category: "Prepaid",
    manufacturer: "Momas",
    model: "MX-300",
    status: "Offline",
    region: "Ogun",
    serviceCenter: "ljeun",
    feeder: "ljeun",
    transformer: "Olowotedo",
    lastSync: "01:00 am",
  },
  {
    sN: "04",
    meterNumber: "61245269523",
    simNo: "89000497699707079",
    businessHub: "ljeun",
    class: "MD",
    category: "Postpaid",
    manufacturer: "Momas",
    model: "MX-300",
    status: "Offline",
    region: "Ogun",
    serviceCenter: "ljeun",
    feeder: "ljeun",
    transformer: "Olowotedo",
    lastSync: "01:00 am",
  },
  {
    sN: "05",
    meterNumber: "61245269523",
    simNo: "89000497699707079",
    businessHub: "ljeun",
    class: "MD",
    category: "Postpaid",
    manufacturer: "Momas",
    model: "MX-300",
    status: "Online",
    region: "Ogun",
    serviceCenter: "ljeun",
    feeder: "ljeun",
    transformer: "Olowotedo",
    lastSync: "01:00 am",
  },
  {
    sN: "06",
    meterNumber: "61245269523",
    simNo: "89000497699707079",
    businessHub: "ljeun",
    class: "MD",
    category: "Postpaid",
    manufacturer: "Momas",
    model: "MX-300",
    status: "Offline",
    region: "Ogun",
    serviceCenter: "ljeun",
    feeder: "ljeun",
    transformer: "Olowotedo",
    lastSync: "01:00 am",
  },
  {
    sN: "07",
    meterNumber: "61245269523",
    simNo: "89000497699707079",
    businessHub: "ljeun",
    class: "MD",
    category: "Postpaid",
    manufacturer: "Momas",
    model: "MX-300",
    status: "Offline",
    region: "Ogun",
    serviceCenter: "ljeun",
    feeder: "ljeun",
    transformer: "Olowotedo",
    lastSync: "01:00 am",
  },
  {
    sN: "08",
    meterNumber: "61245269523",
    simNo: "89000497699707079",
    businessHub: "ljeun",
    class: "MD",
    category: "Postpaid",
    manufacturer: "Momas",
    model: "MX-300",
    status: "Online",
    region: "Ogun",
    serviceCenter: "ljeun",
    feeder: "ljeun",
    transformer: "Olowotedo",
    lastSync: "01:00 am",
  },
  {
    sN: "09",
    meterNumber: "61245269523",
    simNo: "89000497699707079",
    businessHub: "ljeun",
    class: "MD",
    category: "Postpaid",
    manufacturer: "Momas",
    model: "MX-300",
    status: "Online",
    region: "Ogun",
    serviceCenter: "ljeun",
    feeder: "ljeun",
    transformer: "Olowotedo",
    lastSync: "01:00 am",
  },
  {
    sN: "10",
    meterNumber: "61245269523",
    simNo: "89000497699707079",
    businessHub: "ljeun",
    class: "MD",
    category: "Postpaid",
    manufacturer: "Momas",
    model: "MX-300",
    status: "Online",
    region: "Ogun",
    serviceCenter: "ljeun",
    feeder: "ljeun",
    transformer: "Olowotedo",
    lastSync: "01:00 am",
  },
];

export default function MeterRemoteConfigPage() {
  const [selectedMeter, setSelectedMeter] = useState<Meter | undefined>(
    undefined,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType | null>(null);
  const [token, setToken] = useState("");
  const [meterToTokenize, setMeterToTokenize] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Meter;
    direction: "asc" | "desc";
  }>({ key: "sN", direction: "asc" });
  const [selectedMeters, setSelectedMeters] = useState<string[]>([]);
  const [selectedConfigOption, setSelectedConfigOption] =
    useState<DialogType | null>(null);
  const [showOfflineDialog, setShowOfflineDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10);
  const [meterData] = useState<Meter[]>(initialMeterData);

  const [modifiedData, setModifiedData] = useState<Map<string, Meter>>(
    new Map(),
  );
  const [selectedRow, setSelectedRow] = useState<Meter | null>(null);

  const handlePageSizeChange = () => {
    console.log("Yea");
  };

  const handleConfigureAction = (type: DialogType) => {
    if (selectedMeters.length === 0) {
      return;
    }

    const offlineMeters = meterData.filter(
      (m) => selectedMeters.includes(m.sN) && m.status === "Offline",
    );
    if (offlineMeters.length > 0) {
      setShowOfflineDialog(true);
      setIsDialogOpen(false);
    } else {
      // For now, we'll configure the first selected meter.
      // A more complex implementation would handle bulk configurations.
      const meterToConfigure = meterData.find(
        (m) => m.sN === selectedMeters[0],
      );
      if (meterToConfigure) {
        setSelectedMeter(meterToConfigure);
        setDialogType(type);
        setIsDialogOpen(true);
        setSelectedConfigOption(type);
      }
    }
  };

  const handleViewDetails = (meter: Meter) => {
    setSelectedMeter(meter);
    setDialogType("viewDetails");
    setIsDialogOpen(true);
    setShowOfflineDialog(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedMeter(undefined);
    setDialogType(null);
    setShowOfflineDialog(false);
    setSelectedConfigOption(null);
  };

  // Apply search filter
  const filteredData = meterData.filter((meter) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      meter.sN.toLowerCase().includes(searchLower) ||
      meter.meterNumber.toLowerCase().includes(searchLower) ||
      meter.simNo.toLowerCase().includes(searchLower) ||
      meter.businessHub.toLowerCase().includes(searchLower) ||
      meter.class.toLowerCase().includes(searchLower) ||
      meter.category.toLowerCase().includes(searchLower) ||
      meter.manufacturer.toLowerCase().includes(searchLower) ||
      meter.model.toLowerCase().includes(searchLower) ||
      meter.status.toLowerCase().includes(searchLower) ||
      meter.region.toLowerCase().includes(searchLower) ||
      meter.serviceCenter.toLowerCase().includes(searchLower) ||
      meter.feeder.toLowerCase().includes(searchLower) ||
      meter.transformer.toLowerCase().includes(searchLower) ||
      meter.lastSync.toLowerCase().includes(searchLower)
    );
  });

  // Apply sorting
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  const handleTokenSubmit = () => {
    console.log(`Sending token: ${token} to meter: ${meterToTokenize}`);
    toast.success(`Successfully sent token to meter ${meterToTokenize}`);

    setToken("");
    setMeterToTokenize(null);
    setIsTokenDialogOpen(false);
  };

  // Calculate paginated data
  const totalData = sortedData.length;
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleSortChange = (key: keyof Meter, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const toggleMeterSelection = (sN: string) => {
    setSelectedMeters((prev) =>
      prev.includes(sN) ? prev.filter((id) => id !== sN) : [...prev, sN],
    );
  };

  const toggleSelectAll = () => {
    if (
      selectedMeters.length === paginatedData.length &&
      paginatedData.length > 0
    ) {
      setSelectedMeters([]);
    } else {
      setSelectedMeters(paginatedData.map((meter) => meter.sN));
    }
  };

  const handleSetActiveFilters = (
    filters: Record<string, string | boolean>,
  ) => {
    console.log("Filters applied:", filters);
    setCurrentPage(1);
  };

  const handleConnectRelay = (sN: string) => {
    const meterData = paginatedData.find((item) => item.sN === sN);

    if (meterData) {
      const updatedMeter = {
        ...meterData,
        status: "Online",
        relayControl: "Connected",
      };

      setModifiedData((prev) => {
        const newMap = new Map(prev);
        newMap.set(sN, updatedMeter);
        return newMap;
      });

      if (selectedRow?.sN === sN) {
        setSelectedRow(updatedMeter);
      }

      toast.success(`Successfully connected relay for meter ${sN}`);
    }
  };

  const handleDisconnectRelay = (sN: string) => {
    const meterData = paginatedData.find((item) => item.sN === sN);

    if (meterData) {
      const updatedMeter = {
        ...meterData,
        status: "Offline",
        relayControl: "Disconnected",
      };

      setModifiedData((prev) => {
        const newMap = new Map(prev);
        newMap.set(sN, updatedMeter);
        return newMap;
      });

      if (selectedRow?.sN === sN) {
        setSelectedRow(updatedMeter);
      }

      toast.error(`Successfully disconnected relay for meter ${sN}`);
    }
  };

  const handleSendToken = (sN: string) => {
    setMeterToTokenize(sN);
    setIsTokenDialogOpen(true);
  };

  const isConfigureButtonDisabled = selectedMeters.length === 0;

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-screen-4xl space-y-6">
        <div className="flex items-center justify-between">
          <ContentHeader
            title="Meter Remote Configuration"
            description="Enable remote setup and management of meter settings for efficient monitoring."
          />
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex w-full cursor-pointer items-center gap-2 border bg-[#161CCA] font-medium text-white md:w-auto"
                  variant="outline"
                  size="lg"
                  disabled={isConfigureButtonDisabled}
                >
                  <Settings2
                    size={14}
                    strokeWidth={2.3}
                    className="h-4 w-4 text-white"
                  />
                  <span className="text-sm md:text-base">Configure Meter</span>
                  <ChevronDown size={14} className="h-4 w-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem
                  onClick={() => handleConfigureAction("ip")}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <span className="py-2">Configure IP Address</span>
                  {selectedConfigOption === "ip" && (
                    <span className="text-black">✓</span>
                  )}
                </DropdownMenuItem>
                <hr className="border-gray-200" />
                <DropdownMenuItem
                  onClick={() => handleConfigureAction("apn")}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <span className="py-2">Configure APN</span>
                  {selectedConfigOption === "apn" && (
                    <span className="text-black">✓</span>
                  )}
                </DropdownMenuItem>
                <hr className="border-gray-200" />
                <DropdownMenuItem
                  onClick={() => handleConfigureAction("ctvt")}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <span className="py-2">Configure CT & VT Ratio</span>
                  {selectedConfigOption === "ctvt" && (
                    <span className="text-black">✓</span>
                  )}
                </DropdownMenuItem>
                <hr className="border-gray-200" />
                <DropdownMenuItem
                  onClick={() => handleConfigureAction("relay")}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <span className="py-2">Change Relay Mode</span>
                  {selectedConfigOption === "relay" && (
                    <span className="text-black">✓</span>
                  )}
                </DropdownMenuItem>
                <hr className="border-gray-200" />
                <DropdownMenuItem
                  onClick={() => handleConfigureAction("datetime")}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <span className="py-2">Set Date and Time</span>
                  {selectedConfigOption === "datetime" && (
                    <span className="text-black">✓</span>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Card className="border-none bg-transparent p-4 shadow-none">
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative w-full md:w-[300px]">
                <Search
                  size={14}
                  className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400"
                />
                <Input
                  type="text"
                  placeholder="Search by meter no., model.,hierarchy."
                  className="w-full border-gray-300 pl-10 focus:border-[#161CCA]/30 focus:ring-[#161CCA]/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <FilterControl
                sections={filterSections}
                onApply={handleSetActiveFilters}
                onReset={() => handleSetActiveFilters({})}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer gap-2 border-gray-300 sm:w-auto"
                  >
                    <ArrowUpDown className="text-gray-500" size={14} />
                    <span className="hidden text-gray-800 sm:inline">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  <DropdownMenuItem
                    onClick={() => handleSortChange("sN", "asc")}
                    className="cursor-pointer text-sm hover:bg-gray-100"
                  >
                    S/N (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSortChange("sN", "desc")}
                    className="cursor-pointer text-sm hover:bg-gray-100"
                  >
                    S/N (Z-A)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSortChange("meterNumber", "asc")}
                    className="cursor-pointer text-sm hover:bg-gray-100"
                  >
                    Meter Number (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSortChange("meterNumber", "desc")}
                    className="cursor-pointer text-sm hover:bg-gray-100"
                  >
                    Meter Number (Z-A)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSortChange("status", "asc")}
                    className="cursor-pointer text-sm hover:bg-gray-100"
                  >
                    Status (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleSortChange("status", "desc")}
                    className="cursor-pointer text-sm hover:bg-gray-100"
                  >
                    Status (Z-A)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>

        <Card className="h-4/6 rounded-md border-none shadow-none">
          <Table>
            <TableHeader className="bg-transparent">
              <TableRow
                className="border-b border-gray-200 hover:bg-[hsla(0,0%,20%,0.1)]"
                style={{ backgroundColor: "hsla(0, 0%, 97%)" }}
              >
                <TableHead className="w-[70px] p-2 text-left text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={
                        selectedMeters.length === paginatedData.length &&
                        paginatedData.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      className="border-gray-300"
                    />
                    <span>S/N</span>
                  </div>
                </TableHead>
                <TableHead className="p-2 text-left text-sm font-medium text-gray-600">
                  Meter Number
                </TableHead>
                <TableHead className="p-2 text-left text-sm font-medium text-gray-600">
                  SIM No
                </TableHead>
                <TableHead className="p-2 text-left text-sm font-medium text-gray-600">
                  Business Hub
                </TableHead>
                <TableHead className="p-2 text-left text-sm font-medium text-gray-600">
                  Class
                </TableHead>
                <TableHead className="p-2 text-left text-sm font-medium text-gray-600">
                  Category
                </TableHead>
                <TableHead className="p-2 text-left text-sm font-medium text-gray-600">
                  Manufacturer
                </TableHead>
                <TableHead className="p-2 text-left text-sm font-medium text-gray-600">
                  Model
                </TableHead>
                <TableHead className="p-2 text-left text-sm font-medium text-gray-600">
                  Status
                </TableHead>
                <TableHead className="p-2 text-left text-sm font-medium text-gray-600">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="h-24 text-center text-sm text-gray-500"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((meter, index) => (
                  <TableRow
                    key={meter.sN}
                    className="cursor-pointer border-gray-100 hover:bg-gray-50"
                  >
                    <TableCell className="p-2 text-sm text-gray-800">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedMeters.includes(meter.sN)}
                          onCheckedChange={() => toggleMeterSelection(meter.sN)}
                          className="border-gray-300"
                        />
                        <span>
                          {index + 1 + (currentPage - 1) * rowsPerPage}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="p-2 text-sm text-gray-800">
                      {meter.meterNumber}
                    </TableCell>
                    <TableCell className="p-2 text-sm text-gray-800">
                      {meter.simNo}
                    </TableCell>
                    <TableCell className="p-2 text-sm text-gray-800">
                      {meter.businessHub}
                    </TableCell>
                    <TableCell className="p-2 text-sm text-gray-800">
                      {meter.class}
                    </TableCell>
                    <TableCell className="p-2 text-sm text-gray-800">
                      {meter.category}
                    </TableCell>
                    <TableCell className="p-2 text-sm text-gray-800">
                      {meter.manufacturer}
                    </TableCell>
                    <TableCell className="p-2 text-sm text-gray-800">
                      {meter.model}
                    </TableCell>
                    <TableCell className="p-2 text-sm">
                      <span
                        className={`rounded px-2 py-1 ${
                          meter.status === "Online"
                            ? "rounded-full bg-[#E9FBF0] text-[#059E40]"
                            : "rounded-full bg-[#FBE9E9] text-[#F50202]"
                        }`}
                      >
                        {meter.status}
                      </span>
                    </TableCell>
                    <TableCell className="p-2 text-sm text-gray-800">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="default"
                            size="sm"
                            className="cursor-pointer border-gray-200 focus:ring-gray-500/0"
                            onClick={() => setSelectedMeter(meter)}
                          >
                            <MoreVertical
                              size={12}
                              className="border-gray-200 text-gray-500"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onSelect={() => handleViewDetails(meter)}
                          >
                            <div className="flex w-full items-center gap-2">
                              <Eye size={14} className="mr-2" />
                              <span className="cursor-pointer py-2">
                                View Meter
                              </span>
                            </div>
                          </DropdownMenuItem>
                          <hr className="border-gray-200" />
                          {meter.status === "Offline" ? (
                            <DropdownMenuItem
                              className="cursor-pointer py-3"
                              onClick={() => handleConnectRelay(meter.sN)}
                            >
                              <CircleCheck size={14} className="mr-2" /> Connect
                              Relay
                            </DropdownMenuItem>
                          ) : (
                            <>
                              <DropdownMenuItem
                                className="cursor-pointer py-3"
                                onClick={() => handleDisconnectRelay(meter.sN)}
                              >
                                <BanIcon size={14} className="mr-2" />{" "}
                                Disconnect Relay
                              </DropdownMenuItem>
                              <hr className="border-gray-200" />

                              <DropdownMenuItem
                                className="cursor-pointer py-3"
                                onClick={() => handleSendToken(meter.sN)}
                              >
                                <SendIcon size={14} className="mr-2" /> Send
                                Token
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <PaginationControls
            currentPage={currentPage}
            totalItems={totalData}
            pageSize={rowsPerPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </Card>

        {isDialogOpen && dialogType === "apn" && selectedMeter && (
          <ConfigureAPNDialog
            isOpen={true}
            onClose={closeDialog}
            meter={selectedMeter}
          />
        )}
        {isDialogOpen && dialogType === "ctvt" && selectedMeter && (
          <ConfigureCTVTRatioDialog
            isOpen={true}
            onClose={closeDialog}
            meter={selectedMeter}
          />
        )}
        {isDialogOpen && dialogType === "relay" && selectedMeter && (
          <ChangeRelayModeDialog
            isOpen={true}
            onClose={closeDialog}
            meter={selectedMeter}
          />
        )}
        {isDialogOpen && dialogType === "datetime" && selectedMeter && (
          <SetDateTimeDialog
            isOpen={true}
            onClose={closeDialog}
            meter={selectedMeter}
          />
        )}
        {isDialogOpen && dialogType === "ip" && selectedMeter && (
          <ConfigureIPDialog
            isOpen={true}
            onClose={closeDialog}
            meter={selectedMeter}
          />
        )}
        {isDialogOpen && dialogType === "viewDetails" && selectedMeter && (
          <ViewDetailsDialog
            isOpen={true}
            onClose={closeDialog}
            meter={selectedMeter}
          />
        )}
        {showOfflineDialog && (
          <OfflineDialog isOpen={true} onClose={closeDialog} />
        )}
      </div>
      {/* Send Token Dialog */}
      <Dialog open={isTokenDialogOpen} onOpenChange={setIsTokenDialogOpen}>
        <DialogContent className="h-fit w-full rounded-lg bg-white p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg">Send Token</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-sm">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="token">
                Token <span className="text-red-500">*</span>
              </Label>
              <input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter Token"
                className="rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-[#161CCA]/50 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between gap-2">
            <Button
              size={"md"}
              variant="outline"
              className="cursor-pointer border-[#161CCA] text-[#161CCA]"
              onClick={() => {
                setIsTokenDialogOpen(false);
                setToken("");
              }}
            >
              Cancel
            </Button>
            <Button
              size={"md"}
              className="cursor-pointer bg-[#161CCA] text-white"
              onClick={handleTokenSubmit}
              disabled={token.length === 0}
            >
              Proceed
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
