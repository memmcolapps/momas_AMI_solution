"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SquareArrowOutUpRight, Check, ChevronDown } from "lucide-react";
import { ContentHeader } from "@/components/ui/content_header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Events from "@/components/profile-events/events";
import Profile from "@/components/profile-events/profile";

type ExportFormat = "CSV" | "XLSX" | "PDF" | null;

export default function HesProfileEvents() {
  const [selectedExportFormat, setSelectedExportFormat] =
    useState<ExportFormat>(null);

  const handleExportFormatSelect = (format: ExportFormat) => {
    setSelectedExportFormat(format);
    console.log(`Exporting as ${format}...`);

    switch (format) {
      case "CSV":
        break;
      case "XLSX":
        break;
      case "PDF":
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-screen overflow-x-hidden bg-transparent p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <ContentHeader
          title="Profile and Events"
          description="Access detailed profiles and event logs from your meter."
        />

        {/* Export Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className='h-12 w-34 dark:border-[#161CCA] text-[#161CCA] py-4'
            >
              <SquareArrowOutUpRight
                size={14}
                strokeWidth={2.3}
                className="text-[#161CCA]"
              />
              <span className="text-sm font-medium">Export</span>
              <ChevronDown size={14} className="text-[#161CCA]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[140px] border border-gray-200 bg-white"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => handleExportFormatSelect("CSV")}
              className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-50"
            >
              <span className="text-sm">CSV</span>
              {selectedExportFormat === "CSV" && (
                <Check color="#4CAF50" size={10} className="text-black" />
              )}
            </DropdownMenuItem>

            <div className="mx-2 border-t border-dotted border-[#4ECDC4]" />

            <DropdownMenuItem
              onClick={() => handleExportFormatSelect("XLSX")}
              className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-50"
            >
              <span className="text-sm">XLSX</span>
              {selectedExportFormat === "XLSX" && (
                <Check color="#4CAF50" size={10} className="text-black" />
              )}
            </DropdownMenuItem>

            <div className="mx-2 border-t border-dotted border-[#4ECDC4]" />

            <DropdownMenuItem
              onClick={() => handleExportFormatSelect("PDF")}
              className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-50"
            >
              <span className="text-sm">PDF</span>
              {selectedExportFormat === "PDF" && (
                <Check color="#4CAF50" size={10} className="text-black" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs Card */}
      <Card className="mb-4 border-none bg-transparent p-4 shadow-none">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex justify-between pb-5 items-center">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <TabsList style={{ border: "2px solid #161CCA" }} className="h-12">
                <TabsTrigger
                  value="profile"
                  className="cursor-pointer w-3xs py-2 data-[state=active]:bg-[#161CCA] data-[state=active]:text-white"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="cursor-pointer w-3xs py-2 data-[state=active]:bg-[#161CCA] data-[state=active]:text-white"
                >
                  Events
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex gap-5 items-center mb-2">
              <div className="flex min-w-[140px] flex-1 flex-col gap-2">
                <Label htmlFor="hierarchy" className="text-sm font-medium">
                  Hierarchy <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="hierarchy"
                  placeholder="Business Unit"
                  className="w-full border-gray-300 focus:border-[#161CCA]/30 focus:ring-[#161CCA]/50"
                />
                </div>

                <div className="flex min-w-[140px] flex-1 flex-col gap-2">
                  <Label htmlFor="unit" className="text-sm font-medium">
                    Unit <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="unit"
                    placeholder="Ojoo"
                    className="w-full border-gray-300 focus:border-[#161CCA]/30 focus:ring-[#161CCA]/50"
                  />
              </div>
            </div>
          </div>
          <TabsContent value="profile" className="overflow-x-hidden">
            <Card className="min-h-[calc(100vh-300px)] border-none bg-transparent shadow-none">
              <Profile />
            </Card>
          </TabsContent>

          <TabsContent value="events" className="overflow-x-hidden">
            <Card className="min-h-[calc(100vh-300px)] border-none bg-transparent shadow-none">
              <Events />
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
