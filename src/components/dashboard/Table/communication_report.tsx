import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const tableData = [
    {
        id: 1,
        sn: '01',
        meterNo: '6212456987',
        meterModel: 'MMX 310 -NG',
        lastSync: '1 mins ago',
        status: true,
    },
    {
        id: 2,
        sn: '02',
        meterNo: '6212456987',
        meterModel: 'MMX 310 -NG',
        lastSync: '1 mins ago',
        status: true,
    },
    {
        id: 3,
        sn: '03',
        meterNo: '6212456987',
        meterModel: 'MMX 310 -NG',
        lastSync: '1 mins ago',
        status: false
    },
      {
        id: 4,
        sn: '04',
        meterNo: '6212456987',
        meterModel: 'MMX 310 -NG',
        lastSync: '1 mins ago',
        status: false
    },
]

const CommunicationReportTable = () => {
    return (
        <Card className="w-full p-2 pb-0 max-h-[280px] bg-white shadow-none rounded-lg border border-gray-200">
            <CardHeader>
                <CardTitle className="text-gray-800 font-semibold text-sm md:text-base lg:text-lg">
                    Communication Report
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
                                Meter Model
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Status
                            </TableHead>
                            <TableHead className="h-12 text-base font-medium text-gray-700">
                                Last Sync
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

                                <TableCell className="text-sm text-gray-900">{data.meterModel}</TableCell>

                                <TableCell className="py-4">
                                    {data.status === true ? (
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-50 rounded-xl px-2 py-1 text-green-500 hover:bg-green-50"
                                        >
                                            Online
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="secondary"
                                            className="bg-red-50 rounded-xl px-2 py-1 text-red-500 hover:bg-red-50"
                                        >
                                            Offline
                                        </Badge>
                                    )}
                                </TableCell>

                                <TableCell className="text-sm text-gray-900">{data.lastSync}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

    );
};

export default CommunicationReportTable;