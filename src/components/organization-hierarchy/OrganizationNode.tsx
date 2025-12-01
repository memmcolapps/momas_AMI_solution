"use client";

import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Plus,
  Building,
  Wrench,
  Database,
  Zap,
  Grid2X2,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";
import { type NodeInfo, type Node, type FormData, DUMMY_NODES } from "../profile-events/data/data";
import { AddNodeDialog } from "./dialogs/add-node-dialog";
import { EditNodeDialog } from "./dialogs/edit-node-dialog";


const renderNodeIcon = (type?: string) => {
  const iconProps = { size: 14, className: "text-gray-700" };
  
  switch (type?.toLowerCase()) {
    case "region":
      return <Grid2X2 {...iconProps} />;
    case "business hub":
      return <Building {...iconProps} />;
    case "service center":
      return <Wrench {...iconProps} />;
    case "substation":
      return <Database {...iconProps} />;
    case "feeder line":
      return <Zap {...iconProps} />;
    case "dss":
      return <Lightbulb {...iconProps} />;
    default:
      return <Building {...iconProps} />;
  }
};

const mapNodeInfoToFormData = (nodeInfo?: NodeInfo): FormData => {
  return {
    name: nodeInfo?.name ?? "",
    type: nodeInfo?.type ?? "",
    ...nodeInfo,
  };
};

const getNormalizedDisplayType = (type?: string): string => {
  if (!type) return "Node";
  return type;
};

// OrganizationNode Component with dialogs
interface OrganizationNodeProps {
  node: Node;
  level?: number;
}

const OrganizationNode = ({ node, level = 0 }: OrganizationNodeProps) => {
  const [children, setChildren] = useState<Node[]>(node.nodesTree ?? []);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedNodeType, setSelectedNodeType] = useState("");
  const [nodeDataForEdit, setNodeDataForEdit] = useState<FormData>(
    mapNodeInfoToFormData(node.nodeInfo),
  );

  useEffect(() => {
    setChildren(node.nodesTree ?? []);
    setNodeDataForEdit(mapNodeInfoToFormData(node.nodeInfo));
  }, [node]);

  const handleAddNode = (data: { name: string; nodeType: string; data: FormData }) => {
    setIsExpanded(true);
    toast.success(`Successfully added "${data.name}" as a ${data.nodeType}`);
  };

  const handleEditNode = (data: FormData) => {
    setNodeDataForEdit(data);
    toast.success(`Successfully updated "${data.name}"`);
  };

  const openAddDialog = (type: string) => {
    setSelectedNodeType(type);
    setIsAddDialogOpen(true);
  };

  const displayName = node.nodeInfo?.name ?? node.name;
  const displayNodeType = node.nodeInfo?.type ?? node.name;

  return (
    <Card className="border-gray-200 shadow-none mb-2">
      <div className="ml-4 pl-5" style={{ marginLeft: `${level * 20}px` }}>
        <div className="flex items-center justify-between gap-2 rounded p-8">
          <span
            className="flex cursor-pointer items-center gap-2 text-gray-800"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {children.length > 0 &&
              (isExpanded ? (
                <ChevronDown size={14} className="text-gray-600" />
              ) : (
                <ChevronRight size={14} className="text-gray-600" />
              ))}
            {renderNodeIcon(displayNodeType)}
            {displayName}
          </span>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="cursor-pointer border-none p-1 text-gray-600 ring-[rgba(22,28,202,0)] hover:text-gray-800 focus:outline-none"
                >
                  <Plus size={14} strokeWidth={2.7} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => openAddDialog("Region")}>
                  <Grid2X2 size={14} className="mr-2 text-gray-700" /> Region
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openAddDialog("Business Hub")}>
                  <Building size={14} className="mr-2 text-gray-700" /> Business
                  Hub
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openAddDialog("Service Center")}
                >
                  <Wrench size={14} className="mr-2 text-gray-700" /> Service
                  Centre
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openAddDialog("Substation")}>
                  <Database size={14} className="mr-2 text-gray-700" />
                  Substation
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openAddDialog("Feeder Line")}>
                  <Zap size={14} className="mr-2 text-gray-700" /> Feeder Line
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openAddDialog("DSS")}>
                  <Lightbulb size={14} className="mr-2 text-gray-700" />{" "}
                  Distribution Substation (DSS)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => setIsEditDialogOpen(true)}
              className="cursor-pointer border-none p-1 text-gray-600 ring-[rgba(22,28,202,0)] hover:text-gray-800 focus:outline-none"
            >
              <Edit size={14} strokeWidth={2.7} />
            </Button>
          </div>
        </div>
        {isExpanded &&
          children.map((childNode) => (
            <OrganizationNode
              key={childNode.id}
              node={childNode}
              level={level + 1}
            />
          ))}
        
        <AddNodeDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddNode}
          nodeType={selectedNodeType}
          parentId={node.id}
        />
        
        <EditNodeDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleEditNode}
          nodeType={getNormalizedDisplayType(displayNodeType)}
          initialData={nodeDataForEdit}
          nodeId={
            node.nodeInfo?.nodeId ??
            node.nodeInfo?.regionId ??
            node.nodeInfo?.bhubId ??
            node.nodeInfo?.id ??
            node.id
          }
        />
      </div>
    </Card>
  );
};

const OrganizationalTree = () => {
  const nodes = DUMMY_NODES;

  return (
    <div className="p-4">
      {nodes.length > 0 ? (
        nodes.map((node) => <OrganizationNode key={node.id} node={node} />)
      ) : (
        <div className="text-center text-gray-500">
          No organization nodes found.
        </div>
      )}
    </div>
  );
};

export default OrganizationalTree;