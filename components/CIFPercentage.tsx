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
    <div>
      <div className="flex flex-row justify-between">
        <Label htmlFor="cifPercentage">CIF % </Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cifValueEnable"
            checked={isEnabled}
            onCheckedChange={handleCheckboxChange}
          />
          <Label
            htmlFor="cifValueEnable"
            className="text-muted-foreground font-light"
          >
            Enable
          </Label>
        </div>
      </div>

      <div className="mt-2">
        <Input
          type="number"
          id="cifPercentage"
          placeholder="Enter CIF percentage"
          value={cifPercentage}
          onChange={handleInputChange}
          className="w-full sm:w-[300px]"
          disabled={!isEnabled}
          min={0}
          max={100}
          step="0.01"
        />
      </div>
    </div>
  );
};

export default CIFPercentage;
