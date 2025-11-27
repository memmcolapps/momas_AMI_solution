"use client";

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
import { AddUserDialog } from "./dialog/add-edit-user-dialog";
import { ViewUserInfoDialog } from "./dialog/view-user-dialog";

export interface UserData {
  id: number;
  sn: string;
  firstName: string;
  lastName: string;
  email: string;
  bussinessHub: string;
  lastActive: string;
  date: string;
  permission: string;
  defaultPassword?: string;
}

const Users: UserData[] = [
  {
    id: 1,
    sn: "01",
    firstName: "John",
    lastName: "Doe",
    email: "Johndoe@gridflex.com",
    bussinessHub: "Ijeun",
    lastActive: "Online",
    date: "04-01-2025",
    permission: "View",
  },
  {
    id: 2,
    sn: "02",
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@gridflex.com",
    bussinessHub: "Mowe",
    lastActive: "Online",
    date: "04-01-2025",
    permission: "View",
  },
  {
    id: 3,
    sn: "03",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michaelj@gridflex.com",
    bussinessHub: "Ijeun",
    lastActive: "1 hour ago",
    date: "03-01-2025",
    permission: "View",
  },
  {
    id: 4,
    sn: "04",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarahw@gridflex.com",
    bussinessHub: "Olowotedo",
    lastActive: "Online",
    date: "02-01-2025",
    permission: "View",
  },
  {
    id: 5,
    sn: "05",
    firstName: "David",
    lastName: "Brown",
    email: "davidb@gridflex.com",
    bussinessHub: "Ijeun",
    lastActive: "1 hour ago",
    permission: "View",
    date: "01-01-2025",
  },
  {
    id: 6,
    sn: "06",
    firstName: "Emily",
    lastName: "Davis",
    email: "emilyd@gridflex.com",
    bussinessHub: "Mowe",
    permission: "View",
    lastActive: "Online",
    date: "31-12-2024",
  },
  {
    id: 7,
    sn: "07",
    firstName: "James",
    lastName: "Miller",
    email: "jamesm@gridflex.com",
    bussinessHub: "Ijeun",
    permission: "View",
    lastActive: "Online",
    date: "30-12-2024",
  },
  {
    id: 8,
    sn: "08",
    firstName: "Lisa",
    lastName: "Wilson",
    email: "lisaw@gridflex.com",
    bussinessHub: "Olowotedo",
    permission: "View",
    lastActive: "1 hour ago",
    date: "29-12-2024",
  },
  {
    id: 9,
    sn: "09",
    firstName: "Robert",
    lastName: "Moore",
    email: "robertm@gridflex.com",
    bussinessHub: "Ijeun",
    permission: "View",
    lastActive: "Online",
    date: "28-12-2024",
  },
  {
    id: 10,
    sn: "10",
    firstName: "Jennifer",
    lastName: "Taylor",
    email: "jennifert@gridflex.com",
    bussinessHub: "Mowe",
    permission: "View",
    lastActive: "Online",
    date: "27-12-2024",
  },
];

export default function AdminManagementTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [viewInfoDialogOpen, setViewInfoDialogOpen] = useState(false);
  const [selectedUserForView, setSelectedUserForView] =
    useState<UserData | null>(null);
  const [selectedUserForEdit, setSelectedUserForEdit] =
    useState<UserData | null>(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const totalData = Users.length;

  const handleSaveUser = (user: UserData) => {
    setIsAddUserDialogOpen(false);
    setSelectedUserForEdit(null);
  };

  const handlePageSizeChange = () => {
    console.log("Page size changed");
  };

  const handleEditUser = (user: UserData) => {
    setSelectedUserForEdit(user);
    setIsAddUserDialogOpen(true);
  };

  const handleViewDetails = (user: UserData) => {
    setSelectedUserForView(user);
    setViewInfoDialogOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUserIds(Users.map((user) => user.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectItem = (checked: boolean, userId: number) => {
    if (checked) {
      setSelectedUserIds((prev) => [...prev, userId]);
    } else {
      setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  const isAllSelected =
    selectedUserIds.length === Users.length && Users.length > 0;

  return (
    <div>
      <Card className="h-4/6 rounded-md border-none shadow-none">
        <Table>
          <TableHeader className="bg-transparent">
            <TableRow
              className="border-b border-gray-200 hover:bg-[hsla(0,0%,20%,0.1)]"
              style={{ backgroundColor: "hsla(0, 0%, 97%)" }}
            >
              <TableHead className="h-12 w-20 px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="border-gray-500"
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all users"
                  />
                  <Label
                    htmlFor="select-all"
                    className="text-sm font-medium text-gray-700"
                  >
                    S/N
                  </Label>
                </div>
              </TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Assigned Business Hub</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Users.map((user) => (
              <TableRow
                key={user.id}
                className="border-gray-100 hover:bg-gray-50"
              >
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      className="border-gray-500"
                      checked={selectedUserIds.includes(user.id)}
                      onCheckedChange={(checked) =>
                        handleSelectItem(!!checked, user.id)
                      }
                      aria-label={`Select user ${user.firstName}`}
                    />
                    <span className="text-sm text-gray-900">{user.sn}</span>
                  </div>
                </TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.bussinessHub}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 cursor-pointer p-0"
                      >
                        <MoreVertical size={14} className="text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(user)}
                        className="cursor-pointer py-2"
                      >
                        <Eye size={14} className="mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <hr className="border-gray-200" />

                      <DropdownMenuItem
                        onClick={() => handleEditUser(user)}
                        className="cursor-pointer py-2 text-sm hover:bg-gray-100"
                      >
                        <Pencil size={14} className="mr-2" />
                        Edit User
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

      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onClose={() => {
          setIsAddUserDialogOpen(false);
          setSelectedUserForEdit(null);
        }}
        onSaveUser={handleSaveUser}
        editUser={selectedUserForEdit}
      />

      <ViewUserInfoDialog
        isOpen={viewInfoDialogOpen}
        onClose={() => {
          setViewInfoDialogOpen(false);
          setSelectedUserForView(null);
        }}
        user={selectedUserForView}
      />
    </div>
  );
}
