import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DisplayCardProps {
  cifLKRValue: number;
  cidSur: number;
  pal: number;
  exDuty: number;
  luxuryTax: number;
  vat: number;
  adminCharge: number;
  totalCost: number;
}

const DisplayCard = ({
  cifLKRValue,
  cidSur,
  pal,
  exDuty,
  luxuryTax,
  vat,
  adminCharge,
  totalCost,
}: DisplayCardProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
          <CardDescription>Vehicle Import Cost Details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">CIF Value (LKR):</span>
              <span className="font-medium">{formatCurrency(cifLKRValue)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">CID Surcharge:</span>
              <span className="font-medium">{formatCurrency(cidSur)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">PAL:</span>
              <span className="font-medium">{formatCurrency(pal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Excise Duty:</span>
              <span className="font-medium">{formatCurrency(exDuty)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Luxury Tax:</span>
              <span className="font-medium">{formatCurrency(luxuryTax)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">VAT:</span>
              <span className="font-medium">{formatCurrency(vat)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Admin Charge:</span>
              <span className="font-medium">{formatCurrency(adminCharge)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex justify-between items-center w-full">
            <span className="font-semibold text-lg">Total Cost:</span>
            <span className="font-bold text-lg text-primary">
              {formatCurrency(totalCost)}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DisplayCard;
