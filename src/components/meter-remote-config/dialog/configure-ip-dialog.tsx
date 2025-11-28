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
import type { Meter } from "./configure-apn-dialog";

interface ConfigureIPDialogProps {
  isOpen: boolean;
  onClose: () => void;
  meter?: Meter | undefined;
}

export default function ConfigureIPDialog({
  isOpen,
  onClose,
  meter,
}: ConfigureIPDialogProps) {
  const [ipAddress, setIpAddress] = useState("");
  const [port, setPort] = useState("");

  // Check if both fields are filled
  const isFormValid = ipAddress.trim() !== "" && port.trim() !== "";

  const handleConfigure = () => {
    // Handle IP and port configuration logic
    console.log("Configuring IP:", { ipAddress, port, meter });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-fit bg-white p-6 py-10 md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="pb-2">
            Configure IP Address & Port
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <Label
              htmlFor="ip-address"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              IP Address&nbsp;<span className="text-red-500">*</span>
            </Label>
            <Input
              id="ip-address"
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="Enter IP Address"
              className="w-full border border-gray-200"
            />
          </div>
          <div>
            <Label
              htmlFor="port"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Port <span className="text-red-500">*</span>
            </Label>
            <Input
              id="port"
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="Enter Port"
              className="w-full border border-gray-200"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between!">
          <Button
            variant="outline"
            onClick={onClose}
            size={"md"}
            className="cursor-pointer border-[#161CCA] text-[#161CCA]"
          >
            Cancel
          </Button>
          <Button
            size={"md"}
            onClick={handleConfigure}
            disabled={!isFormValid} // Disable when form is invalid
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
