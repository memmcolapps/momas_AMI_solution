'use client'

import { Eye, MoreVertical, Pencil } from "lucide-react";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "../ui/button";
import { PaginationControls } from "../ui/pagination_controls";
import type { MeterInventoryItem } from "@/types/meter-inventory";
import { AddMeterDialog } from "./dialog/add-edit-meter";
import { ViewMeterInfoDialog } from "./dialog/view-details";

const Meters = [
    {
        id: 1,
        sn: '01',
        name: 'Tokunbo Olamide',
        address: '40, olowotedo, mowe',
        meterNo: '6201021223',
        simNo: '8900049769797079',
        manu: 'Momas',
        class: 'MD',
        businessHub: 'Ijeun',
        feeder: 'Mowe',
        dss: 'Olowotedo'
    },
    {
        id: 2,
        sn: '02',
        name: 'Tokunbo Olamide',
        address: '40, olowotedo, mowe',
        meterNo: '6201021223',
        simNo: '8900049769797079',
        manu: 'Momas',
        class: 'MD',
        businessHub: 'Ijeun',
        feeder: 'Mowe',
        dss: 'Olowotedo'
    },
    {
        id: 3,
        sn: '03',
        name: 'Tokunbo Olamide',
        address: '40, olowotedo, mowe',
        meterNo: '6201021223',
        simNo: '8900049769797079',
        manu: 'Momas',
        class: 'MD',
        businessHub: 'Ijeun',
        feeder: 'Mowe',
        dss: 'Olowotedo'
    },
    {
        id: 4,
        sn: '04',
        name: 'Tokunbo Olamide',
        address: '40, olowotedo, mowe',
        meterNo: '6201021223',
        simNo: '8900049769797079',
        manu: 'Momas',
        class: 'MD',
        businessHub: 'Ijeun',
        feeder: 'Mowe',
        dss: 'Olowotedo'
    },
    {
        id: 5,
        sn: '05',
        name: 'Tokunbo Olamide',
        address: '40, olowotedo, mowe',
        meterNo: '6201021223',
        simNo: '8900049769797079',
        manu: 'Momas',
        class: 'MD',
        businessHub: 'Ijeun',
        feeder: 'Mowe',
        dss: 'Olowotedo'
    },
    {
        id: 6,
        sn: '06',
        name: 'Tokunbo Olamide',
        address: '40, olowotedo, mowe',
        meterNo: '6201021223',
        simNo: '8900049769797079',
        manu: 'Momas',
        class: 'MD',
        businessHub: 'Ijeun',
        feeder: 'Mowe',
        dss: 'Olowotedo'
    },
    {
        id: 7,
        sn: '07',
        name: 'Tokunbo Olamide',
        address: '40, olowotedo, mowe',
        meterNo: '6201021223',
        simNo: '8900049769797079',
        manu: 'Momas',
        class: 'MD',
        businessHub: 'Ijeun',
        feeder: 'Mowe',
        dss: 'Olowotedo'
    },
    {
        id: 8,
        sn: '08',
        name: 'Tokunbo Olamide',
        address: '40, olowotedo, mowe',
        meterNo: '6201021223',
        simNo: '8900049769797079',
        manu: 'Momas',
        class: 'MD',
        businessHub: 'Ijeun',
        feeder: 'Mowe',
        dss: 'Olowotedo'
    },
    {
        id: 9,
        sn: '09',
        name: 'Tokunbo Olamide',
        address: '40, olowotedo, mowe',
        meterNo: '6201021223',
        simNo: '8900049769797079',
        manu: 'Momas',
        class: 'MD',
        businessHub: 'Ijeun',
        feeder: 'Mowe',
        dss: 'Olowotedo'
    },
    {
        id: 10,
        sn: '10',
        name: 'Tokunbo Olamide',
        address: '40, olowotedo, mowe',
        meterNo: '6201021223',
        simNo: '8900049769797079',
        manu: 'Momas',
        class: 'MD',
        businessHub: 'Ijeun',
        feeder: 'Mowe',
        dss: 'Olowotedo'
    }
]


export default function MeterManagementTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [viewInfoDialogOpen, setViewInfoDialogOpen] = useState(false);
    const [selectedMeterForView, setSelectedMeterForView] = useState<typeof Meters[0] | null>(null);
    const [selectedMeterForEdit, setSelectedMeterForEdit] = useState<MeterInventoryItem | null>(null);
    const [isAddMeterDialogOpen, setIsAddMeterDialogOpen] = useState(false);
    const [selectedMeterIds, setSelectedMeterIds] = useState<number[]>([]);

    const totalData = Meters.length;

    const handleSaveMeter = (meter: MeterInventoryItem) => {
        setIsAddMeterDialogOpen(false);
        setSelectedMeterForEdit(null);
    };

    const handlePageSizeChange = () => {
        console.log('Yea')
    };

    const handleEditMeter = (meter: MeterInventoryItem) => {
        setSelectedMeterForEdit(meter);
        setIsAddMeterDialogOpen(true);
    };

    const handleViewDetails = (meter: typeof Meters[0]) => {
        setSelectedMeterForView(meter);
        setViewInfoDialogOpen(true);
    };

    const mapMeterInventoryToMeterData = (meter: typeof Meters[0]): MeterInventoryItem => ({
        ...meter,
        smartStatus: undefined,
        smartMeterInfo: undefined,
        status: "",
    } as MeterInventoryItem);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedMeterIds(Meters.map((meter) => meter.id));
        } else {
            setSelectedMeterIds([]);
        }
    };

    const handleSelectItem = (checked: boolean, meterId: number) => {
        if (checked) {
            setSelectedMeterIds((prev) => [...prev, meterId]);
        } else {
            setSelectedMeterIds((prev) => prev.filter((id) => id !== meterId));
        }
    };

    const isAllSelected = selectedMeterIds.length === Meters.length && Meters.length > 0;

    return (
    <div>
        <Card className="h-4/6 shadow-none rounded-md border-none">
            <Table>
                <TableHeader className="bg-transparent">
                    <TableRow
                        className="border-b border-gray-200 hover:bg-[hsla(0,0%,20%,0.1)]"
                        style={{ backgroundColor: "hsla(0, 0%, 97%)" }}
                    >
                        <TableHead className="w-20 h-12 px-4 py-3 text-left">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    className="border-gray-500"
                                    checked={isAllSelected}
                                    onCheckedChange={handleSelectAll}
                                    aria-label="Select all meters"
                                />
                                <Label
                                    htmlFor="select-all"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    S/N
                                </Label>
                            </div>
                        </TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Customer Address</TableHead>
                        <TableHead>Meter Number</TableHead>
                        <TableHead>SIM No</TableHead>
                        <TableHead>Manufacture</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Business Hub</TableHead>
                        <TableHead>Feeder</TableHead>
                        <TableHead>DSS</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Meters.map((meter) => (
                        <TableRow key={meter.id} className="hover:bg-gray-50 border-gray-100">
                            <TableCell className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        className="border-gray-500"
                                        checked={selectedMeterIds.includes(meter.id)}
                                        onCheckedChange={(checked) =>
                                            handleSelectItem(!!checked, meter.id)
                                        }
                                        aria-label={`Select meter ${meter.meterNo}`}
                                    />
                                    <span className="text-sm text-gray-900">
                                        {meter.sn}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>{meter.name}</TableCell>
                            <TableCell>{meter.address}</TableCell>
                            <TableCell>{meter.meterNo}</TableCell>
                            <TableCell>{meter.simNo}</TableCell>
                            <TableCell>{meter.manu}</TableCell>
                            <TableCell>{meter.class}</TableCell>
                            <TableCell>{meter.businessHub}</TableCell>
                            <TableCell>{meter.feeder}</TableCell>
                            <TableCell>{meter.dss}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 cursor-pointer p-0">
                                            <MoreVertical size={14} className="text-gray-500" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => handleViewDetails(meter)}
                                            className="cursor-pointer">
                                            <Eye size={14} />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleEditMeter(mapMeterInventoryToMeterData(meter))}
                                            className="cursor-pointer text-sm hover:bg-gray-100"
                                        >
                                            <Pencil size={14} />
                                            Edit Meter
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>

        <PaginationControls
            currentPage={currentPage}
            totalItems={totalData}
            pageSize={rowsPerPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
        />

        <AddMeterDialog
            isOpen={isAddMeterDialogOpen}
            onClose={() => {
                setIsAddMeterDialogOpen(false);
                setSelectedMeterForEdit(null);
            }}
            onSaveMeter={handleSaveMeter}
            editMeter={selectedMeterForEdit}
        />

        <ViewMeterInfoDialog
            isOpen={viewInfoDialogOpen}
            onClose={() => {
                setViewInfoDialogOpen(false);
                setSelectedMeterForView(null);
            }}
            meter={selectedMeterForView}
        />
    </div>
    )
}