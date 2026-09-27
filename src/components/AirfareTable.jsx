import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  Filter,
  RotateCcw,
  Plane,
  ChevronLeft,
  ChevronRight,
  Database,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { filterRoutes, filterWindows, filterAirlines } from '../data/mockData';
import { airfareApi } from '../services/api';

export default function AirfareTable({ observations = [] }) {
  const [search, setSearch] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('ALL');
  const [selectedWindow, setSelectedWindow] = useState('ALL');
  const [selectedAirline, setSelectedAirline] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('departureDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const pageSize = 6;

  // Filter observations dynamically
  const filteredData = useMemo(() => {
    return observations.filter((item) => {
      // Search
      const matchesSearch =
        search === '' ||
        item.route.toLowerCase().includes(search.toLowerCase()) ||
        item.airline.toLowerCase().includes(search.toLowerCase()) ||
        item.airlineCode.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      // Route
      const matchesRoute = selectedRoute === 'ALL' || item.route === selectedRoute;

      // Window
      const matchesWindow = selectedWindow === 'ALL' || item.bookingWindow === selectedWindow;

      // Airline
      const matchesAirline =
        selectedAirline === 'ALL' ||
        item.airline.toLowerCase().includes(selectedAirline.toLowerCase());

      return matchesSearch && matchesRoute && matchesWindow && matchesAirline;
    });
  }, [observations, search, selectedRoute, selectedWindow, selectedAirline]);

  // Sort filtered data
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    data.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return sortOrder === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
    return data;
  }, [filteredData, sortField, sortOrder]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Reset page when filter changes
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedRoute('ALL');
    setSelectedWindow('ALL');
    setSelectedAirline('ALL');
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleExport = () => {
    airfareApi.exportToCsv(filteredData);
  };

  const hasActiveFilters =
    search !== '' ||
    selectedRoute !== 'ALL' ||
    selectedWindow !== 'ALL' ||
    selectedAirline !== 'ALL';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header & Filter Toolbar */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[19px] font-bold text-slate-900 tracking-tight">
                Latest Airfare Observations
              </h2>
              <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200/60 font-mono">
                {filteredData.length} Live Quotes
              </span>
            </div>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Recently processed airfare quotations across multi-carrier portals and aggregators
            </p>
          </div>

          {/* Search, Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search route or airline..."
                value={search}
                onChange={(e) => handleFilterChange(setSearch, e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 text-slate-800 text-[13px] rounded-lg border border-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
              />
              {search && (
                <button
                  onClick={() => handleFilterChange(setSearch, '')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Export CSV Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[13px] font-semibold transition-colors shadow-2xs"
              title="Download filtered records as CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-[12px] font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Dropdown Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2.5 flex-wrap text-[12px]">
          <div className="flex items-center gap-1 text-slate-500 font-semibold mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filters:</span>
          </div>

          {/* Route Dropdown */}
          <select
            value={selectedRoute}
            onChange={(e) => handleFilterChange(setSelectedRoute, e.target.value)}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {filterRoutes.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          {/* Booking Window Dropdown */}
          <select
            value={selectedWindow}
            onChange={(e) => handleFilterChange(setSelectedWindow, e.target.value)}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {filterWindows.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>

          {/* Airline Dropdown */}
          <select
            value={selectedAirline}
            onChange={(e) => handleFilterChange(setSelectedAirline, e.target.value)}
            className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {filterAirlines.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        {paginatedData.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th
                  onClick={() => handleSort('route')}
                  className="py-3 px-5 cursor-pointer hover:text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Route</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('airline')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Airline</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('bookingWindow')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Window</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('departureDate')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Departure</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('baseFare')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Base Fare</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Taxes</th>
                <th
                  onClick={() => handleSort('totalFare')}
                  className="py-3 px-5 cursor-pointer hover:text-slate-800 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Total Fare</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('change')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Change</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px]">
              {paginatedData.map((row) => {
                const isPositiveChange = row.change > 0;
                const isHighIncrease = row.change >= 15;
                const isModerateIncrease = row.change >= 8 && row.change < 15;
                const isDecrease = row.change < 0;

                return (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Route */}
                    <td className="py-3.5 px-5 font-bold text-slate-900 flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-blue-500 transform -rotate-45" />
                      <span>{row.route}</span>
                    </td>

                    {/* Airline & Flight Number */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{row.airline}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {row.airlineCode}
                      </div>
                    </td>

                    {/* Booking Window */}
                    <td className="py-3.5 px-4 font-mono font-medium">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          row.bookingWindow === 'T+1'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {row.bookingWindow}
                      </span>
                    </td>

                    {/* Departure Date & Time */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{row.departureDate}</div>
                      <div className="text-[11px] text-slate-400">{row.departureTime}</div>
                    </td>

                    {/* Base Fare */}
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                      ₹{row.baseFare.toLocaleString('en-IN')}
                    </td>

                    {/* Taxes */}
                    <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                      ₹{row.taxes.toLocaleString('en-IN')}
                    </td>

                    {/* Total Fare */}
                    <td className="py-3.5 px-5 text-right font-mono font-bold text-slate-900">
                      ₹{row.totalFare.toLocaleString('en-IN')}
                    </td>

                    {/* Change % */}
                    <td className="py-3.5 px-4 text-right font-bold font-mono">
                      <span
                        className={`${
                          isHighIncrease
                            ? 'text-rose-600'
                            : isModerateIncrease
                            ? 'text-amber-600'
                            : isDecrease
                            ? 'text-emerald-600'
                            : 'text-blue-600'
                        }`}
                      >
                        {isPositiveChange ? '+' : ''}
                        {row.change}%
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-5 text-center">
                      {row.status === 'Available' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/80 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" />
                          Sold Out
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          /* Empty State */
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="text-[15px] font-bold text-slate-800">
              No airfare observations match the selected filters
            </h4>
            <p className="text-[13px] text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your route, booking window, or airline search criteria to see active observations.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-[13px] font-semibold hover:bg-blue-700 transition-colors shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-600">
        <div>
          Showing{' '}
          <strong className="text-slate-800">
            {sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </strong>{' '}
          to{' '}
          <strong className="text-slate-800">
            {Math.min(currentPage * pageSize, sortedData.length)}
          </strong>{' '}
          of <strong className="text-slate-800">1,248</strong> total observations
          {hasActiveFilters && ` (${sortedData.length} filtered)`}
        </div>

        {/* Page Nav Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-medium flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-7 h-7 rounded-md font-semibold text-[12px] transition-colors ${
                currentPage === pageNum
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-medium flex items-center gap-1 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
