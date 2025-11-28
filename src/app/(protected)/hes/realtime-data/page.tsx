"use client";
import { FilterControl } from "@/components/meter-management/filterSelect";
import { Button } from "@/components/ui/button";
import { ContentHeader } from "@/components/ui/content_header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { FilterType } from "../data-collection-scheduler/page";
import { RealTimeDataTable } from "@/components/realtime-data/realtime-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    title: "Meter Type",
    options: [
      { label: "Prepaid", id: "prepaid" },
      { label: "Postpaid", id: "postPaid" },
    ],
  },
];

export default function RealtimeDataPage() {
  const [activeTab, setActiveTab] = useState("MD");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSetActiveFilters = (filters: FilterType) => {
    console.log("Filters applied:", filters);
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <ContentHeader
          title="Real Time data"
          description="Remotely read data directly from the meter in real time"
        />
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-12 w-34 border-[#161CCA] py-4 text-[#161CCA]"
          >
            <ExternalLink size={14} />
            Export
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between">
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

        <div className="mb-4 flex flex-col gap-4 md:flex-row">
          <FilterControl
            sections={filterSections}
            onApply={handleSetActiveFilters}
            onReset={() => handleSetActiveFilters({})}
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
      <RealTimeDataTable />
    </div>
  );
}
