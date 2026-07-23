export async function GET() {
  try {
    const rates = await fetchRates();
    return Response.json({
      success: true,
      rates,
      lastUpdated: new Date().toISOString(),
      source: 'live'
    });
  } catch {
    return Response.json({
      success: true,
      rates: getDefaults(),
      lastUpdated: new Date().toISOString(),
      source: 'default'
    });
  }
}

async function fetchRates() {
  const apis = [
    'https://api.exchangerate-api.com/v4/latest/USD',
    'https://open.er-api.com/v6/latest/USD'
  ];

  for (const api of apis) {
    try {
      const res = await fetch(api);
      if (res.ok) {
        const data = await res.json();
        const r = data.rates || {};
        if (Object.keys(r).length > 10) {
          return Object.assign({ USD: 1 }, r);
        }
      }
    } catch {
      null;
    }
  }

  return getDefaults();
}

function getDefaults() {
  return {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.5,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.12,
    PKR: 96,
    MXN: 17.05,
    SGD: 1.35,
    HKD: 7.81,
    NZD: 1.67,
    SEK: 10.5,
    NOK: 10.47,
    DKK: 6.86,
    BRL: 4.97,
    ZAR: 18.65,
    KRW: 1319.5
  };
}
