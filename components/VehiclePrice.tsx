import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VehiclePriceProps {
  vehiclePrice: number;
  setVehiclePrice: (value: number) => void;
}

const VehiclePrice = ({ vehiclePrice, setVehiclePrice }: VehiclePriceProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setVehiclePrice(value);
  };

  return (
    <div>
      <Label htmlFor="vehiclePrice">Vehicle Price</Label>
      <div className="mt-2">
        <Input
          type="number"
          id="vehiclePrice"
          placeholder="Enter vehicle price"
          value={vehiclePrice || ""}
          onChange={handleInputChange}
          className="w-full sm:w-[300px]"
        />
      </div>
    </div>
  );
};

export default VehiclePrice;
