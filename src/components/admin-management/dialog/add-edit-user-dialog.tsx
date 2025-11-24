"use client";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { UserData } from "../admin-management-table";

const BUSINESS_HUBS = [
    { id: "ijeun", name: "Ijeun" },
    { id: "mowe", name: "Mowe" },
    { id: "olowotedo", name: "Olowotedo" },
];

interface AddUserDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveUser: (user: UserData) => void;
    editUser?: UserData | null;
}

export function AddUserDialog({ isOpen, onClose, onSaveUser, editUser }: AddUserDialogProps) {
    const mode = editUser ? "edit" : "add";
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [formData, setFormData] = useState({
        id: 0,
        sn: "",
        firstName: "",
        lastName: "",
        email: "",
        bussinessHub: "",
        permission: "",
        lastActive: "Offline",
        date: "",
        defaultPassword: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && mode === "edit" && editUser) {
            setFormData({
                id: editUser.id,
                sn: editUser.sn,
                firstName: editUser.firstName,
                lastName: editUser.lastName,
                email: editUser.email,
                bussinessHub: editUser.bussinessHub,
                permission: editUser.permission,
                lastActive: editUser.lastActive,
                date: editUser.date,
                defaultPassword: editUser?.defaultPassword ?? ''
            });
        } else if (isOpen && mode === "add") {
            setFormData({
                id: 0,
                sn: "",
                firstName: "",
                lastName: "",
                email: "",
                bussinessHub: "",
                permission: '',
                lastActive: "Offline",
                date: new Date().toLocaleDateString('en-GB'),
                defaultPassword: '',
            });
        }
    }, [isOpen, mode, editUser]);

    const cleanUpOverlay = useCallback(() => {
        const overlays = document.querySelectorAll("[data-radix-dialog-overlay]");
        if (overlays.length > 0) {
            overlays.forEach((overlay) => overlay.remove());
        }
    }, []);

    const handleOpenChange = useCallback((open: boolean) => {
        if (!open) {
            setFormData({
                id: 0,
                sn: "",
                firstName: "",
                lastName: "",
                email: "",
                bussinessHub: "",
                permission: '',
                lastActive: "Offline",
                date: "",
                defaultPassword: '',
            });
            cleanUpOverlay();
            onClose();
        }
    }, [onClose, cleanUpOverlay]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | string, field?: string) => {
            if (typeof e === "string" && field) {
                setFormData((prev) => ({
                    ...prev,
                    [field]: e,
                }));
            } else if (typeof e !== "string") {
                const { name, value } = e.target;
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        },
        []
    );

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
    };

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            setIsSubmitting(true);

            setTimeout(() => {
                const userData: UserData = {
                    ...formData,
                    id: mode === "add" ? Date.now() : formData.id,
                    sn: mode === "add" ? String(Date.now()).slice(-2) : formData.sn,
                };

                if (mode === "add") {
                    toast.success("User added successfully!");
                } else {
                    toast.success("User updated successfully!");
                }

                onSaveUser(userData);
                setIsSubmitting(false);
                handleOpenChange(false);
            }, 1000);
        },
        [mode, formData, onSaveUser, handleOpenChange]
    );

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="md:max-w-2xl py-10 h-fit bg-white p-2 rounded-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "add" ? "Add Admin" : "Edit Admin"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700" htmlFor="firstName">First Name <span className="text-red-600">*</span></Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder="Enter first name"
                                className="border-[rgba(228,231,236,1)]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700" htmlFor="lastName">Last Name<span className="text-red-600">*</span></Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Enter last name"
                                className="border-[rgba(228,231,236,1)]"
                            />
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-6 mt-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700" htmlFor="email">Email Address<span className="text-red-600">*</span></Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter email address"
                                className="border-[rgba(228,231,236,1)]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700" htmlFor="bussinessHub">Assigned Business Hub<span className="text-red-600">*</span></Label>
                            <Select
                                value={formData.bussinessHub}
                                onValueChange={(value) => handleChange(value, "bussinessHub")}
                                required
                            >
                                <SelectTrigger className="border-[rgba(228,231,236,1)] w-full">
                                    <SelectValue placeholder="Select business hub" />
                                </SelectTrigger>
                                <SelectContent>
                                    {BUSINESS_HUBS.map((hub) => (
                                        <SelectItem key={hub.id} value={hub.name}>
                                            {hub.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2 mt-4">
                        <Label className="text-sm font-medium text-gray-700" htmlFor="permission">Permission<span className="text-red-600">*</span></Label>
                        <Select
                            value={formData.permission}
                            onValueChange={(value) => handleChange(value, "permission")}
                            required
                        >
                            <SelectTrigger className="border-[rgba(228,231,236,1)] w-full">
                                <SelectValue placeholder="Select Permission" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="View">View</SelectItem>
                                <SelectItem value="Edit">Edit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700" htmlFor="defaultPassword">
                                Default Password <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="defaultPassword"
                                name="defaultPassword"
                                type="password"
                                value={formData.defaultPassword}
                                onChange={handleChange}
                                required
                                placeholder="Enter default password"
                                className="w-full border-[rgba(228,231,236,1)]"
                                disabled= {mode === 'edit'}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                                Confirm Default Password <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="w-full border-[rgba(228,231,236,1)]"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="Confirm Default Password"
                                disabled= {mode === 'edit'}
                            />
                        </div>
                    </div>


                    <div className="mt-12 flex justify-between gap-3">
                        <Button
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            type="button"
                            size={"lg"}
                            className="border-[#161CCA] text-[#161CCA] cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size={"lg"}
                            className="bg-[#161CCA] text-white cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : (mode === "add" ? "Add User" : "Save Changes")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}