"use client";
import { DailyReportDialog } from "@/components/communication-report/dialog/daily-dialog";
import { CommunicationTable } from "@/components/communication-report/table/commucation-report-table";
import { FilterControl } from "@/components/meter-management/filterSelect";
import { Button } from "@/components/ui/button";
import { ContentHeader } from "@/components/ui/content_header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpDown,
  ChevronDown,
  ExternalLink,
  NotepadText,
  Search,
} from "lucide-react";
import { useState } from "react";

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

export default function CommunicationReportPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [reportType, setReportType] = useState<"daily" | "monthly">("daily");
  const [activeTab, setActiveTab] = useState<"MD" | "Non-MD">("MD");
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenDialog = (type: "daily" | "monthly") => {
    setReportType(type);
    setOpenDialog(true);
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <ContentHeader
          title="Communication Report"
          description="View and analyze detailed historical data from your smart meter"
        />
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="cursor-pointer border-none bg-[#161CCA] py-6 font-medium text-white"
                variant="secondary"
                size="lg"
              >
                <NotepadText size={14} />
                Get Report
                <ChevronDown className="ml-2" size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full p-3 shadow-lg">
              <DropdownMenuItem
                onClick={() => handleOpenDialog("daily")}
                className="text-md cursor-pointer font-medium"
              >
                Daily Report
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOpenDialog("monthly")}
                className="text-md cursor-pointer font-medium"
              >
                Monthly Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="w-1/3">
        <Tabs
          defaultValue="MD"
          className="w-full px-4 py-2"
          onValueChange={(value) => setActiveTab(value as "MD" | "Non-MD")}
        >
          <div className="mb-4 flex items-center">
            <TabsList className="flex h-12 w-full overflow-hidden rounded-lg border-2 border-[#161CCA]">
              <TabsTrigger
                value="MD"
                className="flex-1 py-2 text-center font-medium data-[state=active]:bg-[#161CCA] data-[state=active]:text-white"
              >
                MD
              </TabsTrigger>

              <TabsTrigger
                value="Non-MD"
                className="flex-1 py-2 text-center font-medium data-[state=active]:bg-[#161CCA] data-[state=active]:text-white"
              >
                Non-MD
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      <div className="flex flex-row justify-between py-4">
        <div className="mb-4 flex flex-col gap-4 md:flex-row">
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
                    className="h-10 w-full cursor-pointer gap-2 border-gray-300 sm:w-auto"
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
        <Button
          variant="outline"
          className="h-10 w-34 border-[#161CCA] py-4 text-[#161CCA]"
        >
          <ExternalLink size={14} />
          Export
        </Button>
      </div>
      <CommunicationTable searchQuery={searchQuery} activeTab={activeTab} />
      <DailyReportDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        reportType={reportType}
      />
    </div>
  );
}
