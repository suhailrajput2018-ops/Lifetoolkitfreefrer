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
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error: any) {
    console.error('Exchange API Error:', error);
    
    return new Response(
      JSON.stringify({
        success: true,
        rates: getDefaultRates(),
        lastUpdated: new Date().toISOString(),
        source: 'default',
        warning: 'Using default rates'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}

async function fetchLiveRates(): Promise<Record<string, number>> {
  const sources = [
    'https://api.exchangerate-api.com/v4/latest/USD',
    'https://open.er-api.com/v6/latest/USD',
    'https://api.exchangerate.host/latest?base=USD'
  ];

  for (const url of sources) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        cache: 'no-store'
      });

      if (res.ok) {
        const data = await res.json();
        const rates = data.rates || {};
        
        if (Object.keys(rates).length > 10) {
          return {
            USD: 1,
            ...rates
          };
        }
      }
    } catch (e) {
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
