// mockData.js - Dummy data for UI/UX testing

export const mockMembers = [
  { id: 1, memberId: 'FPO-M-1001', name: 'Rajesh Kumar', phone: '9876543210', village: 'Palghar', landHolding: 4.5, shareCapital: 5000, joiningDate: '2023-01-15', status: 'ACTIVE' },
  { id: 2, memberId: 'FPO-M-1002', name: 'Sita Devi', phone: '8765432109', village: 'Dahanu', landHolding: 2.0, shareCapital: 1000, joiningDate: '2023-03-22', status: 'ACTIVE' },
  { id: 3, memberId: 'FPO-M-1003', name: 'Anil Desai', phone: '7654321098', village: 'Wada', landHolding: 12.5, shareCapital: 10000, joiningDate: '2022-11-05', status: 'ACTIVE' },
  { id: 4, memberId: 'FPO-M-1004', name: 'Priya Patel', phone: '6543210987', village: 'Boisar', landHolding: 3.2, shareCapital: 2500, joiningDate: '2024-02-10', status: 'INACTIVE' },
  { id: 5, memberId: 'FPO-M-1005', name: 'Vikram Singh', phone: '5432109876', village: 'Palghar', landHolding: 8.0, shareCapital: 7500, joiningDate: '2023-08-14', status: 'ACTIVE' },
];

export const mockProcurements = [
  { id: 101, memberId: 'FPO-M-1001', memberName: 'Rajesh Kumar', commodity: 'Wheat', quantityKg: 1500, grade: 'A', date: '2024-04-10', pricePerKg: 24.50, totalAmount: 36750, paymentStatus: 'PAID' },
  { id: 102, memberId: 'FPO-M-1002', memberName: 'Sita Devi', commodity: 'Rice', quantityKg: 800, grade: 'B', date: '2024-04-12', pricePerKg: 32.00, totalAmount: 25600, paymentStatus: 'PENDING' },
  { id: 103, memberId: 'FPO-M-1005', memberName: 'Vikram Singh', commodity: 'Soybean', quantityKg: 2200, grade: 'A', date: '2024-04-15', pricePerKg: 45.00, totalAmount: 99000, paymentStatus: 'PAID' },
  { id: 104, memberId: 'FPO-M-1001', memberName: 'Rajesh Kumar', commodity: 'Cotton', quantityKg: 500, grade: 'REJECT', date: '2024-04-18', pricePerKg: 0, totalAmount: 0, paymentStatus: 'PENDING' },
];

export const mockSalesOrders = [
  { id: 201, buyerName: 'APMC Market Vashi', buyerType: 'APMC', commodity: 'Wheat', quantityKg: 5000, pricePerKg: 28.00, date: '2024-05-01', paymentReceived: true },
  { id: 202, buyerName: 'ITC Agrico', buyerType: 'PRIVATE', commodity: 'Soybean', quantityKg: 10000, pricePerKg: 48.50, date: '2024-05-05', paymentReceived: false },
  { id: 203, buyerName: 'e-NAM Trading Co', buyerType: 'E_NAM', commodity: 'Rice', quantityKg: 3000, pricePerKg: 35.00, date: '2024-05-10', paymentReceived: true },
];

export const mockWarehouses = [
  { id: 301, location: 'Palghar Central Hub', capacityMt: 500, currentStockMt: 320, commodity: 'Mixed', status: 'ACTIVE' },
  { id: 302, location: 'Wada Facility', capacityMt: 200, currentStockMt: 195, commodity: 'Rice, Wheat', status: 'FULL' },
  { id: 303, location: 'Dahanu Cold Storage', capacityMt: 100, currentStockMt: 0, commodity: 'None', status: 'MAINTENANCE' },
];

export const mockKPIs = {
  totalMembers: 1245,
  activeMembers: 1180,
  totalShareCapital: 4500000,
  monthlyProcurementMt: 345,
  monthlySalesRevenue: 12500000,
  warehouseUtilization: 78
};
