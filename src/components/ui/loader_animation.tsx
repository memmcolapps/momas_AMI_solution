"use client";

import * as React from "react";
import { cn } from "@?/lib/utils";
import { LoaderIcon } from "lucide-react";

interface LoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fullScreen?: boolean;
}

export function Loader({
  message,
  size = "md",
  className,
  fullScreen = false,
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const content = (
    <div className={cn("flex flex-row items-center justify-center gap-2", className)}>
      <LoaderIcon className={cn(sizeClasses[size], "animate-spin [animation-duration:4s] text-gray-400")} />
      {message && <p className="text-xs tracking-wider font-thin text-gray-400">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
