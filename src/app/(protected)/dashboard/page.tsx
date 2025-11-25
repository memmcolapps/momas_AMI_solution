'use client'

import CommunicationSummaryChart from '@?/components/dashboard/Chart/communication_summary';
import RealtimeCommunicationLogsChart from '@?/components/dashboard/Chart/realtime_logs_chart';
import { FiltersOnly } from '@?/components/dashboard/filters';
import OverviewCard from '@?/components/dashboard/overview_cards';
import CommunicationReportTable from '@?/components/dashboard/Table/communication_report';
import EventTable from '@?/components/dashboard/Table/event_table';
import { Card } from '@?/components/ui/card';
import { ContentHeader } from '@?/components/ui/content_header'
import { Ban, CircleCheck, CircleCheckBig } from 'lucide-react';
import React, { useState } from 'react'

export default function Dashboard() {
  const [selectedBand, setSelectedBand] = useState("Band");
  const [selectedYear, setSelectedYear] = useState("Year");
  const [selectedMeterType, setSelectedMeterType] = useState("Meter Type");

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-screen-4xl space-y-6">
        <div className="flex items-start justify-between">
          <ContentHeader
            title="Overview"
            description="General overview of the HES dashboard "
          />
        </div>

        {/* Filters.  */}
        <section>
          <FiltersOnly
            selectedBand={selectedBand}
            setSelectedBand={setSelectedBand}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMeterType={selectedMeterType}
            setSelectedMeterType={setSelectedMeterType}
          />
        </section>

        {/* Card.  */}
        <Card className='bg-white border-gray-100 shadow-none px-4 py-6'>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <OverviewCard
              title="Total Smart Meters"
              icon={<CircleCheckBig color="oklch(62.3% 0.214 259.815)" />}
              bgColor={"bg-[#DBE6FE]"}
              iconBgColor={"bg-[#BFD3FE] rounded-full"}
              value={'4200'}
              status=""
              borderColor="border-[#DBE6FE]"
            />
            <OverviewCard
              title="Online"
              icon={<CircleCheck color="oklch(72.3% 0.219 149.579)" />}
              bgColor={"bg-[#DCFCE8]"}
              iconBgColor={"bg-[rgba(134,239,172,0.5)]"}
              value={'1200'}
              status=""
              borderColor="border-[#DCFCE8]"
            />

            <OverviewCard
              title="Offline"
              icon={<Ban color="oklch(79.5% 0.184 86.047)" />}
              bgColor={"bg-[#FEF2C3]"}
              iconBgColor={"bg-[#FEE78A]"}
              value={'200'}
              status=""
              borderColor="border-[#FEF2C3]"
            />
          </div>
        </Card>

        {/* Card 2  */}
        <Card className='bg-white border-gray-100 shadow-none px-4 py-6'>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
            <RealtimeCommunicationLogsChart title={'Real-time Communication Logs'}/>
            <EventTable/>
          </div>
        </Card>

          {/* Card 3  */}
        <Card className='bg-white border-gray-100 shadow-none px-4 py-6'>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
            <CommunicationSummaryChart />
            <CommunicationReportTable/>
          </div>
        </Card>
      </div>
    </div>
  )
}
