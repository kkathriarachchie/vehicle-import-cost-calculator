import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CIFValueProps {
  cifValue: number;
  setCifValue: (value: number) => void;
}

const CIFValue = ({ cifValue, setCifValue }: CIFValueProps) => {
  const formattedValue = cifValue
    ? cifValue.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
        useGrouping: true,
      })
    : "";

  return (
    <div>
      <Label htmlFor="cifValue">CIF Value</Label>
      <div className="mt-2">
        <Input
          type="text"
          id="cifValue"
          placeholder="CIF Value"
          value={formattedValue}
          className="w-full sm:w-[300px]"
          disabled
        />
      </div>
    </div>
  );
};

export default CIFValue;
