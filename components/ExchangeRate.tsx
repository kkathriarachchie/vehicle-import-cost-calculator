"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
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
  setSelectedCurrency: (value: string) => void;
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
  setSelectedCurrency,
}: ExchangeRateProps) {
  const [selectedCountry, setSelectedCountry] =
    useState<string>("united_states");
  const [isManual, setIsManual] = useState(false);
  const selectedCurrency = COUNTRY_TO_CURRENCY[selectedCountry];

  useEffect(() => {
    setSelectedCurrency(selectedCurrency);
  }, [selectedCurrency, setSelectedCurrency]);

  {
    /*const { data, error, isLoading, mutate } = useSWR<RateResponse>(
    !isManual ? `/api/exchange-rate?from=${selectedCurrency}` : null,
    fetcher,
    {
      refreshInterval: 60000, // Update every minute
      onSuccess: (data) => {
        if (data && !data.error) {
          setExchangeRate(data.rate);
        }
      },
    }
  );*/
  }

  const { data, error, isLoading, mutate } = useSWR<RateResponse>(
    !isManual && process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY
      ? `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY}/pair/${selectedCurrency}/LKR`
      : null,
    async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch rate");
      const data = await res.json();
      return {
        base: selectedCurrency,
        target: "LKR",
        rate: data.conversion_rate,
      };
    },
    {
      refreshInterval: 30 * 24 * 60 * 60 * 1000,
      onSuccess: (data) => {
        if (data && !data.error) {
          setExchangeRate(data.rate);
        }
      },
    }
  );

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setExchangeRate(value);
  };

  const handleManualToggle = (checked: boolean | string) => {
    setIsManual(checked as boolean);
    if (checked) {
      setSelectedCurrency("");
    } else {
      setSelectedCurrency(selectedCurrency);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col space-y-2">
        <Label className="text-sm sm:text-base font-medium">
          Exchange Rate
        </Label>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Select
            value={selectedCountry}
            onValueChange={setSelectedCountry}
            disabled={isManual}
          >
            <SelectTrigger className="w-full h-10 sm:w-9/12 ">
              <SelectValue
                placeholder="Select country"
                className="placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-400"
              />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              <SelectGroup>
                <SelectLabel className="font-semibold">Asia</SelectLabel>
                <SelectItem value="india">India (INR)</SelectItem>
                <SelectItem value="china">China (CNY)</SelectItem>
                <SelectItem value="japan">Japan (JPY)</SelectItem>
                <SelectItem value="indonesia">Indonesia (IDR)</SelectItem>
                <SelectItem value="thailand">Thailand (THB)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="font-semibold">Europe</SelectLabel>
                <SelectItem value="united_kingdom">
                  United Kingdom (GBP)
                </SelectItem>
                <SelectItem value="germany">Germany (EUR)</SelectItem>
                <SelectItem value="netherlands">Netherlands (EUR)</SelectItem>
                <SelectItem value="france">France (EUR)</SelectItem>
                <SelectItem value="hungary">Hungary (HUF)</SelectItem>
                <SelectItem value="slovak_republic">
                  Slovak Republic (EUR)
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="font-semibold">
                  North America
                </SelectLabel>
                <SelectItem value="united_states">
                  United States (USD)
                </SelectItem>
                <SelectItem value="canada">Canada (CAD)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="font-semibold">Oceania</SelectLabel>
                <SelectItem value="australia">Australia (AUD)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center sm:justify-end space-x-2 sm:w-3/12">
            <Checkbox
              id="manual-rate"
              checked={isManual}
              onCheckedChange={handleManualToggle}
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
            <Label
              htmlFor="manual-rate"
              className="text-sm sm:text-base text-muted-foreground font-light"
            >
              Manual Rate
            </Label>
          </div>
        </div>
      </div>

      {isManual ? (
        <div className="relative w-full  md:max-w-full">
          <Input
            type="number"
            value={exchangeRate || ""}
            onChange={handleManualChange}
            placeholder="Enter exchange rate"
            className="w-full h-10 px-3 py-2 pr-12 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-400"
            step="0.01"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            LKR
          </div>
        </div>
      ) : (
        <Card className="w-full sm:max-w-full sm:px-5 gap-0.5">
          <CardHeader className="space-y-1 p-4">
            <CardTitle className="text-lg sm:text-xl md:text-2xl">
              <div className="flex items-center justify-between">
                <div>{selectedCurrency} &rarr; LKR</div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => mutate()}
                  disabled={isLoading}
                >
                  Refresh
                </Button>
              </div>
            </CardTitle>
            <CardDescription className="sm:text-base">
              Current exchange rate
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin sm:h-6 sm:w-6" />
                <p className="text-sm sm:text-base">Loading rate...</p>
              </div>
            ) : error || data?.error ? (
              <div className="text-red-500 text-sm">
                {error?.message || data?.error || "Failed to load rate"}
              </div>
            ) : (
              <p className="text-2xl font-semibold sm:text-3xl">
                {exchangeRate.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}{" "}
                LKR
              </p>
            )}
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <div className="flex w-full items-center justify-between">
              <small className="text-muted-foreground sm:text-base">
                Updated every minute
              </small>
            </div>
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
