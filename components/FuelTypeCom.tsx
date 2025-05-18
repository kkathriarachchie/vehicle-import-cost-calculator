import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FuelTypeComProps {
  fuelType: string;
  setFuelType: (fuelType: string) => void;
}

const FuelTypeCom = ({ fuelType, setFuelType }: FuelTypeComProps) => {
  const fuelTypes = ["Petrol", "Diesel", "Petrol Hybrid", "Diesel Hybrid"];
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="fuelType" className="text-sm sm:text-base font-medium">
        Fuel Type
      </Label>
      <div className="w-full">
        <Select value={fuelType} onValueChange={setFuelType}>
          <SelectTrigger className="w-full md:max-w-full h-10">
            <SelectValue
              placeholder="Select fuel type"
              className="placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-400"
            />
          </SelectTrigger>
          <SelectContent className="min-w-[200px]">
            {fuelTypes.map((fuel) => (
              <SelectItem
                key={fuel}
                value={fuel}
                className="cursor-pointer hover:bg-slate-100"
              >
                {fuel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FuelTypeCom;
