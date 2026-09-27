// Simulated API service for AirFareX Intelligence Engine

import {
  kpiSummary,
  kpiSparkline,
  indexTrendDaily,
  indexTrendWeekly,
  indexTrendMonthly,
  routeInflationData,
  leadTimeData,
  fareSpikeAlertData,
  dataQualityData,
  initialAirfareObservations,
} from '../data/mockData';

// Simulated delay helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const airfareApi = {
  // GET /api/index
  async getIndexSummary() {
    await delay(150);
    return {
      success: true,
      data: { ...kpiSummary, sparkline: kpiSparkline },
    };
  },

  // GET /api/trends?cadence=daily|weekly|monthly
  async getTrends(cadence = 'daily') {
    await delay(200);
    let series = indexTrendDaily;
    if (cadence === 'weekly') series = indexTrendWeekly;
    if (cadence === 'monthly') series = indexTrendMonthly;
    return {
      success: true,
      cadence,
      data: series,
    };
  },

  // GET /api/routes
  async getRouteInflation() {
    await delay(150);
    return {
      success: true,
      data: routeInflationData,
    };
  },

  // GET /api/lead-time
  async getLeadTimeAnalysis() {
    await delay(150);
    return {
      success: true,
      data: leadTimeData,
    };
  },

  // GET /api/fares?route=&airline=&window=&search=&page=&limit=
  async getAirfareObservations({
    route = 'ALL',
    airline = 'ALL',
    bookingWindow = 'ALL',
    search = '',
    page = 1,
    limit = 6,
    sortBy = 'departureDate',
    sortOrder = 'asc',
  } = {}) {
    await delay(150);

    let filtered = [...initialAirfareObservations];

    if (route && route !== 'ALL') {
      filtered = filtered.filter((item) => item.route === route);
    }

    if (airline && airline !== 'ALL') {
      filtered = filtered.filter((item) => item.airline.toLowerCase().includes(airline.toLowerCase()));
    }

    if (bookingWindow && bookingWindow !== 'ALL') {
      filtered = filtered.filter((item) => item.bookingWindow === bookingWindow);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.route.toLowerCase().includes(q) ||
          item.airline.toLowerCase().includes(q) ||
          item.airlineCode.toLowerCase().includes(q) ||
          item.source.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let valA = a[sortBy] ?? '';
      let valB = b[sortBy] ?? '';
      if (typeof valA === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return sortOrder === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
        hasPrevious: page > 1,
        hasNext: startIndex + limit < total,
      },
    };
  },

  // GET /api/data-quality
  async getDataQuality() {
    await delay(120);
    return {
      success: true,
      data: dataQualityData,
    };
  },

  // GET /api/alerts/spike
  async getFareSpikeAlert() {
    await delay(120);
    return {
      success: true,
      data: fareSpikeAlertData,
    };
  },

  // POST /api/collect (Triggers full data refresh pipeline)
  async refreshPipeline(onStepProgress) {
    const steps = [
      { id: 1, text: 'Connecting to airline & OTA data sources...' },
      { id: 2, text: 'Processing 1,248 airfare observations...' },
      { id: 3, text: 'Removing 43 duplicate records & normalizing taxes...' },
      { id: 4, text: 'Running Z-score outlier detection algorithms...' },
      { id: 5, text: 'Recalculating weighted Airfare Price Index (APIx)...' },
      { id: 6, text: 'Publishing updated intelligence to dashboard...' },
    ];

    for (let i = 0; i < steps.length; i++) {
      if (onStepProgress) {
        onStepProgress(i + 1, steps[i].text);
      }
      await delay(450);
    }

    const now = new Date();
    const formattedTime = `Today, ${now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}`;

    return {
      success: true,
      observationsProcessed: 1248,
      syncTime: formattedTime,
      newApix: 108.72,
    };
  },

  // Export observations to CSV helper
  exportToCsv(observations) {
    const headers = [
      'Observation ID',
      'Route',
      'Airline',
      'Flight Number',
      'Booking Window',
      'Departure Date',
      'Departure Time',
      'Base Fare (INR)',
      'Taxes & Fees (INR)',
      'Total Fare (INR)',
      'Inflation Change (%)',
      'Inventory Status',
      'Data Source',
    ];

    const rows = observations.map((o) => [
      o.id,
      `"${o.route}"`,
      `"${o.airline}"`,
      `"${o.airlineCode}"`,
      `"${o.bookingWindow}"`,
      `"${o.departureDate}"`,
      `"${o.departureTime}"`,
      o.baseFare,
      o.taxes,
      o.totalFare,
      o.change,
      `"${o.status}"`,
      `"${o.source}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AirFareX_Observations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
