import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  const { searchParams } = new URL(request.url);
  const fromCurrency = searchParams.get("from") || "USD";

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const endpoint = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/LKR`;

  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();

    if (!data.conversion_rate) {
      return NextResponse.json(
        { error: "Conversion rate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      base: fromCurrency,
      target: "LKR",
      rate: data.conversion_rate,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

{
  /*import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  // Base currency USD
  const endpoint = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();

    // Extract LKR rate
    const rate = data.conversion_rates?.LKR;
    if (!rate) {
      return NextResponse.json(
        { error: "LKR rate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ base: "USD", target: "LKR", rate });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

*/
}
