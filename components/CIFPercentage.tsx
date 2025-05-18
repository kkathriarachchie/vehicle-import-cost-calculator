import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CIFValueProps {
  cifPercentage: number;
  setCifPercentage: (value: number) => void;
}

const CIFPercentage = ({ cifPercentage, setCifPercentage }: CIFValueProps) => {
  {
    /*const formattedValue = cifValue
    ? cifValue.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
        useGrouping: true,
      })
    : "";*/
  }

  const [isEnabled, setIsEnabled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 20;
    setCifPercentage(value);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsEnabled(checked);
    if (!checked) {
      setCifPercentage(20); // Reset to default when disabled
    }
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Label
          htmlFor="cifPercentage"
          className="text-sm sm:text-base font-medium"
        >
          CIF %{" "}
        </Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cifValueEnable"
            checked={isEnabled}
            onCheckedChange={handleCheckboxChange}
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
          <Label
            htmlFor="cifValueEnable"
            className="text-sm sm:text-base text-muted-foreground font-light"
          >
            Manual %
          </Label>
        </div>
      </div>

      <div className="relative w-full  md:max-w-full">
        <Input
          type="number"
          id="cifPercentage"
          placeholder="Enter CIF percentage"
          value={cifPercentage}
          onChange={handleInputChange}
          className="w-full h-10 px-3 py-2 pr-12 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-400"
          disabled={!isEnabled}
          min={0}
          max={100}
          step="0.01"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          %
        </div>
      </div>
    </div>
  );
};

export default CIFPercentage;
