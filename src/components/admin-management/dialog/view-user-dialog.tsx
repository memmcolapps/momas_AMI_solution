import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { UserData } from "../admin-management-table";

interface ViewUserInfoDialogProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserData | null;
}

export function ViewUserInfoDialog({ isOpen, onClose, user }: ViewUserInfoDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="md:max-w-2xl py-10 h-fit overflow-y-auto bg-white rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl mb-2">View Details</DialogTitle>
                </DialogHeader>
                {user ? (
                    <div className="grid gap-4 py-2 px-4">
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">First Name:</span>
                            <span className="text-gray-800">{user.firstName}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Last Name:</span>
                            <span className="text-gray-800">{user.lastName}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Email Address:</span>
                            <span className="text-gray-800">{user.email}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Business Hub:</span>
                            <span className="text-gray-800">{user.bussinessHub}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Permission:</span>
                           <span className="text-gray-800">
                                {user.permission}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 text-center text-gray-500">
                        No user data available
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}