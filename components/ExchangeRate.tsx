"use client";
import useSWR from "swr";

type RateResponse = {
  base: string;
  target: string;
  rate: number;
  error?: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ExchangeRate() {
  const { data, error, isLoading } = useSWR<RateResponse>(
    "/api/exchange-rate",
    fetcher,
    {
      refreshInterval: 60000, // update every 60s
    }
  );

  if (isLoading) return <p>Loading rate...</p>;
  if (error || data?.error) return <p>Error: {error?.message || data.error}</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">USD &rarr; LKR</h2>
      <p className="text-2xl mt-2">
        {data.rate.toLocaleString("en-US", { maximumFractionDigits: 2 })} LKR
      </p>
      <small className="text-gray-500">Updated every minute</small>
    </div>
  );
}
