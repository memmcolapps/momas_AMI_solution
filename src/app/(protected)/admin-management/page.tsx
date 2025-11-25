'use client'

import { Button } from "@/components/ui/button";
import { ContentHeader } from "@/components/ui/content_header";
import { ArrowUpDown, CirclePlus, Search } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FilterControl } from "@/components/meter-management/filterSelect";
import { useState } from "react";
import { AddMeterDialog } from "@/components/meter-management/dialog/add-edit-meter";
import type { MeterInventoryItem } from "@/types/meter-inventory";
import AdminManagementTable, { type UserData } from "@/components/admin-management/admin-management-table";
import { AddUserDialog } from "@/components/admin-management/dialog/add-edit-user-dialog";

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

export default function AdminManagement() {
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const handleSaveUser = (user: UserData) => {
        setIsAddUserDialogOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-transparent p-6">
            <div className="max-w-screen-4xl space-y-6">
                <div className="flex items-center justify-between">
                    {/* Header  */}
                    <ContentHeader
                        title="Admin Management"
                        description="Manage your team members and their group permissions here."
                    />

                    {/* Buttons  */}
                    <div className="flex items-center justify-between">
                        <div className="flex">
                            <Button
                                size="lg"
                                onClick={() => {
                                    setSelectedUser(null);
                                    setIsAddUserDialogOpen(true);
                                }}
                                className="flex w-full cursor-pointer items-center gap-2 bg-[#161CCA] font-medium text-white hover:bg-[#1e2abf] md:w-auto"
                            >
                                <CirclePlus size={14} strokeWidth={2.3} className="h-4 w-4" />
                                <span className="text-sm md:text-base">Add User</span>
                            </Button>
                        </div>
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

                </Card>

                <div>
                    <AdminManagementTable />
                </div>
            </div>

            <AddUserDialog
                isOpen={isAddUserDialogOpen}
                onClose={() => {
                    setIsAddUserDialogOpen(false);
                    setSelectedUser(null);
                }}
                onSaveUser={handleSaveUser}
                editUser={selectedUser}
            />
        </div>


    )
}