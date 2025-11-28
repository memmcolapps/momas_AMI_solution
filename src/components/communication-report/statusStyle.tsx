export const statusStyles: Record<string, string> = {
  online: "text-green-600 bg-green-100 px-3 py-1 rounded-2xl",
  offline: "text-red-600 bg-red-100 px-3 py-1 rounded-2xl",
};

export const getStatusStyle = (status: string): string => {
  return statusStyles[status.toLowerCase()] ?? "";
};
