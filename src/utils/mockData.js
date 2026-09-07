// mockData.js - Comprehensive mock dataset for FPO Management System

export const mockMembers = [
  { id: 1, memberId: 'FPO-M-1001', name: 'Rajesh Kumar', phone: '9876543210', village: 'Palghar', landHolding: 4.5, shareCapital: 5000, joiningDate: '2023-01-15', status: 'ACTIVE', email: 'rajesh@farm.org' },
  { id: 2, memberId: 'FPO-M-1002', name: 'Sita Devi', phone: '8765432109', village: 'Dahanu', landHolding: 2.0, shareCapital: 1000, joiningDate: '2023-03-22', status: 'ACTIVE', email: 'sita@farm.org' },
  { id: 3, memberId: 'FPO-M-1003', name: 'Anil Desai', phone: '7654321098', village: 'Wada', landHolding: 12.5, shareCapital: 10000, joiningDate: '2022-11-05', status: 'ACTIVE', email: 'anil@farm.org' },
  { id: 4, memberId: 'FPO-M-1004', name: 'Priya Patel', phone: '6543210987', village: 'Boisar', landHolding: 3.2, shareCapital: 2500, joiningDate: '2024-02-10', status: 'INACTIVE', email: 'priya@farm.org' },
  { id: 5, memberId: 'FPO-M-1005', name: 'Vikram Singh', phone: '5432109876', village: 'Palghar', landHolding: 8.0, shareCapital: 7500, joiningDate: '2023-08-14', status: 'ACTIVE', email: 'vikram@farm.org' },
  { id: 6, memberId: 'FPO-M-1006', name: 'Sunita Sharma', phone: '9123456780', village: 'Wada', landHolding: 6.0, shareCapital: 6000, joiningDate: '2023-09-01', status: 'ACTIVE', email: 'sunita@farm.org' },
];

export const mockProcurements = [
  { id: 101, memberId: 'FPO-M-1001', memberName: 'Rajesh Kumar', commodity: 'Wheat', quantityKg: 1500, grade: 'A', date: '2024-04-10', pricePerKg: 24.50, totalAmount: 36750, paymentStatus: 'PAID' },
  { id: 102, memberId: 'FPO-M-1002', memberName: 'Sita Devi', commodity: 'Rice', quantityKg: 800, grade: 'B', date: '2024-04-12', pricePerKg: 32.00, totalAmount: 25600, paymentStatus: 'PENDING' },
  { id: 103, memberId: 'FPO-M-1005', memberName: 'Vikram Singh', commodity: 'Soybean', quantityKg: 2200, grade: 'A', date: '2024-04-15', pricePerKg: 45.00, totalAmount: 99000, paymentStatus: 'PAID' },
  { id: 104, memberId: 'FPO-M-1001', memberName: 'Rajesh Kumar', commodity: 'Cotton', quantityKg: 500, grade: 'REJECT', date: '2024-04-18', pricePerKg: 0, totalAmount: 0, paymentStatus: 'PENDING' },
  { id: 105, memberId: 'FPO-M-1003', memberName: 'Anil Desai', commodity: 'Wheat', quantityKg: 3000, grade: 'A', date: '2024-04-20', pricePerKg: 25.00, totalAmount: 75000, paymentStatus: 'PAID' },
];

export const mockSalesOrders = [
  { id: 201, buyerName: 'APMC Market Vashi', buyerType: 'APMC', commodity: 'Wheat', quantityKg: 5000, pricePerKg: 28.00, date: '2024-05-01', paymentReceived: true },
  { id: 202, buyerName: 'ITC Agrico', buyerType: 'PRIVATE', commodity: 'Soybean', quantityKg: 10000, pricePerKg: 48.50, date: '2024-05-05', paymentReceived: false },
  { id: 203, buyerName: 'e-NAM Trading Co', buyerType: 'E_NAM', commodity: 'Rice', quantityKg: 3000, pricePerKg: 35.00, date: '2024-05-10', paymentReceived: true },
  { id: 204, buyerName: 'Global Agri Exports', buyerType: 'EXPORT', commodity: 'Soybean', quantityKg: 8000, pricePerKg: 52.00, date: '2024-05-15', paymentReceived: true },
];

export const mockWarehouses = [
  { id: 301, location: 'Palghar Central Hub', capacityMt: 500, currentStockMt: 320, commodity: 'Mixed', status: 'ACTIVE' },
  { id: 302, location: 'Wada Facility', capacityMt: 200, currentStockMt: 195, commodity: 'Rice, Wheat', status: 'FULL' },
  { id: 303, location: 'Dahanu Cold Storage', capacityMt: 100, currentStockMt: 0, commodity: 'None', status: 'MAINTENANCE' },
  { id: 304, location: 'Boisar Logistics Point', capacityMt: 350, currentStockMt: 140, commodity: 'Soybean', status: 'ACTIVE' },
];

export const mockShareCapital = [
  { memberId: 'FPO-M-1001', sharesCount: 50, shareValue: 100, totalValue: 5000, lastDividendPaid: 450, dividendDate: '2023-12-31' },
  { memberId: 'FPO-M-1002', sharesCount: 10, shareValue: 100, totalValue: 1000, lastDividendPaid: 90, dividendDate: '2023-12-31' },
  { memberId: 'FPO-M-1003', sharesCount: 100, shareValue: 100, totalValue: 10000, lastDividendPaid: 900, dividendDate: '2023-12-31' },
];

export const mockAuditLogs = [
  { id: 1, user: 'Admin User', role: 'ADMIN', action: 'CREATE_MEMBER', target: 'FPO-M-1006', timestamp: '2024-05-01 10:15:30', ip: '192.168.1.45', purpose: 'Farmer Onboarding' },
  { id: 2, user: 'Manager Vashi', role: 'FPO_MANAGER', action: 'APPROVE_PAYMENT', target: 'PROC-103', timestamp: '2024-05-02 14:22:10', ip: '192.168.1.88', purpose: 'Procurement Settlement' },
  { id: 3, user: 'Agent Dahanu', role: 'COLLECTION_AGENT', action: 'RECORD_PROCUREMENT', target: 'PROC-104', timestamp: '2024-05-03 09:05:12', ip: '192.168.1.102', purpose: 'Collection Entry' },
  { id: 4, user: 'Admin User', role: 'ADMIN', action: 'SYSTEM_CONFIG', target: 'JWT_EXPIRY', timestamp: '2024-05-04 16:40:00', ip: '192.168.1.45', purpose: 'Security Compliance' },
];

export const mockDocuments = [
  { id: 1, title: 'FPO Registration Certificate (FPC Act 2013)', category: 'Regulatory', version: 'v2.0', expiryDate: '2028-12-31', status: 'VERIFIED', uploadedBy: 'Admin' },
  { id: 2, title: 'NABARD Loan Linkage MOU 2024', category: 'Financial', version: 'v1.1', expiryDate: '2025-06-30', status: 'VERIFIED', uploadedBy: 'FPO Manager' },
  { id: 3, title: 'APMC Market License', category: 'Compliance', version: 'v3.0', expiryDate: '2024-11-15', status: 'EXPIRING_SOON', uploadedBy: 'Admin' },
  { id: 4, title: 'Warehouse Storage Audit Report', category: 'Audit', version: 'v1.0', expiryDate: '2025-01-20', status: 'VERIFIED', uploadedBy: 'Supervisor' },
];

export const mockKPIs = {
  totalMembers: 1245,
  activeMembers: 1180,
  totalShareCapital: 4500000,
  monthlyProcurementMt: 345,
  monthlySalesRevenue: 12500000,
  warehouseUtilization: 78
};
