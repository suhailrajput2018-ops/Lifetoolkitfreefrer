'use client';

import { useState } from 'react';
import { calculateAge } from '@/lib/utils';

export function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateAge> | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    if (!birthDate) {
      setError('Please select your birth date');
      return;
    }

    try {
      const birth = new Date(birthDate);
      const now = new Date();
      
      if (birth > now) {
        setError('Birth date cannot be in the future');
        return;
      }

      const age = calculateAge(birth);
      setResult(age);
      setError('');
    } catch {
      setError('Invalid date. Please select a valid birth date.');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Birth Date
        </label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Calculate Age
      </button>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {result && (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Your Age
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.years}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Years</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.months}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Months</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.days}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Days</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.weeks}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Weeks</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{result.hours.toLocaleString()}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Hours</div>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{result.minutes.toLocaleString()}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Minutes</div>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{result.seconds.toLocaleString()}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Seconds</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
