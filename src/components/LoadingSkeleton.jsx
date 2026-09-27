import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Overview Banner Skeleton */}
      <div className="h-28 bg-slate-200/80 rounded-2xl w-full" />

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-36 bg-slate-200/80 rounded-2xl" />
        ))}
      </div>

      {/* Big Chart Skeleton */}
      <div className="h-96 bg-slate-200/80 rounded-2xl w-full" />

      {/* 2-Column Analytics Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-slate-200/80 rounded-2xl" />
        <div className="h-80 bg-slate-200/80 rounded-2xl" />
      </div>

      {/* Table Skeleton */}
      <div className="h-96 bg-slate-200/80 rounded-2xl w-full" />
    </div>
  );
}
