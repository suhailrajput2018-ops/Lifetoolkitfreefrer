export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const rates = await fetchLiveRates();
    
    return new Response(
      JSON.stringify({
        success: true,
        rates: rates,
        lastUpdated: new Date().toISOString(),
        source: 'live'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      }
    );
  } catch (err) {
    console.error('Error:', err);
    
    return new Response(
      JSON.stringify({
        success: true,
        rates: getDefaultRates(),
        lastUpdated: new Date().toISOString(),
        source: 'default'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

async function fetchLiveRates(): Promise<Record<string, number>> {
  const urls = [
    'https://api.exchangerate-api.com/v4/latest/USD',
    'https://open.er-api.com/v6/latest/USD',
    'https://api.exchangerate.host/latest?base=USD'
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      
      const json = await res.json() as Record<string, unknown>;
      const rates = (json.rates as Record<string, number>) || {};
      
      if (Object.keys(rates).length > 10) {
        return { USD: 1, ...rates };
      }
    } catch {
      continue;
    }
  }

  return getDefaultRates();
}

function getDefaultRates(): Record<string, number> {
  return {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.5,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.12,
    MXN: 17.05,
    SGD: 1.35,
    HKD: 7.81,
    NZD: 1.67,
    SEK: 10.5,
    NOK: 10.47,
    DKK: 6.86,
    BRL: 4.97,
    ZAR: 18.65,
    KRW: 1319.5,
    PKR: 96.0,
  };
}
