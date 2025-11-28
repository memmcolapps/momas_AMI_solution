"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export interface Meter {
  sN: string;
  meterNumber: string;
  simNo: string;
  businessHub: string;
  class: string;
  category: string;
  manufacturer: string;
  model: string;
  status: string;
  region: string;
  serviceCenter: string;
  feeder: string;
  transformer: string;
  lastSync: string;
}

interface ConfigureAPNDialogProps {
  isOpen: boolean;
  onClose: () => void;
  meter?: Meter | undefined; 
}

export default function ConfigureAPNDialog({
  isOpen,
  onClose,
  meter,
}: ConfigureAPNDialogProps) {
  const [apn, setApn] = useState("");

  const isFormValid = apn.trim() !== "";

  const handleConfigure = () => {
    console.log("Configuring APN:", { apn, meter });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-fit bg-white p-6 py-10 md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="pb-2">Configure APN</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label
            htmlFor="apn-input"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            APN &nbsp;<span className="text-red-500">*</span>
          </Label>
          <Input
            id="apn-input"
            type="text"
            value={apn}
            onChange={(e) => setApn(e.target.value)}
            placeholder="Enter APN"
            className="w-full border border-gray-200"
          />
        </div>
        <DialogFooter className="flex justify-between!">
          <Button
            variant="outline"
            size={'md'}
            onClick={onClose}
            className="cursor-pointer border-[#161CCA] text-[#161CCA]"
          >
            Cancel
          </Button>
          <Button
            size={'md'}

            onClick={handleConfigure}
            disabled={!isFormValid} 
            className={`bg-[#161CCA] text-white ${
              !isFormValid ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            Configure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
