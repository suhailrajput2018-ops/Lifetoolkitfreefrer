export const dynamic = "force-dynamic";
export const revalidate = 0; // No caching - always fetch fresh

interface RatesCache {
  rates: Record<string, number>;
  timestamp: number;
}

// In-memory cache (resets on each function execution)
let cachedRates: RatesCache | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    const now = Date.now();
    
    // Check if we have valid cached rates (within 5 minutes)
    if (cachedRates && now - cachedRates.timestamp < CACHE_DURATION) {
      console.log('Returning cached rates');
      return Response.json({
        success: true,
        rates: cachedRates.rates,
        lastUpdated: new Date(cachedRates.timestamp),
        source: 'cached',
        cacheAge: `${Math.round((now - cachedRates.timestamp) / 1000)}s`
      });
    }

    console.log('Fetching fresh rates from external APIs...');
    
    // Try to fetch fresh rates
    const rates = await fetchExchangeRates();

    if (Object.keys(rates).length > 0) {
      // Update cache
      cachedRates = {
        rates,
        timestamp: now
      };

      console.log('Fresh rates fetched successfully');
      return Response.json({
        success: true,
        rates: rates,
        lastUpdated: new Date(now),
        source: 'live',
        cacheAge: '0s'
      });
    } else {
      // If fetch fails, try to use cached rates
      if (cachedRates) {
        console.log('API failed, returning cached rates');
        return Response.json({
          success: true,
          rates: cachedRates.rates,
          lastUpdated: new Date(cachedRates.timestamp),
          warning: 'Unable to fetch live rates. Using cached data.',
          source: 'cached_fallback',
          cacheAge: `${Math.round((now - cachedRates.timestamp) / 1000)}s`
        });
      }
      
      // No cache available, use defaults
      console.log('No cache available, returning default rates');
      return Response.json({
        success: true,
        rates: getDefaultRates(),
        lastUpdated: new Date(),
        warning: 'Using default rates - unable to fetch live rates',
        source: 'default'
      });
    }
  } catch (error) {
    console.error('Exchange rates error:', error);
    
    // Return cached rates if available
    if (cachedRates) {
      const now = Date.now();
      return Response.json({
        success: true,
        rates: cachedRates.rates,
        lastUpdated: new Date(cachedRates.timestamp),
        warning: 'Error fetching rates - using cached data',
        source: 'error_fallback',
        error: (error as Error).message,
        cacheAge: `${Math.round((now - cachedRates.timestamp) / 1000)}s`
      });
    }

    return Response.json({
      success: true,
      rates: getDefaultRates(),
      lastUpdated: new Date(),
      warning: 'Error fetching rates - using default rates',
      source: 'default',
      error: (error as Error).message
    });
  }
}

async function fetchExchangeRates(): Promise<Record<string, number>> {
  const rates: Record<string, number> = {};
  const timeout = 8000; // 8 second timeout per request

  // API sources to try
  const apiSources = [
    {
      name: 'exchangerate-api.com',
      url: 'https://api.exchangerate-api.com/v4/latest/USD',
      parseResponse: (data: any) => data.rates
    },
    {
      name: 'open.er-api.com',
      url: 'https://open.er-api.com/v6/latest/USD',
      parseResponse: (data: any) => data.rates
    },
    {
      name: 'exchangerate-host',
      url: 'https://api.exchangerate.host/latest?base=USD',
      parseResponse: (data: any) => data.rates
    }
  ];

  // Try each API source
  for (const source of apiSources) {
    try {
      console.log(`Trying ${source.name}...`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(source.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'LifeKit-CurrencyConverter/1.0'
        },
        signal: controller.signal,
        // Don't cache at fetch level - we handle caching ourselves
        cache: 'no-store'
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const parsedRates = source.parseResponse(data);
        
        if (parsedRates && typeof parsedRates === 'object' && Object.keys(parsedRates).length > 10) {
          console.log(`✓ Successfully fetched from ${source.name}`);
          return {
            USD: 1,
            ...parsedRates
          };
        }
      }
    } catch (error) {
      console.warn(`✗ ${source.name} failed:`, (error as Error).message);
      continue; // Try next source
    }
  }

  console.warn('All API sources failed');
  return {};
}

function getDefaultRates(): Record<string, number> {
  // Updated rates for today - these are approximate
  // Used only as last resort fallback
  return {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.12,
    MXN: 17.05,
    SGD: 1.35,
    HKD: 7.81,
    NZD: 1.67,
    SEK: 10.50,
    NOK: 10.47,
    DKK: 6.86,
    BRL: 4.97,
    ZAR: 18.65,
    KRW: 1319.50,
    PKR: 96.0, // Added Pakistan Rupee for your reference
  };
}
