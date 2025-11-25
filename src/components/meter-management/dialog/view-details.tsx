import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface MeterData {
    id: number;
    sn: string;
    name: string;
    address: string;
    meterNo: string;
    simNo: string;
    manu: string;
    class: string;
    businessHub: string;
    feeder: string;
    dss: string;
}

interface ViewMeterInfoDialogProps {
    isOpen: boolean;
    onClose: () => void;
    meter: MeterData | null;
}

export function ViewMeterInfoDialog({ isOpen, onClose, meter }: ViewMeterInfoDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="md:max-w-2xl py-10 h-fit w-full overflow-hidden bg-white rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Meter Details</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        View complete information about this meter
                    </DialogDescription>
                </DialogHeader>
                {meter ? (
                    <div className="grid gap-4 py-2 px-4">
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Meter Number:</span>
                            <span className="text-gray-900 font-bold">{meter.meterNo}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">SIM No:</span>
                            <span className="text-gray-900 font-bold">{meter.simNo}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Customer Name:</span>
                            <span className="text-gray-900 font-bold">{meter.name}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Customer Address:</span>
                            <span className="text-gray-900 font-bold">{meter.address}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Business Hub:</span>
                            <span className="text-gray-900 font-bold">{meter.businessHub}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Manufacturer:</span>
                            <span className="text-gray-900 font-bold">{meter.manu}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Class:</span>
                            <span className="text-gray-900 font-bold">{meter.class}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">Feeder:</span>
                            <span className="text-gray-900 font-bold">{meter.feeder}</span>
                        </div>
                        <div className="grid grid-cols-[150px_1fr] items-center gap-16">
                            <span className="font-medium text-gray-700">DSS:</span>
                            <span className="text-gray-900 font-bold">{meter.dss}</span>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 text-center text-gray-500">
                        No meter data available
                    </div>
                )}
                <DialogFooter>
                    <Button 
                        onClick={onClose}
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}