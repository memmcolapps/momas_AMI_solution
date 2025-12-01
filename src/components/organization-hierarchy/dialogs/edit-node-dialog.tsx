import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FormData {
  name: string;
  regionId: string;
  serialNo: string;
  phoneNumber: string;
  email: string;
  contactPerson: string;
  address: string;
  status: string;
  voltage: string;
  longitude: string;
  latitude: string;
  description: string;
  assetId: string;
}

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  nodeType: string;
  initialData: FormData;
  nodeId: string;
}

const validateFormData = (formData: FormData, nodeType: string) => {
  const errors: Partial<Record<keyof FormData, string>> = {};
  
  if (!(formData.name || '').trim()) {
    errors.name = "Name is required";
  }
  
  const isTechnicalNode = ["substation", "feeder line", "dss"].includes(
    nodeType.toLowerCase()
  );
  
  if (!isTechnicalNode && !(formData.regionId || '').trim()) {
    errors.regionId = "ID is required";
  }
  
  if (isTechnicalNode && !(formData.serialNo || '').trim()) {
    errors.serialNo = "Serial Number is required";
  }
  
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }
  
  if (formData.phoneNumber && !/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
    errors.phoneNumber = "Invalid phone number";
  }
  
  if (isTechnicalNode) {
    if (!(formData.assetId || '').trim()) {
      errors.assetId = "Asset ID is required";
    }
    if (!formData.status) {
      errors.status = "Status is required";
    }
    if (!formData.voltage) {
      errors.voltage = "Voltage is required";
    }
  }
  
  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
};

export const EditNodeDialog = ({
  isOpen,
  onClose,
  onSave,
  nodeType,
  initialData,
  nodeId,
}: EditDialogProps) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      const { errors: validationErrors } = validateFormData(initialData, nodeType);
      setErrors(validationErrors);
    }
  }, [isOpen, initialData, nodeType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    
    const { errors: newErrors } = validateFormData(newData, nodeType);
    setErrors(newErrors);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    
    const { errors: newErrors } = validateFormData(newData, nodeType);
    setErrors(newErrors);
  };

  const handleSelectChange = (name: string, value: string) => {
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    
    const { errors: newErrors } = validateFormData(newData, nodeType);
    setErrors(newErrors);
  };

  const handleSave = async () => {
    const { errors: validationErrors, isValid } = validateFormData(formData, nodeType);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updating node:", {
        nodeId,
        nodeType,
        formData,
      });

      toast.success(`Successfully updated ${nodeType}`);
      onSave(formData);
      onClose();
    } catch (error) {
      toast.error(`Failed to update ${nodeType}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isTechnicalNode = ["substation", "feeder line", "dss"].includes(
    nodeType.toLowerCase()
  );
  const { isValid } = validateFormData(formData, nodeType);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-fit rounded-lg md:max-w-2xl bg-white py-10 px-6 shadow-lg [&>button]:h-5 [&>button]:w-5 [&>button>svg]:h-5 [&>button>svg]:w-5">
        <DialogHeader>
          <DialogTitle>Edit {nodeType.toLocaleUpperCase()}</DialogTitle>
        </DialogHeader>
        <div className="grid space-y-2 gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">
                {nodeType.toLowerCase() === "root"
                  ? "Root Name"
                  : nodeType.toLowerCase() === "region"
                    ? "Region Name"
                    : `${nodeType} Name`}{" "}
                <span className="text-red-500">*</span>
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={`Enter ${nodeType === "Root" ? "Root" : nodeType === "Region" ? "Region" : nodeType} Name`}
                className="mt-1 border-gray-300"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">
                {isTechnicalNode
                  ? "Serial Number"
                  : nodeType.toLowerCase() === "root"
                    ? "Root ID"
                    : nodeType.toLowerCase() === "region"
                      ? "Region ID"
                      : nodeType.toLowerCase() === "business hub"
                        ? "Business Hub ID"
                        : nodeType.toLowerCase() === "service center"
                          ? "Service Center ID"
                          : "ID"}{" "}
                <span className="text-red-500">*</span>
              </label>
              {isTechnicalNode ? (
                <Input
                  name="serialNo"
                  value={formData.serialNo ?? ""}
                  onChange={handleInputChange}
                  placeholder="Enter Serial Number"
                  className="mt-1 border-gray-300"
                />
              ) : (
                <Input
                  name="regionId"
                  value={formData.regionId}
                  onChange={handleInputChange}
                  placeholder={`Enter ${
                    nodeType.toLowerCase() === "root"
                      ? "Root"
                      : nodeType.toLowerCase() === "region"
                        ? "Region"
                        : nodeType.toLowerCase() === "business hub"
                          ? "Business Hub"
                          : nodeType.toLowerCase() === "service center"
                            ? "Service Center"
                            : ""
                  } ID`}
                  className="mt-1 border-gray-300"
                />
              )}
              {errors.regionId && (
                <p className="mt-1 text-xs text-red-500">{errors.regionId}</p>
              )}
              {errors.serialNo && (
                <p className="mt-1 text-xs text-red-500">{errors.serialNo}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">
                Contact Person Phone Number
              </label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
                className="mt-1 border-gray-300"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">
                Contact Person Email
              </label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                className="mt-1 border-gray-300"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Contact Person Name</label>
              <Input
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                placeholder="Enter Contact Person"
                className="mt-1 border-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">
                Contact Person Address
              </label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
                className="mt-1 border-gray-300"
              />
            </div>
          </div>
          {isTechnicalNode && (
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">Asset ID <span className="text-red-500">*</span></label>
                <Input
                  name="assetId"
                  value={formData.assetId}
                  onChange={handleInputChange}
                  placeholder="Enter Asset ID"
                  className="mt-1 border-gray-300"
                />
                {errors.assetId && (
                  <p className="mt-1 text-xs text-red-500">{errors.assetId}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium">Status <span className="text-red-500">*</span></label>
                <Select
                  onValueChange={(value) => handleSelectChange("status", value)}
                  value={formData.status?.toString()}
                >
                  <SelectTrigger className="ring-opacity-0 border-gray-300">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="mt-1 text-xs text-red-500">{errors.status}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium">Voltage <span className="text-red-500">*</span></label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("voltage", value)
                  }
                  value={
                    formData.voltage ? String(formData.voltage) : undefined
                  }
                >
                  <SelectTrigger className="ring-opacity-0 border-gray-300">
                    <SelectValue placeholder="Select Voltage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="330 KV">330 KV</SelectItem>
                    <SelectItem value="132 KV">132 KV</SelectItem>
                    <SelectItem value="33 KV">33 KV</SelectItem>
                    <SelectItem value="11 KV">11 KV</SelectItem>
                    <SelectItem value="415 V">415 V</SelectItem>
                    <SelectItem value="240 V">240 V</SelectItem>
                    <SelectItem value="3-240 V">3-240 V</SelectItem>
                  </SelectContent>
                </Select>
                {errors.voltage && (
                  <p className="mt-1 text-xs text-red-500">{errors.voltage}</p>
                )}
              </div>
            </div>
          )}
          {(nodeType.toLowerCase() === "substation" ||
            nodeType.toLowerCase() === "dss" ||
            nodeType.toLowerCase() === "feeder line") && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">Longitude</label>
                <Input
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  placeholder="Enter Longitude"
                  className="mt-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium">Latitude</label>
                <Input
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  placeholder="Enter Latitude"
                  className="mt-1 border-gray-300"
                />
              </div>
            </div>
          )}
          {isTechnicalNode && (
            <div className="flex flex-col">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleTextareaChange}
                placeholder="Enter Description"
                className="mt-1 border-gray-300"
              />
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-between! ">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[rgba(22,28,202,1)] text-[rgba(22,28,202,1)] hover:bg-gray-300"
            size={"md"}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            disabled={!isValid || isLoading}
            onClick={handleSave}
            size={"md"}
            className="ml-2 bg-[rgba(22,28,202,1)] text-white"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};