// Export all tool components from a single file for efficiency
'use client';

import { useState, useRef } from 'react';
import { calculateBMI, calculateBMR, calculateTDEE, calculateEMI, calculateMortgage, calculateTip, calculateFuelCost, calculatePercentage, calculatePercentageValue, calculatePercentageChange, generatePassword, checkPasswordStrength, generateUUID, generateRandomNumber, countText, convertCase, removeDuplicateLines, formatJSON, base64Encode, base64Decode, urlEncode, urlDecode, hexToRgb, rgbToHex, rgbToHsl, hslToRgb, formatCurrency, formatNumber } from '@/lib/utils';
import QRCode from 'qrcode';

// Reusable Input Component
function ToolInput({ label, value, onChange, type = 'text', placeholder, min, max, step, suffix }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="w-full px-4 py-2 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// Reusable Select Component
function ToolSelect({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

// Reusable Button Component
function ToolButton({ onClick, children, fullWidth = true }: any) {
  return (
    <button
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors`}
    >
      {children}
    </button>
  );
}

// Reusable Result Card
function ResultCard({ title, children, color = 'blue' }: any) {
  const colors: any = {
    blue: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800',
    green: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800',
    purple: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800',
  };

  return (
    <div className={`p-6 bg-gradient-to-br ${colors[color]} rounded-xl border`}>
      {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>}
      {children}
    </div>
  );
}

// BMI Calculator
export function BMICalculatorTool() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return;

    let weightKg = w;
    let heightCm = h;

    if (unit === 'imperial') {
      weightKg = w * 0.453592;
      heightCm = h * 2.54;
    }

    setResult(calculateBMI(weightKg, heightCm));
  };

  return (
    <div className="space-y-4">
      <ToolSelect
        label="Unit System"
        value={unit}
        onChange={setUnit}
        options={[
          { value: 'metric', label: 'Metric (kg, cm)' },
          { value: 'imperial', label: 'Imperial (lbs, inches)' },
        ]}
      />
      <ToolInput
        label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
        value={weight}
        onChange={setWeight}
        type="number"
        placeholder="70"
      />
      <ToolInput
        label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
        value={height}
        onChange={setHeight}
        type="number"
        placeholder="175"
      />
      <ToolButton onClick={handleCalculate}>Calculate BMI</ToolButton>
      {result && (
        <ResultCard title="BMI Result">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{result.bmi}</div>
            <div className="text-lg font-medium text-slate-900 dark:text-white mb-2">{result.category}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Healthy weight range: {result.healthyRange}
            </div>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Password Generator
export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [password, setPassword] = useState('');

  const handleGenerate = () => {
    setPassword(generatePassword(length, options));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="space-y-4">
      <ToolInput
        label="Password Length"
        value={length}
        onChange={(v: string) => setLength(Math.min(64, Math.max(8, parseInt(v) || 8)))}
        type="number"
        min="8"
        max="64"
      />
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(options).map(([key, value]) => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">
              {key}
            </span>
          </label>
        ))}
      </div>
      <ToolButton onClick={handleGenerate}>Generate Password</ToolButton>
      {password && (
        <ResultCard title="Generated Password">
          <div className="flex items-center space-x-3">
            <code className="flex-1 text-lg font-mono bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded break-all">
              {password}
            </code>
            <button
              onClick={copyToClipboard}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
              title="Copy to clipboard"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Password Strength Checker
export function PasswordStrengthTool() {
  const [password, setPassword] = useState('');
  const result = checkPasswordStrength(password);

  const strengthColors = {
    weak: 'bg-red-500',
    fair: 'bg-orange-500',
    good: 'bg-yellow-500',
    strong: 'bg-lime-500',
    'very strong': 'bg-green-500',
  };

  return (
    <div className="space-y-4">
      <ToolInput
        label="Enter Password"
        value={password}
        onChange={setPassword}
        type="text"
        placeholder="Type or paste your password"
      />
      {password && (
        <ResultCard title="Password Strength">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400">Strength</span>
                <span className="font-medium capitalize">{result.strength}</span>
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strengthColors[result.strength]} transition-all`}
                  style={{ width: `${(result.score / 7) * 100}%` }}
                />
              </div>
            </div>
            {result.feedback.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Suggestions:</h4>
                <ul className="space-y-1">
                  {result.feedback.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                      <span className="mr-2">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// UUID Generator
export function UUIDGeneratorTool() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = () => {
    const newUuids = Array.from({ length: Math.min(count, 100) }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <div className="space-y-4">
      <ToolInput
        label="Number of UUIDs"
        value={count}
        onChange={(v: string) => setCount(Math.min(100, Math.max(1, parseInt(v) || 1)))}
        type="number"
        min="1"
        max="100"
      />
      <ToolButton onClick={handleGenerate}>Generate UUIDs</ToolButton>
      {uuids.length > 0 && (
        <ResultCard title={`Generated ${uuids.length} UUID(s)`}>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center space-x-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                <code className="flex-1 text-sm font-mono break-all">{uuid}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(uuid)}
                  className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button onClick={copyAll} className="mt-3 text-sm text-blue-600 hover:underline">Copy all</button>
        </ResultCard>
      )}
    </div>
  );
}

// Random Number Generator
export function RandomNumberGeneratorTool() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);

  const handleGenerate = () => {
    const minNum = min || 0;
    const maxNum = max || 100;
    const countNum = Math.min(count || 1, 100);
    
    if (unique && countNum > (maxNum - minNum + 1)) {
      alert('Cannot generate more unique numbers than the range allows');
      return;
    }

    const nums: number[] = [];
    if (unique) {
      const available = Array.from({ length: maxNum - minNum + 1 }, (_, i) => minNum + i);
      for (let i = 0; i < countNum; i++) {
        const idx = generateRandomNumber(0, available.length - 1);
        nums.push(available.splice(idx, 1)[0]);
      }
    } else {
      for (let i = 0; i < countNum; i++) {
        nums.push(generateRandomNumber(minNum, maxNum));
      }
    }
    setNumbers(nums);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <ToolInput label="Min" value={min} onChange={setMin} type="number" />
        <ToolInput label="Max" value={max} onChange={setMax} type="number" />
      </div>
      <ToolInput label="Count" value={count} onChange={setCount} type="number" min="1" max="100" />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={unique}
          onChange={(e) => setUnique(e.target.checked)}
          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-slate-700 dark:text-slate-300">Unique numbers only</span>
      </label>
      <ToolButton onClick={handleGenerate}>Generate</ToolButton>
      {numbers.length > 0 && (
        <ResultCard title="Generated Numbers">
          <div className="flex flex-wrap gap-2">
            {numbers.map((num, i) => (
              <span key={i} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-mono text-lg">
                {num}
              </span>
            ))}
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Text Counter / Word Counter / Character Counter / Reading Time Calculator
export function TextCounterTool() {
  const [text, setText] = useState('');
  const stats = countText(text);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Enter Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={8}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <ResultCard title="Text Statistics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.characters}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Characters</div>
          </div>
          <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.charactersNoSpaces}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">No Spaces</div>
          </div>
          <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.words}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Words</div>
          </div>
          <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.readingTimeMinutes}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Min Read</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-2 bg-white dark:bg-slate-800 rounded">
            <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.sentences}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Sentences</div>
          </div>
          <div className="p-2 bg-white dark:bg-slate-800 rounded">
            <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.paragraphs}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Paragraphs</div>
          </div>
          <div className="p-2 bg-white dark:bg-slate-800 rounded">
            <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.lines}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Lines</div>
          </div>
        </div>
      </ResultCard>
    </div>
  );
}

export const WordCounterTool = TextCounterTool;
export const CharacterCounterTool = TextCounterTool;
export const ReadingTimeCalculatorTool = TextCounterTool;

// Case Converter
export function CaseConverterTool() {
  const [text, setText] = useState('');
  const [caseType, setCaseType] = useState('uppercase');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    setResult(convertCase(text, caseType));
  };

  const caseOptions = [
    { value: 'uppercase', label: 'UPPERCASE' },
    { value: 'lowercase', label: 'lowercase' },
    { value: 'titlecase', label: 'Title Case' },
    { value: 'sentencecase', label: 'Sentence case' },
    { value: 'alternating', label: 'aLtErNaTiNg' },
    { value: 'inverse', label: 'INVERSE cASE' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Enter Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ToolSelect label="Convert To" value={caseType} onChange={setCaseType} options={caseOptions} />
      <ToolButton onClick={handleConvert}>Convert</ToolButton>
      {result && (
        <ResultCard title="Result">
          <div className="flex items-center space-x-3">
            <div className="flex-1 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg break-words">{result}</div>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Remove Duplicates
export function RemoveDuplicatesTool() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleRemove = () => {
    setResult(removeDuplicateLines(text));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Enter Text (one item per line)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="item1&#10;item2&#10;item1&#10;item3"
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />
      </div>
      <ToolButton onClick={handleRemove}>Remove Duplicates</ToolButton>
      {result && (
        <ResultCard title={`Result (${result.split('\n').length} unique lines)`}>
          <div className="flex items-start space-x-3">
            <pre className="flex-1 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-auto max-h-64 text-sm font-mono">
              {result}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// JSON Formatter
export function JSONFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const handleFormat = () => {
    const result = formatJSON(input);
    setOutput(result.formatted);
    setValid(result.valid);
    setError(result.error || '');
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setValid(true);
      setError('');
    } catch (e: any) {
      setOutput(input);
      setValid(false);
      setError(e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          JSON Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder='{"key": "value"}'
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />
      </div>
      <div className="flex gap-3">
        <button onClick={handleFormat} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          Format/Beautify
        </button>
        <button onClick={handleMinify} className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg">
          Minify
        </button>
      </div>
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}
      {output && (
        <ResultCard title={valid ? 'Valid JSON' : 'Invalid JSON'} color={valid ? 'green' : 'purple'}>
          <div className="flex items-start space-x-3">
            <pre className="flex-1 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-auto max-h-96 text-sm font-mono">
              {output}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Base64 Converter
export function Base64ConverterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    try {
      setOutput(mode === 'encode' ? base64Encode(input) : base64Decode(input));
    } catch {
      setOutput('Error: Invalid input for ' + mode);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          onClick={() => setMode('encode')}
          className={`flex-1 px-4 py-2 rounded-lg ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`flex-1 px-4 py-2 rounded-lg ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
          Decode
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ToolButton onClick={handleConvert}>{mode === 'encode' ? 'Encode' : 'Decode'}</ToolButton>
      {output && (
        <ResultCard title="Result">
          <div className="flex items-center space-x-3">
            <code className="flex-1 text-sm bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded break-all">{output}</code>
            <button onClick={() => navigator.clipboard.writeText(output)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// URL Converter
export function URLConverterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    try {
      setOutput(mode === 'encode' ? urlEncode(input) : urlDecode(input));
    } catch {
      setOutput('Error: Invalid input');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button onClick={() => setMode('encode')} className={`flex-1 px-4 py-2 rounded-lg ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`flex-1 px-4 py-2 rounded-lg ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Decode</button>
      </div>
      <ToolInput label="Input" value={input} onChange={setInput} placeholder="Enter URL or text" />
      <ToolButton onClick={handleConvert}>Convert</ToolButton>
      {output && (
        <ResultCard title="Result">
          <div className="flex items-center space-x-3">
            <code className="flex-1 text-sm bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded break-all">{output}</code>
            <button onClick={() => navigator.clipboard.writeText(output)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Hash Generator
export function HashGeneratorTool() {
  const CryptoJS = require('crypto-js');
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA256');
  const [hash, setHash] = useState('');

  const handleGenerate = () => {
    let result: string;
    switch (algorithm) {
      case 'MD5': result = CryptoJS.MD5(input).toString(); break;
      case 'SHA1': result = CryptoJS.SHA1(input).toString(); break;
      case 'SHA256': result = CryptoJS.SHA256(input).toString(); break;
      case 'SHA512': result = CryptoJS.SHA512(input).toString(); break;
      default: result = '';
    }
    setHash(result);
  };

  return (
    <div className="space-y-4">
      <ToolInput label="Text to Hash" value={input} onChange={setInput} placeholder="Enter text" />
      <ToolSelect
        label="Algorithm"
        value={algorithm}
        onChange={setAlgorithm}
        options={[
          { value: 'MD5', label: 'MD5' },
          { value: 'SHA1', label: 'SHA-1' },
          { value: 'SHA256', label: 'SHA-256' },
          { value: 'SHA512', label: 'SHA-512' },
        ]}
      />
      <ToolButton onClick={handleGenerate}>Generate Hash</ToolButton>
      {hash && (
        <ResultCard title={`${algorithm} Hash`}>
          <div className="flex items-center space-x-3">
            <code className="flex-1 text-xs bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded break-all font-mono">{hash}</code>
            <button onClick={() => navigator.clipboard.writeText(hash)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Color Converter
export function ColorConverterTool() {
  const [hex, setHex] = useState('#3B82F6');
  const [rgb, setRgb] = useState({ r: 59, g: 150, b: 246 });
  const [hsl, setHsl] = useState({ h: 210, s: 90, l: 60 });

  const handleHexChange = (value: string) => {
    setHex(value);
    const rgbResult = hexToRgb(value);
    if (rgbResult) {
      setRgb(rgbResult);
      setHsl(rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b));
    }
  };

  const handleRgbChange = (channel: string, value: string) => {
    const newRgb = { ...rgb, [channel]: parseInt(value) || 0 };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg border-2 border-slate-300 dark:border-slate-600" style={{ backgroundColor: hex }} />
        <div className="flex-1">
          <ToolInput label="HEX" value={hex} onChange={handleHexChange} placeholder="#000000" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ToolInput label="R" value={rgb.r} onChange={(v: string) => handleRgbChange('r', v)} type="number" min="0" max="255" />
        <ToolInput label="G" value={rgb.g} onChange={(v: string) => handleRgbChange('g', v)} type="number" min="0" max="255" />
        <ToolInput label="B" value={rgb.b} onChange={(v: string) => handleRgbChange('b', v)} type="number" min="0" max="255" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ToolInput label="H" value={hsl.h} onChange={(v: string) => setHsl({ ...hsl, h: parseInt(v) || 0 })} type="number" min="0" max="360" suffix="°" />
        <ToolInput label="S" value={hsl.s} onChange={(v: string) => setHsl({ ...hsl, s: parseInt(v) || 0 })} type="number" min="0" max="100" suffix="%" />
        <ToolInput label="L" value={hsl.l} onChange={(v: string) => setHsl({ ...hsl, l: parseInt(v) || 0 })} type="number" min="0" max="100" suffix="%" />
      </div>
    </div>
  );
}

// EMI Calculator
export function EMICalculatorTool() {
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('5');
  const [tenure, setTenure] = useState('360');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(tenure) || 0;
    if (p && r && t) setResult(calculateEMI(p, r, t));
  };

  return (
    <div className="space-y-4">
      <ToolInput label="Loan Amount" value={principal} onChange={setPrincipal} type="number" placeholder="100000" suffix="$" />
      <ToolInput label="Annual Interest Rate" value={rate} onChange={setRate} type="number" placeholder="5" suffix="%" step="0.1" />
      <ToolInput label="Loan Tenure (months)" value={tenure} onChange={setTenure} type="number" placeholder="360" />
      <ToolButton onClick={handleCalculate}>Calculate EMI</ToolButton>
      {result && (
        <ResultCard title="Loan Details">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.emi)}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Monthly EMI</div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Payment</div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">{formatCurrency(result.totalPayment)}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Interest</div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">{formatCurrency(result.totalInterest)}</div>
              </div>
            </div>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Mortgage Calculator
export function MortgageCalculatorTool() {
  const [homePrice, setHomePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('60000');
  const [rate, setRate] = useState('4');
  const [years, setYears] = useState('30');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment);
    const r = parseFloat(rate) || 0;
    const y = parseFloat(years) || 30;
    if (principal > 0 && r && y) setResult(calculateMortgage(principal, r, y));
  };

  return (
    <div className="space-y-4">
      <ToolInput label="Home Price" value={homePrice} onChange={setHomePrice} type="number" placeholder="300000" suffix="$" />
      <ToolInput label="Down Payment" value={downPayment} onChange={setDownPayment} type="number" placeholder="60000" suffix="$" />
      <ToolInput label="Interest Rate" value={rate} onChange={setRate} type="number" placeholder="4" suffix="%" step="0.1" />
      <ToolInput label="Loan Term" value={years} onChange={setYears} type="number" placeholder="30" suffix="years" />
      <ToolButton onClick={handleCalculate}>Calculate</ToolButton>
      {result && (
        <ResultCard title="Mortgage Payment">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.monthlyPayment)}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Monthly Payment</div>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Tip Calculator
export function TipCalculatorTool() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState('18');
  const [people, setPeople] = useState('1');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const b = parseFloat(bill) || 0;
    const t = parseFloat(tipPercent) || 0;
    const p = parseInt(people) || 1;
    if (b) setResult(calculateTip(b, t, p));
  };

  return (
    <div className="space-y-4">
      <ToolInput label="Bill Amount" value={bill} onChange={setBill} type="number" placeholder="100" suffix="$" />
      <ToolInput label="Tip Percentage" value={tipPercent} onChange={setTipPercent} type="number" placeholder="18" suffix="%" />
      <ToolInput label="Number of People" value={people} onChange={setPeople} type="number" placeholder="1" min="1" />
      <ToolButton onClick={handleCalculate}>Calculate</ToolButton>
      {result && (
        <ResultCard title="Tip Breakdown">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.tipAmount)}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Tip</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.totalAmount)}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Total</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.perPerson)}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Per Person</div>
            </div>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Calorie Calculator
export function CalorieCalculatorTool() {
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const a = parseInt(age) || 30;
    const w = parseFloat(weight) || 70;
    const h = parseFloat(height) || 175;
    const act = parseFloat(activity) || 1.55;
    const bmr = calculateBMR(w, h, a, gender as 'male' | 'female');
    const tdee = calculateTDEE(bmr, act);
    setResult({ bmr, tdee, lose: tdee - 500, gain: tdee + 500 });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <ToolInput label="Age" value={age} onChange={setAge} type="number" placeholder="30" suffix="years" />
        <ToolSelect label="Gender" value={gender} onChange={setGender} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ToolInput label="Weight" value={weight} onChange={setWeight} type="number" placeholder="70" suffix="kg" />
        <ToolInput label="Height" value={height} onChange={setHeight} type="number" placeholder="175" suffix="cm" />
      </div>
      <ToolSelect
        label="Activity Level"
        value={activity}
        onChange={setActivity}
        options={[
          { value: '1.2', label: 'Sedentary (little exercise)' },
          { value: '1.375', label: 'Light exercise (1-3 days)' },
          { value: '1.55', label: 'Moderate exercise (3-5 days)' },
          { value: '1.725', label: 'Heavy exercise (6-7 days)' },
          { value: '1.9', label: 'Very heavy exercise' },
        ]}
      />
      <ToolButton onClick={handleCalculate}>Calculate</ToolButton>
      {result && (
        <ResultCard title="Daily Calorie Needs">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.tdee}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Maintain Weight</div>
            </div>
            <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{result.lose}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Lose 0.5kg/week</div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            BMR: {result.bmr} calories/day
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Fuel Cost Calculator
export function FuelCostCalculatorTool() {
  const [distance, setDistance] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('mpg');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const d = parseFloat(distance) || 0;
    const e = parseFloat(efficiency) || 0;
    const p = parseFloat(price) || 0;
    if (d && e && p) setResult(calculateFuelCost(d, e, p, unit as 'mpg' | 'l100km'));
  };

  return (
    <div className="space-y-4">
      <ToolInput label="Distance" value={distance} onChange={setDistance} type="number" placeholder="300" suffix={unit === 'mpg' ? 'miles' : 'km'} />
      <ToolInput label={`Fuel Efficiency (${unit === 'mpg' ? 'MPG' : 'L/100km'})`} value={efficiency} onChange={setEfficiency} type="number" placeholder="25" />
      <ToolInput label="Fuel Price" value={price} onChange={setPrice} type="number" placeholder="3.50" suffix={unit === 'mpg' ? '$/gal' : '$/L'} />
      <ToolButton onClick={handleCalculate}>Calculate</ToolButton>
      {result && (
        <ResultCard title="Fuel Cost">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.totalCost)}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Fuel Cost</div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {result.fuelNeeded} {unit === 'mpg' ? 'gallons' : 'liters'} needed
            </div>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Tax Calculator (simplified)
export function TaxCalculatorTool() {
  const [income, setIncome] = useState('');
  const [status, setStatus] = useState('single');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const inc = parseFloat(income) || 0;
    // Simplified 2024 tax brackets (single)
    let tax = 0;
    if (status === 'single') {
      if (inc <= 11600) tax = inc * 0.10;
      else if (inc <= 47150) tax = 1160 + (inc - 11600) * 0.12;
      else if (inc <= 100525) tax = 5426 + (inc - 47150) * 0.22;
      else if (inc <= 191950) tax = 17168.50 + (inc - 100525) * 0.24;
      else if (inc <= 243725) tax = 39110.50 + (inc - 191950) * 0.32;
      else if (inc <= 609350) tax = 55678.50 + (inc - 243725) * 0.35;
      else tax = 183647.25 + (inc - 609350) * 0.37;
    } else {
      // Married filing jointly (simplified)
      if (inc <= 23200) tax = inc * 0.10;
      else if (inc <= 94300) tax = 2320 + (inc - 23200) * 0.12;
      else if (inc <= 201050) tax = 10852 + (inc - 94300) * 0.22;
      else tax = 34337 + (inc - 201050) * 0.24;
    }
    setResult({ tax, effective: inc ? ((tax / inc) * 100).toFixed(1) : 0 });
  };

  return (
    <div className="space-y-4">
      <ToolSelect label="Filing Status" value={status} onChange={setStatus} options={[{ value: 'single', label: 'Single' }, { value: 'married', label: 'Married (Joint)' }]} />
      <ToolInput label="Taxable Income" value={income} onChange={setIncome} type="number" placeholder="50000" suffix="$" />
      <ToolButton onClick={handleCalculate}>Calculate Tax</ToolButton>
      {result && (
        <ResultCard title="Estimated Federal Tax">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.tax)}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Effective Rate: {result.effective}%</div>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Percentage Calculator
export function PercentageCalculatorTool() {
  const [mode, setMode] = useState('percentage');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const v1 = parseFloat(value1) || 0;
    const v2 = parseFloat(value2) || 0;
    if (mode === 'percentage') setResult(calculatePercentage(v1, v2));
    else if (mode === 'value') setResult(calculatePercentageValue(v1, v2));
    else setResult(calculatePercentageChange(v1, v2));
  };

  return (
    <div className="space-y-4">
      <ToolSelect
        label="Calculation Type"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'percentage', label: 'What % is X of Y?' },
          { value: 'value', label: 'What is X% of Y?' },
          { value: 'change', label: 'Percentage Change' },
        ]}
      />
      <div className="grid grid-cols-2 gap-4">
        <ToolInput label={mode === 'value' ? 'Percentage' : 'Value 1'} value={value1} onChange={setValue1} type="number" />
        <ToolInput label={mode === 'value' ? 'Total' : 'Value 2'} value={value2} onChange={setValue2} type="number" />
      </div>
      <ToolButton onClick={handleCalculate}>Calculate</ToolButton>
      {result && (
        <ResultCard title="Result">
          <div className="text-center">
            {mode === 'percentage' && (
              <>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{result.formatted}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{value1} is {result.formatted} of {value2}</div>
              </>
            )}
            {mode === 'value' && (
              <>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{result}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{value1}% of {value2}</div>
              </>
            )}
            {mode === 'change' && (
              <>
                <div className={`text-4xl font-bold ${result.direction === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {result.percentageChange > 0 ? '+' : ''}{result.percentageChange}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {result.direction === 'increase' ? 'Increase' : result.direction === 'decrease' ? 'Decrease' : 'No change'}
                </div>
              </>
            )}
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Random Name Picker
export function RandomNamePickerTool() {
  const [names, setNames] = useState('');
  const [count, setCount] = useState('1');
  const [winners, setWinners] = useState<string[]>([]);

  const handlePick = () => {
    const nameList = names.split('\n').filter(n => n.trim());
    const numWinners = Math.min(parseInt(count) || 1, nameList.length);
    
    const shuffled = [...nameList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = generateRandomNumber(0, i);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setWinners(shuffled.slice(0, numWinners));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Names (one per line)
        </label>
        <textarea
          value={names}
          onChange={(e) => setNames(e.target.value)}
          rows={6}
          placeholder="Alice&#10;Bob&#10;Charlie"
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ToolInput label="Number of Winners" value={count} onChange={setCount} type="number" min="1" />
      <ToolButton onClick={handlePick}>Pick Winner(s)</ToolButton>
      {winners.length > 0 && (
        <ResultCard title={`Winner${winners.length > 1 ? 's' : ''}`}>
          <div className="space-y-2">
            {winners.map((name, i) => (
              <div key={i} className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg font-medium">
                🏆 {name}
              </div>
            ))}
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Time Zone Converter
export function TimeZoneConverterTool() {
  const [dateTime, setDateTime] = useState('');
  const [fromTz, setFromTz] = useState('UTC');
  const [toTz, setToTz] = useState('America/New_York');
  const [result, setResult] = useState('');

  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Europe/Paris', label: 'Paris' },
    { value: 'Asia/Tokyo', label: 'Tokyo' },
    { value: 'Asia/Shanghai', label: 'Shanghai' },
    { value: 'Australia/Sydney', label: 'Sydney' },
  ];

  const handleConvert = () => {
    if (!dateTime) return;
    try {
      const date = new Date(dateTime);
      const result = date.toLocaleString('en-US', { timeZone: toTz });
      setResult(result);
    } catch {
      setResult('Invalid date/time');
    }
  };

  return (
    <div className="space-y-4">
      <ToolInput label="Date & Time" value={dateTime} onChange={setDateTime} type="datetime-local" />
      <ToolSelect label="From Timezone" value={fromTz} onChange={setFromTz} options={timezones} />
      <ToolSelect label="To Timezone" value={toTz} onChange={setToTz} options={timezones} />
      <ToolButton onClick={handleConvert}>Convert</ToolButton>
      {result && (
        <ResultCard title="Converted Time">
          <div className="text-center text-xl font-semibold text-slate-900 dark:text-white">{result}</div>
        </ResultCard>
      )}
    </div>
  );
}

// Unit Converter
export function UnitConverterTool() {
  const [category, setCategory] = useState('length');
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [result, setResult] = useState('');

  const units: any = {
    length: { m: 1, km: 0.001, cm: 100, mm: 1000, ft: 3.28084, mi: 0.000621371, in: 39.3701, yd: 1.09361 },
    weight: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274, ton: 0.001 },
    temperature: {}, // Special handling
    volume: { l: 1, ml: 1000, gal: 0.264172, qt: 1.05669, pt: 2.11338, cup: 4.22675 },
  };

  const unitOptions: any = {
    length: [
      { value: 'm', label: 'Meters' }, { value: 'km', label: 'Kilometers' },
      { value: 'cm', label: 'Centimeters' }, { value: 'mm', label: 'Millimeters' },
      { value: 'ft', label: 'Feet' }, { value: 'mi', label: 'Miles' },
      { value: 'in', label: 'Inches' }, { value: 'yd', label: 'Yards' },
    ],
    weight: [
      { value: 'kg', label: 'Kilograms' }, { value: 'g', label: 'Grams' },
      { value: 'mg', label: 'Milligrams' }, { value: 'lb', label: 'Pounds' },
      { value: 'oz', label: 'Ounces' }, { value: 'ton', label: 'Metric Tons' },
    ],
    temperature: [
      { value: 'c', label: 'Celsius' }, { value: 'f', label: 'Fahrenheit' }, { value: 'k', label: 'Kelvin' },
    ],
    volume: [
      { value: 'l', label: 'Liters' }, { value: 'ml', label: 'Milliliters' },
      { value: 'gal', label: 'Gallons' }, { value: 'qt', label: 'Quarts' },
    ],
  };

  const handleConvert = () => {
    const val = parseFloat(value) || 0;
    if (category === 'temperature') {
      let celsius = val;
      if (fromUnit === 'f') celsius = (val - 32) * 5/9;
      if (fromUnit === 'k') celsius = val - 273.15;
      
      let result: number;
      if (toUnit === 'c') result = celsius;
      else if (toUnit === 'f') result = celsius * 9/5 + 32;
      else result = celsius + 273.15;
      
      setResult(result.toFixed(2));
    } else {
      const categoryUnits = units[category];
      const inBase = val / categoryUnits[fromUnit];
      const converted = inBase * categoryUnits[toUnit];
      setResult(converted.toFixed(4));
    }
  };

  return (
    <div className="space-y-4">
      <ToolSelect
        label="Category"
        value={category}
        onChange={(v: string) => { setCategory(v); setFromUnit(unitOptions[v][0].value); setToUnit(unitOptions[v][1].value); }}
        options={[
          { value: 'length', label: 'Length' },
          { value: 'weight', label: 'Weight' },
          { value: 'temperature', label: 'Temperature' },
          { value: 'volume', label: 'Volume' },
        ]}
      />
      <ToolInput label="Value" value={value} onChange={setValue} type="number" />
      <div className="grid grid-cols-2 gap-4">
        <ToolSelect label="From" value={fromUnit} onChange={setFromUnit} options={unitOptions[category]} />
        <ToolSelect label="To" value={toUnit} onChange={setToUnit} options={unitOptions[category]} />
      </div>
      <ToolButton onClick={handleConvert}>Convert</ToolButton>
      {result && (
        <ResultCard title="Result">
          <div className="text-center text-2xl font-bold text-blue-600 dark:text-blue-400">
            {value} {fromUnit} = {result} {toUnit}
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Currency Converter (with placeholder rates)
export function CurrencyConverterTool() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');

  // Placeholder rates (in real app, fetch from API)
  const rates: any = {
    USD: 1, EUR: 0.85, GBP: 0.73, JPY: 110, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, INR: 74.5,
  };

  const handleConvert = () => {
    const amt = parseFloat(amount) || 0;
    const converted = amt * (rates[toCurrency] / rates[fromCurrency]);
    setResult(converted.toFixed(2));
  };

  const currencies = Object.keys(rates).map(c => ({ value: c, label: c }));

  return (
    <div className="space-y-4">
      <ToolInput label="Amount" value={amount} onChange={setAmount} type="number" />
      <div className="grid grid-cols-2 gap-4">
        <ToolSelect label="From" value={fromCurrency} onChange={setFromCurrency} options={currencies} />
        <ToolSelect label="To" value={toCurrency} onChange={setToCurrency} options={currencies} />
      </div>
      <ToolButton onClick={handleConvert}>Convert</ToolButton>
      {result && (
        <ResultCard title="Conversion Result">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {amount} {fromCurrency} = {result} {toCurrency}
            </div>
            <div className="text-xs text-slate-500 mt-2">Rates are approximate</div>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// QR Code Generator
export function QRCodeGeneratorTool() {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [size, setSize] = useState(256);

  const handleGenerate = async () => {
    if (!text) return;
    try {
      const dataUrl = await QRCode.toDataURL(text, { width: size, margin: 2 });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error('QR generation failed', err);
    }
  };

  const download = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Content (URL, text, etc.)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ToolInput label="Size (pixels)" value={size} onChange={(v: string) => setSize(parseInt(v) || 256)} type="number" min="128" max="1024" />
      <ToolButton onClick={handleGenerate}>Generate QR Code</ToolButton>
      {qrDataUrl && (
        <ResultCard title="QR Code">
          <div className="flex flex-col items-center">
            <img src={qrDataUrl} alt="QR Code" className="max-w-full h-auto rounded-lg" />
            <button onClick={download} className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
              Download PNG
            </button>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Barcode Generator
export function BarcodeGeneratorTool() {
  const [value, setValue] = useState('123456789012');
  const [format, setFormat] = useState('CODE128');
  const [barcodeSvg, setBarcodeSvg] = useState('');

  const handleGenerate = () => {
    if (typeof window !== 'undefined') {
      const JsBarcode = require('jsbarcode');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      try {
        JsBarcode(svg, value, { format, width: 2, height: 100, displayValue: true });
        setBarcodeSvg(new XMLSerializer().serializeToString(svg));
      } catch (err) {
        setBarcodeSvg('<text x="50%" y="50%" text-anchor="middle">Invalid barcode value</text>');
      }
    }
  };

  return (
    <div className="space-y-4">
      <ToolInput label="Barcode Value" value={value} onChange={setValue} placeholder="123456789012" />
      <ToolSelect
        label="Format"
        value={format}
        onChange={setFormat}
        options={[
          { value: 'CODE128', label: 'Code 128' },
          { value: 'EAN13', label: 'EAN-13' },
          { value: 'UPC', label: 'UPC' },
          { value: 'CODE39', label: 'Code 39' },
        ]}
      />
      <ToolButton onClick={handleGenerate}>Generate Barcode</ToolButton>
      {barcodeSvg && (
        <ResultCard title="Barcode">
          <div className="flex justify-center p-4 bg-white rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: barcodeSvg }} className="max-w-full" />
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// QR Code Scanner
export function QRCodeScannerTool() {
  const [result, setResult] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);

  const startScanning = async () => {
    if (typeof window !== 'undefined') {
      const { Html5Qrcode } = require('html5-qrcode');
      setScanning(true);
      const scanner = new Html5Qrcode('reader');
      
      try {
        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: 250 },
          (decodedText: string) => {
            setResult(decodedText);
            scanner.stop();
            setScanning(false);
          },
          () => {}
        );
      } catch (err) {
        console.error('Scanner error', err);
        setScanning(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div id="reader" className="w-full max-w-md mx-auto bg-slate-100 dark:bg-slate-800 rounded-lg" />
      <ToolButton onClick={startScanning}>Start Camera Scan</ToolButton>
      {result && (
        <ResultCard title="Scanned Result">
          <div className="flex items-center space-x-3">
            <code className="flex-1 text-sm bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded break-all">{result}</code>
            <button onClick={() => navigator.clipboard.writeText(result)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </ResultCard>
      )}
    </div>
  );
}

// Image Compressor, Resizer, Format Converter - Placeholder components
export function ImageCompressorTool() {
  return (
    <div className="space-y-4">
      <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-center">
        <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Drag and drop an image or click to upload</p>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Select Image</button>
      </div>
      <p className="text-sm text-slate-500 text-center">Supports JPEG, PNG, WEBP up to 10MB</p>
    </div>
  );
}

export const ImageResizerTool = ImageCompressorTool;
export const ImageFormatConverterTool = ImageCompressorTool;

// PDF Tools - Placeholder components
export function PDFMergeTool() {
  return (
    <div className="space-y-4">
      <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-center">
        <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Upload PDF files to merge</p>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Select PDFs</button>
      </div>
    </div>
  );
}

export const PDFSplitTool = PDFMergeTool;
export const PDFCompressTool = PDFMergeTool;
export const PDFToImageTool = PDFMergeTool;
export const ImageToPDFTool = PDFMergeTool;

// Coming Soon placeholder
export function ComingSoonTool() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🚧</div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Coming Soon</h3>
      <p className="text-slate-600 dark:text-slate-400">This tool is under development. Check back soon!</p>
    </div>
  );
}

// Re-export from individual files
export { AgeCalculatorTool } from './age-calculator';
export { DateDifferenceTool } from './date-difference';
