"use client";

import React from "react";
import { Loader } from "../ui/loader_animation";
import { DUMMY_NODES } from "../profile-events/data/data";
import OrganizationNode from "./OrganizationNode";


const OrganizationalTree = () => {
  const nodes = DUMMY_NODES;
  const isLoading = false;
  const error = null;

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-[rgba(22,28,202,1)]" />
        <span className="ml-2 text-gray-600">Loading organization tree...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

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