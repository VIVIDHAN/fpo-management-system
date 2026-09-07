import React, { useState } from 'react';
import { mockKPIs, mockProcurements, mockSalesOrders } from '../utils/mockData';
import { BarChart3, TrendingUp, Download, Filter, ArrowUpRight, PieChart } from 'lucide-react';
import { useToast } from '../components/Toast';

const Analytics = () => {
  const { addToast } = useToast() || { addToast: console.log };
  const [dateRange, setDateRange] = useState('This Month');
  const [commodityFilter, setCommodityFilter] = useState('ALL');

  const handleExport = (format) => {
    addToast?.(`Exporting operational analytics report as ${format.toUpperCase()}...`, 'info');
    setTimeout(() => {
      addToast?.(`Report successfully exported to downloads folder as FPO_Analytics_${Date.now()}.${format}`, 'success');
    }, 1000);
  };

  const totalProcurementKg = mockProcurements.reduce((acc, curr) => acc + curr.quantityKg, 0);
  const totalSalesKg = mockSalesOrders.reduce((acc, curr) => acc + curr.quantityKg, 0);
  const totalSalesRevenue = mockSalesOrders.reduce((acc, curr) => acc + (curr.quantityKg * curr.pricePerKg), 0);
  const totalProcurementCost = mockProcurements.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const grossMargin = totalSalesRevenue - totalProcurementCost;

  return (
    <div className="pb-10">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Analytics & Reporting Dashboard</h1>
          <p className="text-slate-500 text-xs font-medium">Real-time operational KPIs, market margin analysis, and compliance benchmarks.</p>
        </div>

        {/* Parametric Export Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs">
            <Filter size={14} className="text-slate-400" />
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="bg-transparent focus:outline-none cursor-pointer">
              <option value="This Month">This Month</option>
              <option value="Last Quarter">Last Quarter</option>
              <option value="Year 2024">Year 2024</option>
            </select>
          </div>

          <button onClick={() => handleExport('csv')} className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors shadow-2xs">
            CSV
          </button>
          <button onClick={() => handleExport('xlsx')} className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors shadow-2xs">
            Excel
          </button>
          <button onClick={() => handleExport('pdf')} className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs">
            <Download size={14} /> PDF Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-up">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales Revenue</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              +14.2% <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">₹{(totalSalesRevenue / 100000).toFixed(2)}L</h3>
          <p className="text-[11px] text-slate-400 mt-1">Across APMC, e-NAM, & Private Buyers</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Procurement Volume</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              +8.5% <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">{(totalProcurementKg / 1000).toFixed(1)} MT</h3>
          <p className="text-[11px] text-slate-400 mt-1">Aggregated directly from member farmers</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gross Trade Margin</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">₹{(grossMargin / 1000).toFixed(1)}k</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">FPO Net Profit Margin ~18.4%</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Warehouse Utilization</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">{mockKPIs.warehouseUtilization}%</h3>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">High Capacity Alert in Wada</p>
        </div>
      </div>

      {/* Analytics Visual Breakdown Cards */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        
        {/* Margin & Volume Analysis */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
            <h3 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-2">
              <BarChart3 size={18} className="text-emerald-600" /> Commodity Procurement vs Sales
            </h3>
            <span className="text-xs font-semibold text-slate-400">Metric MT</span>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">Wheat (Grade A)</span>
                <span className="text-slate-900">4.5 MT Procured / 5.0 MT Sold</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full rounded-l-full" style={{ width: '65%' }}></div>
                <div className="bg-blue-500 h-full rounded-r-full" style={{ width: '35%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">Soybean (Grade A)</span>
                <span className="text-slate-900">2.2 MT Procured / 18.0 MT Sold</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full rounded-l-full" style={{ width: '40%' }}></div>
                <div className="bg-blue-500 h-full rounded-r-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">Rice (Grade B)</span>
                <span className="text-slate-900">0.8 MT Procured / 3.0 MT Sold</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full rounded-l-full" style={{ width: '50%' }}></div>
                <div className="bg-blue-500 h-full rounded-r-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Intelligence */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
            <h3 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-600" /> Predictive Demand & Risk Indicators
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">AI Insights</span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
              <h4 className="text-xs font-bold text-emerald-900 mb-1">High Demand Forecast: Soybean</h4>
              <p className="text-[11px] text-emerald-700">Market demand for Soybean is predicted to rise by 12% next month. Recommend increasing collection center allocations in Wada.</p>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl">
              <h4 className="text-xs font-bold text-amber-900 mb-1">Inventory Holding Risk: Rice</h4>
              <p className="text-[11px] text-amber-700">Storage duration for Wada Facility Rice lots is approaching 45 days. Suggest initiating APMC auction before quality degradation.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Analytics;
