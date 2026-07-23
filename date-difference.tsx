'use client';

import { useState } from 'react';
import { calculateDateDifference } from '@/lib/utils';

export function DateDifferenceTool() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateDateDifference> | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    if (!startDate || !endDate) {
      setError('Please select both dates');
      return;
    }

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = calculateDateDifference(start, end);
      setResult(diff);
      setError('');
    } catch {
      setError('Invalid dates. Please select valid dates.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Calculate Difference
      </button>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Date Difference
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{result.years}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Years</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{result.months}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Months</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{result.weeks}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Weeks</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{result.days}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Days</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800 text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{result.totalDays.toLocaleString()}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Days</div>
          </div>
        </div>
      )}
    </div>
  );
}
