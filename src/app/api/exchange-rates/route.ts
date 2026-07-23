export const dynamic = "force-dynamic";
export const revalidate = 0;

interface RatesCache {
  rates: Record<string, number>;
  timestamp: number;
}

let cachedRates: RatesCache | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET() {
  try {
    const now = Date.now();
    
    if (cachedRates && now - cachedRates.timestamp < CACHE_DURATION) {
      console.log('Returning cached rates');
      return Response.json({
        success: true,
        rates: cachedRates.rates,
        lastUpdated: new Date(cachedRates.timestamp).toISOString(),
        source: 'cached',
        cacheAge: `${Math.round((now - cachedRates.timestamp) / 1000)}s`
      });
    }

    console.log('Fetching fresh rates...');
    const rates = await fetchExchangeRates();

    if (Object.keys(rates).length > 0) {
      cachedRates = { rates, timestamp: now };
      console.log('Fresh rates fetched successfully');
      
      return Response.json({
        success: true,
        rates: rates,
        lastUpdated: new Date(now).toISOString(),
        source: 'live',
        cacheAge: '0s'
      });
    } else {
      if (cachedRates) {
        const now = Date.now();
        return Response.json({
          success: true,
          rates: cachedRates.rates,
          lastUpdated: new Date(cachedRates.timestamp).toISOString(),
          warning: 'Using cached data',
          source: 'cached_fallback'
        });
      }
      
      return Response.json({
        success: true,
        rates: getDefaultRates(),
        lastUpdated: new Date().toISOString(),
        warning: 'Using default rates',
        source: 'default'
      });
    }
  } catch (error) {
    console.error('Exchange rates error:', error);
    
    if (cachedRates) {
      return Response.json({
        success: true,
        rates: cachedRates.rates,
        lastUpdated: new Date(cachedRates.timestamp).toISOString(),
        warning: 'Error - using cached data',
        source: 'error_fallback'
      });
    }

    return Response.json({
      success: true,
      rates: getDefaultRates(),
      lastUpdated: new Date().toISOString(),
      warning: 'Error - using default rates',
      source: 'default'
    });
  }
}

async function fetchExchangeRates(): Promise<Record<string, number>> {
  const apiSources = [
    {
      name: 'exchangerate-api',
      url: 'https://api.exchangerate-api.com/v4/latest/USD',
      parse: (data: any) => data.rates
    },
    {
      name: 'open.er-api',
      url: 'https://open.er-api.com/v6/latest/USD',
      parse: (data: any) => data.rates
    },
    {
      name: 'exchangerate-host',
      url: 'https://api.exchangerate.host/latest?base=USD',
      parse: (data: any) => data.rates
    }
  ];

  for (const source of apiSources) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(source.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        },
        signal: controller.signal,
        cache: 'no-store'
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const rates = source.parse(data);
        
        if (rates && typeof rates === 'object' && Object.keys(rates).length > 10) {
          console.log(`✓ Got rates from ${source.name}`);
          return { USD: 1, ...rates };
        }
      }
    } catch (err) {
      console.log(`✗ ${source.name} failed`);
      continue;
    }
  }

  return {};
}

function getDefaultRates(): Record<string, number> {
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
    PKR: 96.0,
  };
}
