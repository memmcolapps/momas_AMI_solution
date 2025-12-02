export const meterNumbers = [
  "621245698701",
  "621245698702",
  "621245698703",
  "621245698704",
  "621245698705",
  "621245698706",
];

export const feeders = [
  "Ijeun Feeder 1",
  "Ijeun Feeder 2",
  "Ikeja Feeder 3",
  "Lekki Feeder 1",
  "Apapa Feeder 2",
  "Surulere Feeder 1",
];

export const eventTypes = [
  "Load Profile 1",
  "Load Profile 2",
  "Daily Billing",
  "Monthly Billing",
];

export const meterModels = [
  "Model A100",
  "Model B200",
  "Model C300",
  "Model D400",
  "Model E500",
  "Model F600",
  "Model G700",
  "Model H800",
];

export interface CommunicationReportData {
  serialNumber: string;
  meterNo: string;
  meterModel?: string;
  status: string;
  lastSync?: string;
  location?: string;
  relayControl?: string;
  tamperState?: string;
  tamperSync?: string;
  relaySync?: string;
}

export const communicationReportMergedDummyData: CommunicationReportData[] = [
  //Md
  {
    serialNumber: "SNMD0001",
    meterNo: "6212456987",
    meterModel: "MMX 310 -NG",
    status: "Online",
    lastSync: "1:32am",
    tamperState: "Tampered",
    tamperSync: "2025-11-18 17:30:12",
    relayControl: "Connected",
    relaySync: "2025-11-18 19:10:47",
    location: "KM 40, Lagos - Ibadan Expressway, Ogun",
  },
  {
    serialNumber: "SNMD0002",
    meterNo: "6212456987",
    meterModel: "MMX 310 -NG",
    status: "Online",
    lastSync: "1:32am",
    tamperState: "Tampered",
    tamperSync: "2025-11-18 17:30:12",
    relayControl: "Disconnected",
    relaySync: "2025-11-18 19:10:47",
    location: "KM 40, Lagos - Ibadan Expressway, Ogun",
  },
  {
    serialNumber: "SNMD0003",
    meterNo: "6212456987",
    meterModel: "MMX 310 -NG",
    status: "Offline",
    lastSync: "1:32am",
    tamperState: "Tampered",
    tamperSync: "2025-11-18 17:30:12",
    relayControl: "Connected",
    relaySync: "2025-11-18 19:10:47",
    location: "KM 40, Lagos - Ibadan Expressway, Ogun",
  },
  {
    serialNumber: "SNMD0004",
    meterNo: "6212456987",
    meterModel: "MMX 310 -NG",
    lastSync: "1:32am",
    tamperState: "Tampered",
    tamperSync: "2025-11-18 17:30:12",
    relayControl: "Connected",
    relaySync: "2025-11-18 19:10:47",
    location: "KM 40, Lagos - Ibadan Expressway, Ogun",
    status: "Offline",
  },

  // non md
  {
    serialNumber: "SNNMD0001",
    meterNo: "6212456987",
    meterModel: "MMX 310 -NG",
    lastSync: "1:32am",
    tamperState: "Tampered",
    tamperSync: "2025-11-18 17:30:12",
    relayControl: "Disconnected",
    relaySync: "2025-11-18 19:10:47",
    location: "KM 40, Lagos - Ibadan Expressway, Ogun",
    status: "Online",
  },
  {
    serialNumber: "SNNMD0002",
    meterNo: "6212456987",
    meterModel: "MMX 310 -NG",
    lastSync: "1:32am",
    tamperState: "Tampered",
    tamperSync: "2025-11-18 17:30:12",
    relayControl: "Connected",
    relaySync: "2025-11-18 19:10:47",
    location: "KM 40, Lagos - Ibadan Expressway, Ogun",
    status: "Offline",
  },
  {
    serialNumber: "SNNMD0003",
    meterNo: "6212456987",
    meterModel: "MMX 310 -NG",
    lastSync: "1:32am",
    tamperState: "Tampered",
    tamperSync: "2025-11-18 17:30:12",
    relayControl: "Disconnected",
    relaySync: "2025-11-18 19:10:47",
    location: "KM 40, Lagos - Ibadan Expressway, Ogun",
    status: "Online",
  },
  {
    serialNumber: "SNNMD0004",
    meterNo: "6212456987",
    meterModel: "MMX 310 -NG",
    lastSync: "1:32am",
    tamperState: "Tampered",
    tamperSync: "2025-11-18 17:30:12",
    relayControl: "Connected",
    relaySync: "2025-11-18 19:10:47",
    location: "KM 40, Lagos - Ibadan Expressway, Ogun",
    status: "Offline",
  },
];
