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
    <div>
      <Label htmlFor="fuelType">Fuel Type</Label>
      <div className="mt-2">
        <Select value={fuelType} onValueChange={setFuelType}>
          <SelectTrigger className="w-full sm:w-[300px]">
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            {fuelTypes.map((fuel) => (
              <SelectItem key={fuel} value={fuel}>
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
