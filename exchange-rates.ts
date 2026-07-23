export const dynamic = "force-dynamic";

// Cache rates for 1 hour to avoid excessive API calls
let cachedRates: Record<string, number> = {};
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
  try {
    const now = Date.now();
    
    // Return cached rates if still valid
    if (Object.keys(cachedRates).length > 0 && now - lastFetchTime < CACHE_DURATION) {
      return Response.json({
        success: true,
        rates: cachedRates,
        lastUpdated: new Date(lastFetchTime),
        source: 'cached'
      });
    }

    // Fetch fresh rates from multiple sources with fallback
    const rates = await fetchExchangeRates();

    if (Object.keys(rates).length > 0) {
      cachedRates = rates;
      lastFetchTime = now;
      
      return Response.json({
        success: true,
        rates: rates,
        lastUpdated: new Date(now),
        source: 'live'
      });
    } else {
      // If fetch fails but we have cache, return it with warning
      if (Object.keys(cachedRates).length > 0) {
        return Response.json({
          success: true,
          rates: cachedRates,
          lastUpdated: new Date(lastFetchTime),
          warning: 'Using cached rates - unable to fetch live rates at this moment',
          source: 'cached_fallback'
        });
      }
      
      // No cache and no fresh data - return default rates
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
    if (Object.keys(cachedRates).length > 0) {
      return Response.json({
        success: true,
        rates: cachedRates,
        lastUpdated: new Date(lastFetchTime),
        warning: 'Error fetching rates - using cached data',
        source: 'error_fallback'
      });
    }

    return Response.json({
      success: true,
      rates: getDefaultRates(),
      lastUpdated: new Date(),
      warning: 'Error fetching rates - using default rates',
      source: 'default'
    });
  }
}

async function fetchExchangeRates(): Promise<Record<string, number>> {
  const rates: Record<string, number> = {};

  // Try multiple free API sources
  try {
    // First choice: Open Exchange Rates (free tier)
    const response = await fetch(
      'https://open.er-api.com/v6/latest/USD',
      { 
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.rates) {
        return {
          USD: 1,
          ...data.rates
        };
      }
    }
  } catch (error) {
    console.warn('Open Exchange Rates API failed:', error);
  }

  // Fallback: Try Fixer.io free endpoint
  try {
    const response = await fetch(
      'https://api.exchangerate-api.com/v4/latest/USD',
      {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 }
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.rates) {
        return {
          USD: 1,
          ...data.rates
        };
      }
    }
  } catch (error) {
    console.warn('ExchangeRate-API failed:', error);
  }

  // Final fallback: Try Wise API or similar
  try {
    const response = await fetch(
      'https://api.exchangerate.host/latest?base=USD',
      {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 3600 }
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.rates) {
        return {
          USD: 1,
          ...data.rates
        };
      }
    }
  } catch (error) {
    console.warn('ExchangeRate-Host API failed:', error);
  }

  return {};
}

function getDefaultRates(): Record<string, number> {
  // These are approximate rates as fallback - update periodically
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
  };
}
