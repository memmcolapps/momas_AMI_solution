export const ProfileConfigs = {
  "Load Profile 1": {
    headers: [
      "S/N",
      "Meter No.",
      "Time",
      "Meter Model",
      "Meter Health Indicator",
      "Total Instantaneous Active Power",
      "Total Instantaneous Apparent Power",
    ],
    model: [
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
    ],
    healthIndicator: ["0", "0", "0", "0", "0", "0"],
    totalActivePower: ["316.4", "316.4", "316.4", "316.4", "316.4", "316.4"],
    totalApparentPower: ["316.4", "316.4", "316.4", "316.4", "316.4", "316.4"],
    generateRow: (meterNo: string, feeder: string, timestamp: string) => ({
      meterNo,
      time: timestamp,
      meterModel:
        ProfileConfigs["Load Profile 1"].model[Math.floor(Math.random() * 6)],
      healthIndicator:
        ProfileConfigs["Load Profile 1"].healthIndicator[
          Math.floor(Math.random() * 6)
        ],
      totalActivePower:
        ProfileConfigs["Load Profile 1"].totalActivePower[
          Math.floor(Math.random() * 6)
        ],
      totalApparentPower:
        ProfileConfigs["Load Profile 1"].totalApparentPower[
          Math.floor(Math.random() * 6)
        ],
    }),
  },
  "Load Profile 2": {
    headers: [
      "S/N",
      "Meter No.",
      "Time",
      "Total Import Active Energy",
      "Total export Active Energy",
    ],
    totalImport: ["0", "0", "0", "0", "0"],
    totalExport: ["0", "0", "0", "0", "0"],
    generateRow: (meterNo: string, feeder: string, timestamp: string) => ({
      meterNo,
      time: timestamp,
      totalImport:
        ProfileConfigs["Load Profile 2"].totalImport[
          Math.floor(Math.random() * 5)
        ],
      totalExport:
        ProfileConfigs["Load Profile 2"].totalExport[
          Math.floor(Math.random() * 5)
        ],
    }),
  },
  "Daily Billing": {
    headers: [
      "S/N",
      "Meter No.",
      "Time",
      "Meter Model",
      "T1 Active Energy",
      "T2 Active Energy",
      "T3 Active Energy",
      "T4 Active Energy",
      "Total Active Energy",
      "Total Apparent Energy",
    ],
    model: [
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
    ],
    t1Active: [
      "277488.24",
      "277488.24",
      "277488.24",
      "277488.24",
      "277488.24",
      "277488.24",
    ],
    t2Active: ["487902", "487902", "487902", "487902", "487902", "487902"],
    t3Active: [
      "643226.32",
      "643226.32",
      "643226.32",
      "643226.32",
      "643226.32",
      "643226.32",
    ],
    t4Active: [
      "289214.72",
      "289214.72",
      "289214.72",
      "289214.72",
      "289214.72",
      "289214.72",
    ],
    totalActive: [
      "1697831.28",
      "1697831.28",
      "1697831.28",
      "1697831.28",
      "1697831.28",
      "1697831.28",
    ],
    totalApparentPower: ["316.4", "316.4", "316.4", "316.4", "316.4", "316.4"],
    generateRow: (meterNo: string, feeder: string, timestamp: string) => ({
      meterNo,
      time: timestamp,
      meterModel:
        ProfileConfigs["Daily Billing"].model[Math.floor(Math.random() * 6)],
      t1Active:
        ProfileConfigs["Daily Billing"].t1Active[Math.floor(Math.random() * 6)],
      t2Active:
        ProfileConfigs["Daily Billing"].t2Active[Math.floor(Math.random() * 6)],
      t3Active:
        ProfileConfigs["Daily Billing"].t3Active[Math.floor(Math.random() * 6)],
      t4Active:
        ProfileConfigs["Daily Billing"].t4Active[Math.floor(Math.random() * 6)],
      totalActivePower:
        ProfileConfigs["Daily Billing"].totalActive[
          Math.floor(Math.random() * 6)
        ],
      totalApparentPower:
        ProfileConfigs["Daily Billing"].totalApparentPower[
          Math.floor(Math.random() * 6)
        ],
    }),
  },
  "Monthly Billing": {
    headers: [
      "S/N",
      "Meter No.",
      "Time",
      "Meter Model",
      "Remaining Credit",
      "Total Absolute Energy",
      "Export Active Energy",
      "Import Active Energy",
      "Import Reactive Energy",
      "Export Reactive Energy",
      "Import Active MD",
      "T1 Active Energy",
      "T2 Active Energy",
      "T3 Active Energy",
      "T4 Active Energy",
      "Total Active Energy",
      "Total Apparent Energy",
      "Active Maximum Demand",
      "Total Apparent Demand",
      "Total Apparent Demand Time",
    ],
    model: [
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
      "MMX - 310",
    ],
    credit: ["0", "0", "0", "0", "0", "0"],
    totalAbsolute: [
      "1391190.88",
      "1391190.88",
      "1391190.88",
      "1391190.88",
      "1391190.88",
      "1391190.88",
    ],
    importActive: [
      "379270.56",
      "379270.56",
      "379270.56",
      "379270.56",
      "379270.56",
      "379270.56",
    ],
    exportActive: [
      "1011922.32",
      "1011922.32",
      "1011922.32",
      "1011922.32",
      "1011922.32",
      "1011922.32",
    ],
    importReactive: [
      "200890.56",
      "200890.56",
      "200890.56",
      "200890.56",
      "200890.56",
      "200890.56",
    ],
    exportReactive: [
      "1011922.32",
      "1011922.32",
      "1011922.32",
      "1011922.32",
      "1011922.32",
      "1011922.32",
    ],
    importActiveMd: ["0", "0", "0", "0", "0"],
    t1Active: [
      "277488.24",
      "277488.24",
      "277488.24",
      "277488.24",
      "277488.24",
      "277488.24",
    ],
    t2Active: ["487902", "487902", "487902", "487902", "487902", "487902"],
    t3Active: [
      "643226.32",
      "643226.32",
      "643226.32",
      "643226.32",
      "643226.32",
      "643226.32",
    ],
    t4Active: [
      "289214.72",
      "289214.72",
      "289214.72",
      "289214.72",
      "289214.72",
      "289214.72",
    ],
    totalActive: [
      "1697831.28",
      "1697831.28",
      "1697831.28",
      "1697831.28",
      "1697831.28",
      "1697831.28",
    ],
    totalApparentPower: ["316.4", "316.4", "316.4", "316.4", "316.4", "316.4"],
    activeMaxi: ["549.36", "549.36", "549.36", "549.36", "549.36", "549.36"],
    apparentDemand: [
      "549.44",
      "549.44",
      "549.44",
      "549.44",
      "549.44",
      "549.44",
    ],
    apparentDemandTime: [
      "2025-07-20 12:52:00",
      "2025-07-20 12:52:00",
      "2025-07-20 12:52:00",
      "2025-07-20 12:52:00",
      "2025-07-20 12:52:00",
      "2025-07-20 12:52:00",
    ],
    generateRow: (meterNo: string, feeder: string, timestamp: string) => ({
      meterNo,
      time: timestamp,
      meterModel:
        ProfileConfigs["Monthly Billing"].model[Math.floor(Math.random() * 6)],

      remainingCredit:
        ProfileConfigs["Monthly Billing"].credit[Math.floor(Math.random() * 6)],
      totalAbsolute:
        ProfileConfigs["Monthly Billing"].totalAbsolute[
          Math.floor(Math.random() * 6)
        ],
      importActive:
        ProfileConfigs["Monthly Billing"].importActive[
          Math.floor(Math.random() * 6)
        ],
      exportActive:
        ProfileConfigs["Monthly Billing"].exportActive[
          Math.floor(Math.random() * 6)
        ],
      importReactive:
        ProfileConfigs["Monthly Billing"].importReactive[
          Math.floor(Math.random() * 6)
        ],
      exportReactive:
        ProfileConfigs["Monthly Billing"].exportReactive[
          Math.floor(Math.random() * 6)
        ],
      importActiveMd:
        ProfileConfigs["Monthly Billing"].importActiveMd[
          Math.floor(Math.random() * 6)
        ],
      t1Active:
        ProfileConfigs["Monthly Billing"].t1Active[
          Math.floor(Math.random() * 6)
        ],
      t2Active:
        ProfileConfigs["Monthly Billing"].t2Active[
          Math.floor(Math.random() * 6)
        ],
      t3Active:
        ProfileConfigs["Monthly Billing"].t3Active[
          Math.floor(Math.random() * 6)
        ],
      t4Active:
        ProfileConfigs["Monthly Billing"].t4Active[
          Math.floor(Math.random() * 6)
        ],
      totalActive:
        ProfileConfigs["Monthly Billing"].totalActive[
          Math.floor(Math.random() * 6)
        ],
      totalApparentPower:
        ProfileConfigs["Monthly Billing"].totalApparentPower[
          Math.floor(Math.random() * 6)
        ],
      activeMaxi:
        ProfileConfigs["Monthly Billing"].activeMaxi[
          Math.floor(Math.random() * 6)
        ],
      apparentDemand:
        ProfileConfigs["Monthly Billing"].apparentDemand[
          Math.floor(Math.random() * 6)
        ],
      apparentDemandTime:
        ProfileConfigs["Monthly Billing"].apparentDemandTime[
          Math.floor(Math.random() * 6)
        ],
    }),
  },
};
