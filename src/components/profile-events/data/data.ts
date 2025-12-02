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


export interface NodeInfo {
  name?: string;
  type?: string;
  nodeId?: string;
  regionId?: string;
  bhubId?: string;
  id?: string;
}

export interface Node {
  id: string;
  name: string;
  nodeInfo?: NodeInfo;
  nodesTree?: Node[];
}

export const DUMMY_NODES: Node[] = [
  {
    id: "1",
    name: "Headquarters",
    nodeInfo: {
      name: "Headquarters",
      type: "Region",
      nodeId: "HQ-001",
    },
    nodesTree: [
      {
        id: "2",
        name: "North Business Hub",
        nodeInfo: {
          name: "North Business Hub",
          type: "Business Hub",
          bhubId: "BH-N001",
        },
        nodesTree: [
          {
            id: "3",
            name: "North Service Center",
            nodeInfo: {
              name: "North Service Center",
              type: "Service Center",
              id: "SC-N001",
            },
            nodesTree: [
              {
                id: "4",
                name: "Main Substation",
                nodeInfo: {
                  name: "Main Substation",
                  type: "Substation",
                  id: "SS-001",
                },
                nodesTree: [
                  {
                    id: "5",
                    name: "Feeder A1",
                    nodeInfo: {
                      name: "Feeder A1",
                      type: "Feeder Line",
                      id: "FL-A1",
                    },
                    nodesTree: [
                      {
                        id: "6",
                        name: "DSS Alpha",
                        nodeInfo: {
                          name: "DSS Alpha",
                          type: "DSS",
                          id: "DSS-001",
                        },
                        nodesTree: [],
                      },
                    ],
                  },
                  {
                    id: "7",
                    name: "Feeder A2",
                    nodeInfo: {
                      name: "Feeder A2",
                      type: "Feeder Line",
                      id: "FL-A2",
                    },
                    nodesTree: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "8",
        name: "South Business Hub",
        nodeInfo: {
          name: "South Business Hub",
          type: "Business Hub",
          bhubId: "BH-S001",
        },
        nodesTree: [
          {
            id: "9",
            name: "South Service Center",
            nodeInfo: {
              name: "South Service Center",
              type: "Service Center",
              id: "SC-S001",
            },
            nodesTree: [],
          },
        ],
      },
    ],
  },
  {
    id: "10",
    name: "East Region",
    nodeInfo: {
      name: "East Region",
      type: "Region",
      regionId: "RG-E001",
    },
    nodesTree: [
      {
        id: "11",
        name: "East Business Hub",
        nodeInfo: {
          name: "East Business Hub",
          type: "Business Hub",
          bhubId: "BH-E001",
        },
        nodesTree: [],
      },
    ],
  },
];