"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface MeterData {
  id?: string;
  meterNumber: string;
  simNo?: string;
  class: string;
  category?: string;
  meterType?: string;
  manufacturer?: string;
  model?: string;
  region?: string;
  businessHub?: string;
  serviceCenter?: string;
  feeder?: string;
  transformer?: string;
  serviceLocation?: string;
  status?: string;
  lastSync?: string;
}

interface ViewDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  meter: MeterData | undefined;
}

export default function ViewDetailsDialog({
  isOpen,
  onClose,
  meter,
}: ViewDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="md:max-w-2xl py-10 h-fit w-full overflow-hidden bg-white rounded-lg">
        <DialogHeader>
          <DialogTitle>View Details</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {meter && (
          <div className="grid gap-4 py-2 px-4">
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Meter Number:</span>
              <span className="text-gray-900 font-semibold">{meter.meterNumber}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Meter Manufacturer:</span>
              <span className="text-gray-900 font-semibold">{meter.manufacturer}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Meter Class:</span>
              <span className="text-gray-900 font-semibold">{meter.class}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Meter Category:</span>
              <span className="text-gray-900 font-semibold">{meter.category}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Meter Model:</span>
              <span className="text-gray-900 font-semibold">{meter.model}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Region:</span>
              <span className="text-gray-900 font-semibold">{meter.region}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Business Hub:</span>
              <span className="text-gray-900 font-semibold">{meter.businessHub}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Service Center:</span>
              <span className="text-gray-900 font-semibold">{meter.serviceCenter}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Feeder:</span>
              <span className="text-gray-900 font-semibold">{meter.feeder}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Transformer:</span>
              <span className="text-gray-900 font-semibold">{meter.transformer }</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Service Location:</span>
              <span className="text-gray-900 font-semibold">
                {meter.serviceLocation ?? `KM 40, Lagos - Ibadan Expressway, ${meter.region}`}
              </span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Status:</span>
              <span className="text-gray-900 font-semibold">{meter.status}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-16">
              <span className="font-medium text-gray-700">Last Sync:</span>
              <span className="text-gray-900 font-semibold">{meter.lastSync}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
