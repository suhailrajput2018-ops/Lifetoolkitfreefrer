import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rates = await fetchRates();

    return NextResponse.json({
      success: true,
      rates,
      lastUpdated: new Date().toISOString(),
      source: "live",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: true,
      rates: getDefaults(),
      lastUpdated: new Date().toISOString(),
      source: "default",
    });
  }
}

async function fetchRates() {
  const apis = [
    "https://open.er-api.com/v6/latest/USD",
    "https://api.exchangerate-api.com/v4/latest/USD",
  ];

  for (const api of apis) {
    try {
      const res = await fetch(api, {
        cache: "no-store",
      });

      if (!res.ok) continue;

      const data = await res.json();

      if (data.rates && Object.keys(data.rates).length > 10) {
        return {
          USD: 1,
          ...data.rates,
        };
      }
    } catch (error) {
      console.error(`Failed to fetch ${api}:`, error);
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
    PKR: 279.96,
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
  };
}
