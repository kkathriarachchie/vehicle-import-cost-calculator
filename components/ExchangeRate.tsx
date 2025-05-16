"use client";
import useSWR from "swr";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExchangeRateProps {
  exchangeRate: number;
  setExchangeRate: (value: number) => void;
}

type RateResponse = {
  base: string;
  target: string;
  rate: number;
  error?: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ExchangeRate({
  exchangeRate,
  setExchangeRate,
}: ExchangeRateProps) {
  const { data, error, isLoading } = useSWR<RateResponse>(
    "/api/exchange-rate",
    fetcher,
    {
      refreshInterval: 6000000,
      onSuccess: (data) => {
        if (data && !data.error) {
          setExchangeRate(data.rate);
        }
      },
    }
  );

  if (isLoading) return <p>Loading rate...</p>;
  if (error || data?.error) return <p>Error: {error?.message || data.error}</p>;

  return (
    <div>
      <Label htmlFor="exchangeRate">Exchange Rate</Label>

      <Card className=" w-full sm:w-[300px] mt-2">
        <CardHeader>
          <CardTitle>USD &rarr; LKR</CardTitle>
          <CardDescription>Current exchange rate</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">
            {data.rate.toLocaleString("en-US", { maximumFractionDigits: 2 })}{" "}
            LKR
          </p>
        </CardContent>
        <CardFooter>
          <small className="text-muted-foreground">Updated every minute</small>
        </CardFooter>
      </Card>
    </div>
  );
}
