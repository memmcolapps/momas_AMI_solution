import { PaginationControls } from "../ui/pagination_controls";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import React, { useState } from "react";
import { AuditLogDetailsDialog } from "./view-audit-dialog";
import { Card } from "../ui/card";

export interface LoggedData {
    id: number;
    userName: string;
    email: string
    groupPermission: string;
    activity: string;
    userAgent: string
    ipAddress: string;
    timeStamp: string
}

const Logged: LoggedData[] = [
    {
        id: 1,
        userName: 'John Doe',
        email: 'Johndoe@gridflex.com',
        groupPermission: 'Meter Manager',
        activity: 'Bulk Allocated - Olowotedo ',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        timeStamp: '04-01-2025  16:32'
    },
    {
        id: 2,
        userName: 'John Doe',
        email: 'Johndoe@gridflex.com',
        groupPermission: 'Meter Manager',
        activity: 'Bulk Allocated - Olowotedo ',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        timeStamp: '04-01-2025  16:32'
    },
    {
        id: 3,
        userName: 'Kkay Doe',
        email: 'Johndoe@gridflex.com',
        groupPermission: 'Meter Manager',
        activity: 'Bulk Allocated - Olowotedo ',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        timeStamp: '04-01-2025  16:32'
    },
    {
        id: 4,
        userName: 'John Doe',
        email: 'Johndoe@gridflex.com',
        groupPermission: 'Meter Manager',
        activity: 'Bulk Allocated - Olowotedo ',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        timeStamp: '04-01-2025  16:32'
    },
    {
        id: 5,
        userName: 'John Doe',
        email: 'Johndoe@gridflex.com',
        groupPermission: 'Meter Manager',
        activity: 'Bulk Allocated - Olowotedo ',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        timeStamp: '04-01-2025  16:32'
    },
    {
        id: 6,
        userName: 'John Doe',
        email: 'Johndoe@gridflex.com',
        groupPermission: 'Meter Manager',
        activity: 'Bulk Allocated - Olowotedo ',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        timeStamp: '04-01-2025  16:32'
    },
    {
        id: 7,
        userName: 'John Doe',
        email: 'Johndoe@gridflex.com',
        groupPermission: 'Meter Manager',
        activity: 'Bulk Allocated - Olowotedo ',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        timeStamp: '04-01-2025  16:32'
    },
    {
        id: 8,
        userName: 'John Doe',
        email: 'Johndoe@gridflex.com',
        groupPermission: 'Meter Manager',
        activity: 'Bulk Allocated - Olowotedo ',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        timeStamp: '04-01-2025  16:32'
    },
    {
        id: 9,
        userName: 'John Doe',
        email: 'Johndoe@gridflex.com',
        groupPermission: 'Meter Manager',
        activity: 'Bulk Allocated - Olowotedo ',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        timeStamp: '04-01-2025  16:32'
    },
    {
        id: 10,
        userName: 'John Doe',
        email: 'Johndoe@gridflex.com',
        groupPermission: 'Meter Manager',
        activity: 'Bulk Allocated - Olowotedo ',
        userAgent: 'Google Chrome (Windows)',
        ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        timeStamp: '04-01-2025  16:32'
    },
]

export function AuditLogTable() {
    const [selectedEntry, setSelectedEntry] = useState<LoggedData | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const totalData = Logged.length;

    const handleUserClick = (entry: LoggedData) => {
        setSelectedEntry(entry);
        setIsDialogOpen(true);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setRowsPerPage(newPageSize);
        setCurrentPage(1);
    };

    return (
        <div>
            <Card className="h-4/6 shadow-none rounded-md border-none">
                <Table>
                    <TableHeader className="bg-transparent">
                        <TableRow
                            className="border-b border-gray-200 hover:bg-[hsla(0,0%,20%,0.1)]"
                            style={{ backgroundColor: "hsla(0, 0%, 97%)" }}
                        >
                            <TableHead>Username</TableHead>
                            <TableHead>Group Permission</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>User Agent</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead>Time Stamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Logged.map((user) => (
                            <TableRow
                                key={user.id}
                                onClick={() => handleUserClick(user)}
                                className="hover:bg-gray-50 border-gray-100"
                            >
                                <TableCell>
                                    <span>{user.userName}</span>
                                    <br />
                                    <span className="text-xs text-gray-500">
                                        {user.email}
                                    </span>
                                </TableCell>
                                <TableCell>{user.groupPermission}</TableCell>
                                <TableCell>{user.activity}</TableCell>
                                <TableCell>{user.userAgent}</TableCell>
                                <TableCell>{user.ipAddress}</TableCell>
                                <TableCell>
                                    {typeof user.timeStamp === "string" ||
                                        typeof user.timeStamp === "number"
                                        ? user.timeStamp
                                        : (user.timeStamp as Date).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                <AuditLogDetailsDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    entry={selectedEntry}
                />
                <PaginationControls
                    currentPage={currentPage}
                    totalItems={totalData}
                    pageSize={rowsPerPage}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={handlePageSizeChange}
                />
            </Card >
        </div >

    );

}
