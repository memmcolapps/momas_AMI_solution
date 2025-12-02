"use client";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PaginationControls } from "@/components/ui/pagination_controls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  communicationReportMergedDummyData,
  type CommunicationReportData,
} from "@/components/profile-events/data/data";
import { getStatusStyle } from "../statusStyle";

interface CommunicationTableProps {
  searchQuery?: string;
  activeTab?: "MD" | "Non-MD";
  onMeterSelect?: (meterNumber: string) => void;
}

export function CommunicationTable({
  searchQuery = "",
  activeTab = "MD",
  // onMeterSelect,
}: CommunicationTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CommunicationReportData | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modifiedData, setModifiedData] = useState<
    Map<string, CommunicationReportData>
  >(new Map());

  const isLoading = false;

  // Filter data by activeTab (MD or Non-MD)
  const tabFilteredData = useMemo(() => {
    const baseData = communicationReportMergedDummyData.map((item) => {
      return modifiedData.get(item.serialNumber) ?? item;
    });

    if (activeTab === "MD") {
      return baseData.filter((item) => item.serialNumber.startsWith("SNMD"));
    } else {
      return baseData.filter((item) => item.serialNumber.startsWith("SNNMD"));
    }
  }, [activeTab, modifiedData]);

  // Apply search filter
  const filteredData = useMemo(() => {
    if (!searchQuery) return tabFilteredData;

    const query = searchQuery.toLowerCase();
    return tabFilteredData.filter(
      (item) =>
        item.meterNo.toLowerCase().includes(query) ??
        item.serialNumber.toLowerCase().includes(query) ??
        item.meterModel?.toLowerCase().includes(query) ??
        item.status?.toLowerCase().includes(query),
    );
  }, [tabFilteredData, searchQuery]);

  const totalItems = filteredData.length;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, rowsPerPage]);

  const handlePageSizeChange = (newPageSize: number) => {
    setRowsPerPage(newPageSize);
    setCurrentPage(1);
  };

  const handleRowClick = (rowData: CommunicationReportData) => {
    setSelectedRow(rowData);
    setDialogOpen(true);
  };

  const handleCheckboxChange = (serialNumber: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows((prev) => [...prev, serialNumber]);
    } else {
      setSelectedRows((prev) => prev.filter((sn) => sn !== serialNumber));
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows(paginatedData.map((row) => row.serialNumber));
    } else {
      setSelectedRows([]);
    }
  };

  const handleViewDetails = (row: CommunicationReportData) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const hasMeterModel =
    paginatedData.length > 0 && paginatedData[0]?.meterModel != null;

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow
            className="border-b border-gray-200 hover:bg-[hsla(0,0%,20%,0.1)]"
            style={{ backgroundColor: "hsla(0, 0%, 97%)" }}
          >
            <TableHead className="h-12 w-20 py-3 text-left">
              <Checkbox
                checked={
                  selectedRows.length === paginatedData.length &&
                  paginatedData.length > 0
                }
                className="mr-2 cursor-pointer border-gray-500"
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>S/N</TableHead>
            <TableHead>Meter No.</TableHead>
            {hasMeterModel && <TableHead>Meter Model</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead>Last Sync</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="py-4 text-center">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, index) => (
              <TableRow
                key={row.serialNumber}
                onClick={(e) => {
                  if (
                    (e.target as HTMLElement).tagName !== "INPUT" &&
                    (e.target as HTMLElement).tagName !== "BUTTON"
                  ) {
                    handleRowClick(row);
                  }
                }}
                className="cursor-pointer border-gray-100 hover:bg-gray-50"
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedRows.includes(row.serialNumber)}
                    className="mr-2 cursor-pointer"
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(row.serialNumber, Boolean(checked))
                    }
                  />
                </TableCell>
                <TableCell>
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{row.meterNo}</TableCell>
                {hasMeterModel && <TableCell>{row.meterModel}</TableCell>}
                <TableCell>
                  <span className={getStatusStyle(row.status ?? "")}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>{row.lastSync}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-0 focus:ring-gray-300/20"
                      >
                        <EllipsisVertical className="h-4 w-4" size={12} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full shadow-lg">
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(row)}
                        className="cursor-pointer py-2"
                      >
                        <Eye size={14} className="mr-2" />
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="p-4">
        <PaginationControls
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={rowsPerPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      {/* View Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="h-fit md:max-w-2xl rounded-lg bg-white p-12">
          <DialogHeader>
            <DialogTitle className="mb-2">View Details</DialogTitle>
          </DialogHeader>
          {selectedRow && (
            <div className="grid gap-4 py-4 px-4 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <Label>Meter Number:</Label>
                <span className="font-semibold">{selectedRow.meterNo}</span>
              </div>
              {selectedRow.meterModel && (
                <div className="grid grid-cols-2 gap-2">
                  <Label>Meter Model:</Label>
                  <span className="font-semibold">
                    {selectedRow.meterModel}
                  </span>
                </div>
              )}
                <div className="grid grid-cols-2 gap-2">
                <Label>Location:</Label>
                <span className="font-semibold">{selectedRow.location}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Label>Status:</Label>
                <span className="font-semibold">{selectedRow.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Label>Relay Control:</Label>
                <span className="font-semibold">
                  {selectedRow.relayControl}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Label>Last Sync:</Label>
                <span className="font-semibold">{selectedRow.lastSync}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}