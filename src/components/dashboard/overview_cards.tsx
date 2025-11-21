import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import React from "react";

interface OverviewCardProps {
    title: string;
    value: string;
    status?: string;
    icon: React.ReactNode; 
    bgColor: string; 
    borderColor?: string; 
    iconBgColor: string; 
}

const OverviewCard = ({ title, value, status, icon, bgColor, borderColor, iconBgColor }: OverviewCardProps) => {
    return (
        <Card className={`w-full p-2 ${bgColor} ${borderColor} shadow-sm rounded-lg`}>
            <CardHeader className="grid grid-cols-2 items-center gap-2 pt-0 pb-0.5">
                <div className="flex flex-col mt-8 space-y-2.5">
                    <CardTitle className="text-lg font-light text-black">{title}</CardTitle>
                    <div className="text-2xl">{value}</div>
                </div>
                <div className="flex items-center justify-end mt-6">
                    <div className={`p-4 ${iconBgColor} rounded-full`}>{icon}</div> {/* Apply bg color and rounded-full to icon container */}
                </div>
            </CardHeader>
            <CardContent className="pt-0.5">
                {status && <p className="text-xs text-gray-500 mt-1">{status}</p>}
            </CardContent>
        </Card>
    );
};

export default OverviewCard;