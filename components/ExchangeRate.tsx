"use client";
import { useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "./ui/spinner";

const COUNTRY_TO_CURRENCY: { [key: string]: string } = {
  india: "INR",
  china: "CNY",
  japan: "JPY",
  indonesia: "IDR",
  thailand: "THB",
  united_kingdom: "GBP",
  germany: "EUR",
  netherlands: "EUR",
  france: "EUR",
  hungary: "HUF",
  slovak_republic: "EUR",
  united_states: "USD",
  canada: "CAD",
  australia: "AUD",
};

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
  const [selectedCountry, setSelectedCountry] = useState("united_states");
  const selectedCurrency = COUNTRY_TO_CURRENCY[selectedCountry];

  const { data, error, isLoading } = useSWR<RateResponse>(
    `/api/exchange-rate?from=${selectedCurrency}`,
    fetcher,
    {
      refreshInterval: 60000, // Update every minute
      onSuccess: (data) => {
        if (data && !data.error) {
          setExchangeRate(data.rate);
        }
      },
    }
  );

  return (
    <div>
      <Label htmlFor="exchangeRate">Exchange Rate</Label>
      <div className="mt-2">
        <Select
          value={selectedCountry}
          onValueChange={(value) => setSelectedCountry(value)}
        >
          <SelectTrigger className="w-full sm:w-[300px]">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Asia</SelectLabel>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="china">China</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="indonesia">Indonesia</SelectItem>
              <SelectItem value="thailand">Thailand</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="united_kingdom">United Kingdom</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="netherlands">Netherlands</SelectItem>
              <SelectItem value="france">France</SelectItem>
              <SelectItem value="hungary">Hungary</SelectItem>
              <SelectItem value="slovak_republic">Slovak Republic</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="united_states">United States</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Oceania</SelectLabel>
              <SelectItem value="australia">Australia</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <Card className="w-full sm:w-[300px] mt-2">
          <CardHeader>
            <CardTitle>{selectedCurrency} &rarr; LKR</CardTitle>
            <CardDescription>Current exchange rate</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Spinner size="sm" className="bg-black dark:bg-white" />
            <p className="font-medium">Loading rate...</p>
          </CardContent>
        </Card>
      ) : error || data?.error ? (
        <Card className="w-full sm:w-[300px] mt-2">
          <CardHeader>
            <CardTitle>{selectedCurrency} &rarr; LKR</CardTitle>
            <CardDescription className="text-red-500">
              Error loading rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error?.message || data?.error}</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full sm:w-[300px] mt-2">
          <CardHeader>
            <CardTitle>{selectedCurrency} &rarr; LKR</CardTitle>
            <CardDescription>Current exchange rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {data.rate.toLocaleString("en-US", { maximumFractionDigits: 2 })}{" "}
              LKR
            </p>
          </CardContent>
          <CardFooter>
            <small className="text-muted-foreground">
              Updated every minute
            </small>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

{
  /*"use client";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <div className=" mt-2">
        <Select>
          <SelectTrigger className="w-full sm:w-[300px]">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Asia</SelectLabel>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="china">China</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="indonesia">Indonesia</SelectItem>
              <SelectItem value="thailand">Thailand</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Europe</SelectLabel>
              <SelectItem value="united_kingdom">United Kingdom</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="netherlands">Netherlands</SelectItem>
              <SelectItem value="france">France</SelectItem>
              <SelectItem value="hungary">Hungary</SelectItem>
              <SelectItem value="slovak_republic">Slovak Republic</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="united_states">United States</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Oceania</SelectLabel>
              <SelectItem value="australia">Australia</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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

*/
}
