import { Card, CardHeader, CardTitle, CardContent } from "@?/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@?/components/ui/table";

const tableData = [
    {
        id: 1,
        sn: '01',
        meterNo: '6212456987',
        time: '2025-07-26 00:00',
        eventType: 'Standard Event',
        event: 'Clock Invalid'
    },
    {
        id: 2,
        sn: '02',
        meterNo: '6212456987',
        time: '2025-07-26 00:00',
        eventType: 'Standard Event',
        event: 'Clock Invalid'
    },
    {
        id: 3,
        sn: '03',
        meterNo: '6212456987',
        time: '2025-07-26 00:00',
        eventType: 'Standard Event',
        event: 'Clock Invalid'
    },
]

const EventTable = () => {
    return (
        <Card className="w-full p-2 pb-0 max-h-[280px] bg-white shadow-none rounded-lg border border-gray-200">
            <CardHeader>
                <CardTitle className="text-gray-800 font-semibold text-sm md:text-base lg:text-lg">
                    Events
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow
                            className="border-b border-gray-200 hover:bg-[hsla(0,0%,20%,0.1)]"
                            style={{ backgroundColor: "hsla(0, 0%, 97%)" }}
                        >
                            <TableHead className="h-12 pl-6 text-base font-medium text-gray-700">
                                S/N
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Meter No
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Time
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Event Type
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Event
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tableData.map((data) => (
                            <TableRow key={data.id} className="hover:bg-gray-50 border-gray-200">
                                <TableCell className="py-6 pl-6">
                                    <div className="text-sm text-gray-900">{data.sn}</div>
                                </TableCell>

                                <TableCell className="text-sm text-gray-900">
                                    {data.meterNo}
                                </TableCell>

                                <TableCell className="text-sm text-gray-900">{data.time}</TableCell>

                                <TableCell className="py-4 max-w-xs">
                                    <div className="truncate text-sm text-gray-900">
                                        {data.eventType}
                                    </div>
                                </TableCell>

                                <TableCell className="text-sm text-gray-900">{data.event}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

    );
};

export default EventTable;