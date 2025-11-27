"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import type { Meter } from "./configure-apn-dialog";

interface OfflineDialogProps {
    isOpen: boolean;
    onClose: () => void;
    meter?: Meter;
}

export default function OfflineDialog({ isOpen, onClose, meter: _meter }: OfflineDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="h-fit bg-white">
                <DialogHeader>
                    <div className="flex justify-items-start mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <AlertTriangle size={24} className="text-red-500" />
                        </div>
                    </div>
                    <DialogTitle className="font-semibold">Meter Offline</DialogTitle>
                    <DialogDescription>
                        <p className="text-gray-700">
                            Configuration isn’t possible while the meter is offline. Please reconnect and try again.
                        </p>
                    </DialogDescription>
                </DialogHeader>              
            </DialogContent>
        </Dialog>
    );
}