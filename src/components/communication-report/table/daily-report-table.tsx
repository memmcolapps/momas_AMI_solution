/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationControls } from "@/components/ui/pagination_controls";
import { getStatusStyle } from "../statusStyle";

const data = [
  {
    sn: "01",
    meterNo: "62125656846",
    region: "Ogun",
    businessUnit: "Ibafo",
    serviceCenter: "Olowotedo",
    feeder: "Ijeun",
    time: "2025-07-28 00:00:00",
    status: "Offline",
  },
  {
    sn: "02",
    meterNo: "62125656846",
    region: "Ogun",
    businessUnit: "Ibafo",
    serviceCenter: "Olowotedo",
    feeder: "Ijeun",
    time: "2025-07-28 00:00:00",
    status: "Online",
  },
  {
    sn: "03",
    meterNo: "62125656846",
    region: "Ogun",
    businessUnit: "Ibafo",
    serviceCenter: "Olowotedo",
    feeder: "Ijeun",
    time: "2025-07-28 00:00:00",
    status: "Offline",
  },
  {
    sn: "04",
    meterNo: "62125656846",
    region: "Ogun",
    businessUnit: "Ibafo",
    serviceCenter: "Olowotedo",
    feeder: "Ijeun",
    time: "2025-07-28 00:00:00",
    status: "Online",
  },
  {
    sn: "05",
    meterNo: "62125656846",
    region: "Ogun",
    businessUnit: "Ibafo",
    serviceCenter: "Olowotedo",
    feeder: "Ijeun",
    time: "2025-07-28 00:00:00",
    status: "Offline",
  },
  {
    sn: "06",
    meterNo: "62125656846",
    region: "Ogun",
    businessUnit: "Ibafo",
    serviceCenter: "Olowotedo",
    feeder: "Ijeun",
    time: "2025-07-28 00:00:00",
    status: "Online",
  },
  {
    sn: "07",
    meterNo: "62125656846",
    region: "Ogun",
    businessUnit: "Ibafo",
    serviceCenter: "Olowotedo",
    feeder: "Ijeun",
    time: "2025-07-28 00:00:00",
    status: "Offline",
  },
  {
    sn: "08",
    meterNo: "62125656846",
    region: "Ogun",
    businessUnit: "Ibafo",
    serviceCenter: "Olowotedo",
    feeder: "Ijeun",
    time: "2025-07-28 00:00:00",
    status: "Online",
  },
  {
    sn: "09",
    meterNo: "62125656846",
    region: "Ogun",
    businessUnit: "Ibafo",
    serviceCenter: "Olowotedo",
    feeder: "Ijeun",
    time: "2025-07-28 00:00:00",
    status: "Offline",
  },
  {
    sn: "10",
    meterNo: "62125656846",
    region: "Ogun",
    businessUnit: "Ibafo",
    serviceCenter: "Olowotedo",
    feeder: "Ijeun",
    time: "2025-07-28 00:00:00",
    status: "Online",
  },
];

interface DailyReportTableProps {
  searchQuery?: string;
}

export function DailyReportTable({
  searchQuery = "",
}: DailyReportTableProps = {}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageSizeChange = (newPageSize: number) => {
    setRowsPerPage(newPageSize);
    setCurrentPage(1);
  };

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const searchLower = searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.meterNo.toLowerCase().includes(searchLower) ||
        item.region.toLowerCase().includes(searchLower) ||
        item.businessUnit.toLowerCase().includes(searchLower) ||
        item.serviceCenter.toLowerCase().includes(searchLower) ||
        item.feeder.toLowerCase().includes(searchLower),
    );
  }, [data, searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, rowsPerPage]);

  return (
    <div className="w-full overflow-x-auto rounded-md pt-5">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow
            className="border-b border-gray-200 hover:bg-[hsla(0,0%,20%,0.1)]"
            style={{ backgroundColor: "hsla(0, 0%, 97%)" }}
          >
            <TableHead>S/N</TableHead>
            <TableHead>Meter No.</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Business Unt</TableHead>
            <TableHead>Service Center</TableHead>
            <TableHead>Feeder</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row) => (
            <TableRow
              key={row.sn}
              className="h-[27px] cursor-pointer border-gray-100 hover:bg-gray-50"
            >
              <TableCell className="whitespace-nowrap">{row.sn}</TableCell>
              <TableCell className="whitespace-nowrap">{row.meterNo}</TableCell>
              <TableCell className="whitespace-nowrap">{row.region}</TableCell>
              <TableCell className="whitespace-nowrap">
                {row.businessUnit}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {row.serviceCenter}
              </TableCell>
              <TableCell className="whitespace-nowrap">{row.feeder}</TableCell>
              <TableCell className="whitespace-nowrap">{row.time}</TableCell>
              <TableCell>
                <span className={getStatusStyle(row.status ?? "")}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4">
        <PaginationControls
          currentPage={currentPage}
          totalItems={filteredData.length}
          pageSize={rowsPerPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}
