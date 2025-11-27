"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  backgroundColor: string;
  alertTriangleColor: string;
  confirmButtonColor: string;
  cancelButtonColor: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText = "Cancel",
  backgroundColor,
  alertTriangleColor,
  confirmButtonColor,
  cancelButtonColor,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] ${backgroundColor} h-fit`}>
        <DialogHeader className="flex items-start">
          <AlertTriangle className={`${alertTriangleColor} mb-2`} size={20} />
          <DialogTitle className="mt-4">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-between! flex-col gap-2 sm:flex-row">
          <Button
            size={"md"}
            variant="outline"
            onClick={onClose}
            className={`w-full sm:w-auto ${cancelButtonColor}`}
          >
            {cancelText}
          </Button>
          <Button
            size={"md"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`w-full sm:w-auto ${confirmButtonColor}`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
