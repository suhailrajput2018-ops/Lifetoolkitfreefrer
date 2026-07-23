// Utility function for conditional class names
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

// Date utilities
export function calculateAge(birthDate: Date): {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const birth = new Date(birthDate);
  
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  
  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60));
  const totalMinutes = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60));
  const totalSeconds = Math.floor((now.getTime() - birth.getTime()) / 1000);
  
  return {
    years,
    months,
    weeks: totalWeeks,
    days: totalDays,
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  };
}

export function calculateDateDifference(startDate: Date, endDate: Date): {
  years: number;
  months: number;
  weeks: number;
  days: number;
  totalDays: number;
} {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const totalMs = end.getTime() - start.getTime();
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  
  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return {
    years: Math.abs(years),
    months: Math.abs(months),
    weeks: totalWeeks,
    days: Math.abs(days),
    totalDays: Math.abs(totalDays),
  };
}

// BMI Calculator
export function calculateBMI(weightKg: number, heightCm: number): {
  bmi: number;
  category: string;
  healthyRange: string;
} {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  
  let category: string;
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal weight';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }
  
  const minHealthy = 18.5 * heightM * heightM;
  const maxHealthy = 24.9 * heightM * heightM;
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    healthyRange: `${Math.round(minHealthy)} - ${Math.round(maxHealthy)} kg`,
  };
}

// BMR & Calorie Calculator (Mifflin-St Jeor Equation)
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female'
): number {
  if (gender === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
}

export function calculateTDEE(bmr: number, activityLevel: number): number {
  return Math.round(bmr * activityLevel);
}

// EMI Calculator
export function calculateEMI(principal: number, rate: number, tenureMonths: number): {
  emi: number;
  totalPayment: number;
  totalInterest: number;
} {
  const monthlyRate = rate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;
  
  return {
    emi: Math.round(emi * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
  };
}

// Mortgage Calculator
export function calculateMortgage(
  principal: number,
  rate: number,
  years: number,
  propertyTax: number = 0,
  insurance: number = 0,
  pmi: number = 0
): {
  monthlyPayment: number;
  principalAndInterest: number;
  totalPayment: number;
  totalInterest: number;
} {
  const monthlyRate = rate / 12 / 100;
  const numPayments = years * 12;
  
  const principalAndInterest =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  const monthlyPayment = principalAndInterest + propertyTax / 12 + insurance / 12 + pmi;
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = principalAndInterest * numPayments - principal;
  
  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    principalAndInterest: Math.round(principalAndInterest * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
  };
}

// Tip Calculator
export function calculateTip(
  billAmount: number,
  tipPercentage: number,
  numberOfPeople: number = 1
): {
  tipAmount: number;
  totalAmount: number;
  perPerson: number;
} {
  const tipAmount = (billAmount * tipPercentage) / 100;
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / numberOfPeople;
  
  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    perPerson: Math.round(perPerson * 100) / 100,
  };
}

// Fuel Cost Calculator
export function calculateFuelCost(
  distance: number,
  fuelEfficiency: number,
  fuelPrice: number,
  efficiencyUnit: 'mpg' | 'l100km' = 'mpg'
): {
  fuelNeeded: number;
  totalCost: number;
  costPerDistance: number;
} {
  let fuelNeeded: number;
  
  if (efficiencyUnit === 'mpg') {
    fuelNeeded = distance / fuelEfficiency;
  } else {
    fuelNeeded = (distance * fuelEfficiency) / 100;
  }
  
  const totalCost = fuelNeeded * fuelPrice;
  const costPerDistance = totalCost / distance;
  
  return {
    fuelNeeded: Math.round(fuelNeeded * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    costPerDistance: Math.round(costPerDistance * 100) / 100,
  };
}

// Percentage Calculator
export function calculatePercentage(
  value: number,
  total: number
): {
  percentage: number;
  formatted: string;
} {
  const percentage = (value / total) * 100;
  return {
    percentage: Math.round(percentage * 100) / 100,
    formatted: `${Math.round(percentage * 100) / 100}%`,
  };
}

export function calculatePercentageValue(
  percentage: number,
  total: number
): number {
  return Math.round((percentage / 100) * total * 100) / 100;
}

export function calculatePercentageChange(
  oldValue: number,
  newValue: number
): {
  change: number;
  percentageChange: number;
  direction: 'increase' | 'decrease' | 'no change';
} {
  const change = newValue - oldValue;
  const percentageChange = oldValue !== 0 ? (change / Math.abs(oldValue)) * 100 : 0;
  
  return {
    change: Math.round(change * 100) / 100,
    percentageChange: Math.round(percentageChange * 100) / 100,
    direction: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'no change',
  };
}

// Text utilities
export function countText(text: string): {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMinutes: number;
} {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(Boolean).length;
  const lines = text.trim() === '' ? 0 : text.split('\n').length;
  const readingTimeMinutes = Math.ceil(words / 200);
  
  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes,
  };
}

export function convertCase(text: string, caseType: string): string {
  switch (caseType) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'titlecase':
      return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    case 'sentencecase':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'alternating':
      return text.split('').map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join('');
    case 'inverse':
      return text.split('').map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join('');
    default:
      return text;
  }
}

export function removeDuplicateLines(text: string): string {
  const lines = text.split('\n');
  const seen = new Set<string>();
  return lines.filter((line) => {
    if (seen.has(line)) return false;
    seen.add(line);
    return true;
  }).join('\n');
}

// Color utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// Password utilities
export function generatePassword(
  length: number = 16,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }
): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let chars = '';
  if (options.uppercase) chars += uppercase;
  if (options.lowercase) chars += lowercase;
  if (options.numbers) chars += numbers;
  if (options.symbols) chars += symbols;
  
  if (chars === '') chars = lowercase;
  
  let password = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  
  return password;
}

export function checkPasswordStrength(password: string): {
  score: number;
  strength: 'weak' | 'fair' | 'good' | 'strong' | 'very strong';
  feedback: string[];
} {
  let score = 0;
  const feedback: string[] = [];
  
  if (password.length >= 8) score += 1;
  else feedback.push('Use at least 8 characters');
  
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Add lowercase letters');
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Add uppercase letters');
  
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Add numbers');
  
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push('Add special characters');
  
  if (/(.)\1{2,}/.test(password)) {
    score -= 1;
    feedback.push('Avoid repeated characters');
  }
  
  let strength: 'weak' | 'fair' | 'good' | 'strong' | 'very strong';
  if (score <= 2) strength = 'weak';
  else if (score <= 4) strength = 'fair';
  else if (score <= 5) strength = 'good';
  else if (score <= 6) strength = 'strong';
  else strength = 'very strong';
  
  return { score, strength, feedback };
}

// UUID Generator
export function generateUUID(): string {
  return crypto.randomUUID();
}

// Random Number Generator
export function generateRandomNumber(min: number, max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return Math.floor((array[0] / (0xFFFFFFFF + 1)) * (max - min + 1)) + min;
}

// Format JSON
export function formatJSON(jsonString: string): { formatted: string; valid: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    return {
      formatted: JSON.stringify(parsed, null, 2),
      valid: true,
    };
  } catch (e) {
    return {
      formatted: jsonString,
      valid: false,
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}

// Base64 utilities
export function base64Encode(text: string): string {
  return Buffer.from(text, 'utf-8').toString('base64');
}

export function base64Decode(base64: string): string {
  return Buffer.from(base64, 'base64').toString('utf-8');
}

// URL utilities
export function urlEncode(text: string): string {
  return encodeURIComponent(text);
}

export function urlDecode(encoded: string): string {
  return decodeURIComponent(encoded);
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Format number
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

// Sleep utility
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
